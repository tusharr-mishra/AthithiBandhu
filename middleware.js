const Listing = require("./models/listing.js");
const Review = require("./models/review.js");
const ExpressErrors = require("./utils/ExpressErrors.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("./schema.js");
const { getCurrencyInfo, formatPrice } = require("./utils/currency.js");

// Ensure user is authenticated before accessing protected actions
const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be logged in to perform this action.");
        return res.redirect("/users/login");
    }
    next();
};

// Make user data, flash messages, and currency utilities accessible across all EJS views
const setCurrentUser = (req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.getCurrencyInfo = getCurrencyInfo;
    res.locals.formatPrice = formatPrice;
    next();
};

// Restore the intended redirect URL after user logs in
const savedRedirectUrl = (req, res, next) => {
    res.locals.redirectUrl = req.session.redirectUrl || "/listings";
    delete req.session.redirectUrl;
    next();
};

// Verify the logged-in user owns the listing before edit/delete
const isOwner = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    if (!listing.owner || !req.user || !listing.owner.equals(req.user._id)) {
        req.flash("error", "You don't have permission to modify this listing.");
        return res.redirect(`/listings/${id}`);
    }

    next();
});

// Verify the logged-in user is the author of the review before edit/delete
const isReviewAuthor = wrapAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    const review = await Review.findById(reviewId);
    if (!review) {
        throw new ExpressErrors(404, "Review not found");
    }

    const belongsToListing = listing.reviews.some(r => r.toString() === reviewId);
    if (!belongsToListing) {
        throw new ExpressErrors(404, "Review not found for this listing");
    }

    if (!review.author || !req.user || !review.author.equals(req.user._id)) {
        req.flash("error", "You can only edit or delete reviews written by you.");
        return res.redirect(`/listings/${id}`);
    }

    next();
});

// Validate listing creation/updates against Joi schema
const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressErrors(400, errMsg));
    }
    next();
};

// Validate reviews against Joi schema
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return next(new ExpressErrors(400, errMsg));
    }
    next();
};

module.exports = {
    isLoggedIn,
    setCurrentUser,
    savedRedirectUrl,
    isOwner,
    isReviewAuthor,
    validateListing,
    validateReview
};