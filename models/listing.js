const mongoose = require("mongoose");
const schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        filename: { type: String, default: "listingimage" },
        url: {
            type: String,
            default: "https://static.vecteezy.com/system/resources/thumbnails/014/280/706/small/silhouette-of-beautiful-sunset-on-the-sea-beach-with-palm-tree-for-travel-in-holiday-relax-time-on-nature-background-free-photo.jpg"
        }
    },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    country: { type: String, required: true },
    category: { type: String, default: "Popular" },
    isGuestFavourite: { type: Boolean, default: false },
    reviews: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Review" }
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    // Tracks booked nights ("YYYY-MM-DD") for atomic concurrency checks
    bookedDates: [{ type: String }],
    geometry: {
        type: { type: String, enum: ["Point"], required: true },
        coordinates: { type: [Number], required: true }
    }
});

// Cascade delete: remove all associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async function (listing) {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;