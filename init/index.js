require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const mapboxToken = process.env.MAPBOX_TOKEN;
const geocodingClient = mapboxToken ? mbxGeocoding({ accessToken: mapboxToken }) : null;

const MONGO_URL = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/AthithiBandhu";

async function main() {
    try {
        await mongoose.connect(MONGO_URL);
        const dbTarget = MONGO_URL.includes("mongodb+srv") ? "MongoDB Atlas (Online Cloud)" : "MongoDB Local";
        console.log(`Database connection established: ${dbTarget}`);

        // Find current owner or allow dynamic ownership
        const defaultOwner = await User.findOne({});
        const ownerId = defaultOwner ? defaultOwner._id : null;

        // Delete existing listings
        await Listing.deleteMany({});

        // Add owner and GeoJSON geometry to each sample listing
        const sampleListings = [];
        for (const obj of initData.data) {
            let geometry = obj.geometry;
            if (!geometry && geocodingClient && obj.location) {
                try {
                    const geoRes = await geocodingClient.forwardGeocode({
                        query: `${obj.location}, ${obj.country || ""}`,
                        limit: 1
                    }).send();
                    if (geoRes.body.features && geoRes.body.features.length > 0) {
                        geometry = geoRes.body.features[0].geometry;
                    }
                } catch (e) {
                    // Fallback if network or rate limit fails
                }
            }

            sampleListings.push({
                ...obj,
                owner: ownerId,
                geometry: geometry || {
                    type: "Point",
                    coordinates: [77.2090, 28.6139]
                }
            });
        }

        // Insert sample listings into the database
        await Listing.insertMany(sampleListings);

        console.log("Database initialised with sample data");
    } finally {
        await mongoose.connection.close();
    }
}

main().catch((err) => {
    console.error("Error:", err);
});