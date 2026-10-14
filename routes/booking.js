const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const bookingController = require("../controllers/booking.js");

// Reserve dates for a listing (protected against race conditions)
router.post("/listings/:id/bookings", isLoggedIn, wrapAsync(bookingController.createBooking));

// View logged-in user's bookings dashboard
router.get("/bookings", isLoggedIn, wrapAsync(bookingController.listUserBookings));

// Cancel a reservation and release dates back to the listing
router.delete("/bookings/:bookingId", isLoggedIn, wrapAsync(bookingController.cancelBooking));

// Remove cancelled reservation from dashboard history
router.delete("/bookings/:bookingId/remove", isLoggedIn, wrapAsync(bookingController.removeBooking));

module.exports = router;
