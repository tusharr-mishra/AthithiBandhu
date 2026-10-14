const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const ExpressErrors = require("../utils/ExpressErrors.js");
const { getCurrencyInfo } = require("../utils/currency.js");

// Concurrency note:
// To prevent race conditions where two guests book the same dates at the exact same time,
// we use MongoDB's atomic findOneAndUpdate with { bookedDates: { $nin: requestedDates } }.
// Because WiredTiger executes document updates atomically, the first request appends the dates.
// Any competing overlapping request fails the $nin check and returns null, preventing double-bookings.


/**
 * Utility: Generates an array of individual ISO date strings ("YYYY-MM-DD")
 * for each night between checkIn and checkOut (exclusive of checkOut day).
 */
const getStayDates = (checkInDate, checkOutDate) => {
    const dates = [];
    const current = new Date(checkInDate);
    const end = new Date(checkOutDate);

    // Normalize to UTC midnight to avoid timezone offsets
    current.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(0, 0, 0, 0);

    while (current < end) {
        const year = current.getUTCFullYear();
        const month = String(current.getUTCMonth() + 1).padStart(2, "0");
        const day = String(current.getUTCDate()).padStart(2, "0");
        dates.push(`${year}-${month}-${day}`);
        current.setUTCDate(current.getUTCDate() + 1);
    }

    return dates;
};

/**
 * Helper: Parses dates flexibly supporting both DD-MM-YYYY and YYYY-MM-DD
 */
const parseFlexibleDate = (dateStr) => {
    if (!dateStr || typeof dateStr !== "string") return null;
    const trimmed = dateStr.trim();
    // DD-MM-YYYY or DD/MM/YYYY
    const dmyMatch = trimmed.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
    if (dmyMatch) {
        const [, d, m, y] = dmyMatch;
        return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
    }
    // YYYY-MM-DD or YYYY/MM/DD
    const ymdMatch = trimmed.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/);
    if (ymdMatch) {
        const [, y, m, d] = ymdMatch;
        return new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)));
    }
    const d = new Date(trimmed);
    return isNaN(d.getTime()) ? null : d;
};

const formatDMY = (date) => {
    const d = new Date(date);
    const day = String(d.getUTCDate()).padStart(2, "0");
    const month = String(d.getUTCMonth() + 1).padStart(2, "0");
    const year = d.getUTCFullYear();
    return `${day}-${month}-${year}`;
};

// CREATE RESERVATION (CONCURRENCY-PROTECTED)
module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body.booking || {};

    if (!checkIn || !checkOut) {
        req.flash("error", "Both check-in and check-out dates are required.");
        return res.redirect(`/listings/${id}`);
    }

    const checkInDate = parseFlexibleDate(checkIn);
    const checkOutDate = parseFlexibleDate(checkOut);

    if (!checkInDate || !checkOutDate) {
        req.flash("error", "Invalid dates provided. Please select dates in DD-MM-YYYY format.");
        return res.redirect(`/listings/${id}`);
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (checkInDate < today) {
        req.flash("error", "Check-in date cannot be in the past.");
        return res.redirect(`/listings/${id}`);
    }

    if (checkOutDate <= checkInDate) {
        req.flash("error", "Check-out date must be strictly after the check-in date.");
        return res.redirect(`/listings/${id}`);
    }

    const requestedDateStrings = getStayDates(checkInDate, checkOutDate);
    const totalNights = requestedDateStrings.length;

    if (totalNights < 1) {
        req.flash("error", "Reservation must be for at least 1 night.");
        return res.redirect(`/listings/${id}`);
    }

    const listing = await Listing.findById(id);
    if (!listing) {
        throw new ExpressErrors(404, "Listing not found");
    }

    // Atomically reserve dates: ensure none of the requested dates are already booked
    const reservedListing = await Listing.findOneAndUpdate(
        { _id: id, bookedDates: { $nin: requestedDateStrings } },
        { $push: { bookedDates: { $each: requestedDateStrings } } },
        { new: true }
    );

    // If null, another concurrent request reserved one or more of these dates first
    if (!reservedListing) {
        req.flash("error", "The selected dates were just reserved by another guest. Please choose alternative dates.");
        return res.redirect(`/listings/${id}`);
    }

    // Compute pricing and regional tax breakdown
    const nightlyPrice = listing.price;
    const baseTotal = nightlyPrice * totalNights;
    const curr = getCurrencyInfo(listing.country);
    const taxAndFees = Math.round(baseTotal * curr.taxRate);
    const totalPrice = baseTotal + taxAndFees;

    // Persist confirmed booking record with snapshot of listing details
    const booking = new Booking({
        listing: id,
        user: req.user._id,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        totalNights,
        nightlyPrice,
        taxAndFees,
        totalPrice,
        bookedDates: requestedDateStrings,
        status: "confirmed",
        listingTitle: listing.title,
        listingImage: listing.image && listing.image.url ? listing.image.url : "",
        listingLocation: listing.location,
        listingCountry: listing.country
    });

    await booking.save();

    req.flash(
        "success",
        `Reservation confirmed! You have booked ${totalNights} night(s) at ${listing.title} (${formatDMY(checkInDate)} to ${formatDMY(checkOutDate)}).`
    );
    res.redirect("/bookings");
};

