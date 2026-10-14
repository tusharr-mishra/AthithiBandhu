const express = require("express");
const router = express.Router({ mergeParams: true });

const reviewController = require("../controllers/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware.js");

// Submit a new review for a listing
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Form to edit existing review
router.get("/:reviewId/edit", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.renderEditForm));

// Update or delete review
router.route("/:reviewId")
    .put(isLoggedIn, isReviewAuthor, validateReview, wrapAsync(reviewController.updateReview))
    .delete(isLoggedIn, isReviewAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;