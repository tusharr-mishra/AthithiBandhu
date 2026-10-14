const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressErrors = require("../utils/ExpressErrors.js");

// CREATE REVIEW
module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    const newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    await newReview.save();
    listing.reviews.push(newReview._id);
    await listing.save();

    req.flash("success", "Thank you! Your review has been submitted.");
    res.redirect(`/listings/${listing._id}`);
};

// EDIT REVIEW PAGE
module.exports.renderEditForm = async (req, res) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        throw new ExpressErrors(404, "Review not found");
    }

    res.render("reviews/edit.ejs", { review, listingId: id });
};

// UPDATE REVIEW
module.exports.updateReview = async (req, res) => {
    const { id, reviewId } = req.params;

    const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        {
            rating: req.body.review.rating,
            comment: req.body.review.comment
        },
        { runValidators: true, returnDocument: "after" }
    );

    if (!updatedReview) {
        throw new ExpressErrors(404, "Review not found");
    }

    req.flash("success", "Your review has been updated successfully.");
    res.redirect(`/listings/${id}`);
};

// DELETE REVIEW
module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;

    await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
        throw new ExpressErrors(404, "Review not found");
    }

    req.flash("success", "Your review has been deleted successfully.");
    res.redirect(`/listings/${id}`);
};