// USER'S BOOKINGS DASHBOARD
module.exports.listUserBookings = async (req, res) => {
    const { filter } = req.query; // optional filter: 'confirmed', 'cancelled', or undefined ('all')
    const query = { user: req.user._id };
    if (filter && ["confirmed", "cancelled"].includes(filter)) {
        query.status = filter;
    }

    const bookings = await Booking.find(query)
        .populate("listing")
        .sort({ createdAt: -1 });

    const totalCount = await Booking.countDocuments({ user: req.user._id });
    const confirmedCount = await Booking.countDocuments({ user: req.user._id, status: "confirmed" });
    const cancelledCount = await Booking.countDocuments({ user: req.user._id, status: "cancelled" });

    res.render("bookings/index.ejs", {
        bookings,
        activeFilter: filter || "all",
        counts: {
            all: totalCount,
            confirmed: confirmedCount,
            cancelled: cancelledCount
        }
    });
};

// CANCEL RESERVATION & RELEASE DATES
module.exports.cancelBooking = async (req, res) => {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });
    if (!booking) {
        throw new ExpressErrors(404, "Booking not found or unauthorized.");
    }

    if (booking.status === "cancelled") {
        req.flash("error", "This reservation has already been cancelled.");
        return res.redirect("/bookings");
    }

    // Release reserved dates back to the listing
    if (booking.listing) {
        await Listing.findByIdAndUpdate(booking.listing, {
            $pull: { bookedDates: { $in: booking.bookedDates } }
        });
    }

    booking.status = "cancelled";
    await booking.save();

    req.flash("success", "Reservation cancelled successfully. The reserved dates have been made available again.");
    res.redirect("/bookings");
};

// REMOVE / DELETE BOOKING PERMANENTLY FROM USER DASHBOARD
module.exports.removeBooking = async (req, res) => {
    const { bookingId } = req.params;

    const booking = await Booking.findOne({ _id: bookingId, user: req.user._id });
    if (!booking) {
        req.flash("error", "Reservation not found or already removed.");
        return res.redirect("/bookings");
    }

    // If reservation was still confirmed, atomically release dates first
    if (booking.status === "confirmed" && booking.listing && booking.bookedDates && booking.bookedDates.length > 0) {
        await Listing.findByIdAndUpdate(booking.listing, {
            $pull: { bookedDates: { $in: booking.bookedDates } }
        });
    }

    await Booking.findByIdAndDelete(bookingId);

    req.flash("success", "Reservation removed from your history.");
    res.redirect("/bookings");
};
