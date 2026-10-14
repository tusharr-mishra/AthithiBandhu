const mongoose = require("mongoose");
const schema = mongoose.Schema;

const reviewSchema = new schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    review: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
    author: { type: schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model("Review", reviewSchema);