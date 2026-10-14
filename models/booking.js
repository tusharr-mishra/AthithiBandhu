const mongoose = require("mongoose");
const { Schema } = mongoose;

// Reservation model: captures booking duration, pricing snapshot, and booked dates.
// Works with Listing.bookedDates to guarantee no double-bookings via atomic updates.
const bookingSchema = new Schema({
    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: [true, "Listing reference is required for a booking."]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User reference is required for a booking."]
    },
    checkIn: {
        type: Date,
        required: [true, "Check-in date is required."]
    },
    checkOut: {
        type: Date,
        required: [true, "Check-out date is required."]
    },
    totalNights: {
        type: Number,
        required: [true, "Total nights count is required."],
        min: [1, "Booking must be for at least 1 night."]
    },
    nightlyPrice: {
        type: Number,
        required: [true, "Nightly rate is required."]
    },
    taxAndFees: {
        type: Number,
        default: 0
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required."]
    },
    bookedDates: [{
        type: String,
        required: true
    }],
    status: {
        type: String,
        enum: ["confirmed", "cancelled"],
        default: "confirmed"
    },
    // Snapshot of listing details so past bookings display properly even if the listing changes
    listingTitle: String,
    listingImage: String,
    listingLocation: String,
    listingCountry: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Compound index for user booking lookups
bookingSchema.index({ listing: 1, user: 1, status: 1 });

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
