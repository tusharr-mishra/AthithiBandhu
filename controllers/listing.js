const Listing = require("../models/listing.js");
const ExpressErrors = require("../utils/ExpressErrors.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapboxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mapboxToken ? mbxGeocoding({ accessToken: mapboxToken }) : null;

// Mapbox forward geocoding helper to extract GeoJSON coordinates
const getListingGeometry = async (location, country) => {
    if (!geocodingClient) {
        throw new ExpressErrors(500, "Mapbox access token is not configured.");
    }

    const response = await geocodingClient.forwardGeocode({
        query: `${location}, ${country}`,
        limit: 1,
        types: ["place", "locality", "district", "region", "country"]
    }).send();

    const feature = response.body.features?.[0];

    if (
        !feature ||
        !feature.geometry ||
        feature.geometry.type !== "Point" ||
        !Array.isArray(feature.geometry.coordinates) ||
        feature.geometry.coordinates.length !== 2
    ) {
        throw new ExpressErrors(400, "Location not found. Please enter a valid location and country.");
    }

    const [longitude, latitude] = feature.geometry.coordinates;

    if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
        throw new ExpressErrors(400, "The location returned invalid coordinates.");
    }

    return feature.geometry;
};

// Display all listings with optional category filter or multi-keyword search
module.exports.index = async (req, res) => {
    const location = (req.query.location || "").trim();
    const category = (req.query.category || "").trim();
    const conditions = [];

    // Filter by category
    if (category && category !== "Popular" && category !== "all") {
        conditions.push({ category });
    }

    // Search across title, location, country, description, and category
    if (location) {
        const escapedSearch = location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const stopWords = ["in", "at", "the", "on", "for", "and", "or", "to"];
        const words = location
            .split(/\s+/)
            .map(w => w.trim())
            .filter(w => w.length > 1 && !stopWords.includes(w.toLowerCase()));

        if (words.length > 1) {
            const termConditions = words.map(word => {
                const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                return {
                    $or: [
                        { title: { $regex: escapedWord, $options: "i" } },
                        { location: { $regex: escapedWord, $options: "i" } },
                        { country: { $regex: escapedWord, $options: "i" } },
                        { description: { $regex: escapedWord, $options: "i" } },
                        { category: { $regex: escapedWord, $options: "i" } }
                    ]
                };
            });
            conditions.push({ $and: termConditions });
        } else {
            conditions.push({
                $or: [
                    { title: { $regex: escapedSearch, $options: "i" } },
                    { location: { $regex: escapedSearch, $options: "i" } },
                    { country: { $regex: escapedSearch, $options: "i" } },
                    { description: { $regex: escapedSearch, $options: "i" } },
                    { category: { $regex: escapedSearch, $options: "i" } }
                ]
            });
        }
    }

    const queryFilter = conditions.length > 0 ? { $and: conditions } : {};
    let allListings = await Listing.find(queryFilter);
    let noExactMatches = false;

    // Fallback recommendation if no direct match was found
    if (allListings.length === 0 && (location || (category && category !== "Popular"))) {
        noExactMatches = true;
        allListings = await Listing.find({}).limit(15);
    }

    res.render("listings/index.ejs", {
        allListings,
        location,
        category: category || "Popular",
        noExactMatches
    });
};

// Render form to create new listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// Create a new listing and assign the current user as owner
module.exports.createListing = async (req, res) => {
    const { location, country } = req.body.listing;

    if (!req.file) {
        throw new ExpressErrors(400, "Please upload an image for your listing.");
    }

    const geometry = await getListingGeometry(location, country);
    const newListing = new Listing(req.body.listing);

    newListing.owner = req.user._id;
    newListing.image = {
        filename: req.file.filename,
        url: req.file.path
    };
    newListing.geometry = geometry;

    await newListing.save();
    req.flash("success", "Your listing has been published successfully!");
    res.redirect("/listings");
};

// Render edit form for a listing
module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    res.render("listings/edit.ejs", { listing });
};

// Update existing listing details
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findById(id);

    if (!updatedListing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    const { location, country } = req.body.listing;
    const locationChanged = updatedListing.location !== location || updatedListing.country !== country;

    Object.assign(updatedListing, req.body.listing);

    // Refresh coordinates if location changed or geometry is missing
    if (
        locationChanged ||
        !updatedListing.geometry ||
        !Array.isArray(updatedListing.geometry.coordinates) ||
        updatedListing.geometry.coordinates.length !== 2
    ) {
        updatedListing.geometry = await getListingGeometry(updatedListing.location, updatedListing.country);
    }

    if (req.file) {
        updatedListing.image = {
            filename: req.file.filename,
            url: req.file.path
        };
    }

    await updatedListing.save();
    req.flash("success", "Listing Updated!!");
    res.redirect(`/listings/${id}`);
};

// Delete a listing (cascade deletes reviews via Mongoose middleware)
module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);

    if (!deletedListing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    req.flash("success", "Your listing has been deleted successfully.");
    res.redirect("/listings");
};

// Show details of a single listing including reviews and average rating
module.exports.showListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
        .populate("owner")
        .populate({
            path: "reviews",
            populate: { path: "author" }
        });

    if (!listing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    const reviews = listing.reviews;
    const totalRating = reviews.reduce((total, review) => total + review.rating, 0);
    const averageRating = reviews.length ? (totalRating / reviews.length).toFixed(1) : "0.0";

    res.render("listings/show.ejs", {
        listing,
        reviews,
        averageRating
    });
};