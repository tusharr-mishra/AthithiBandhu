if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("./models/user.js");
const ExpressErrors = require("./utils/ExpressErrors.js");
const { setCurrentUser } = require("./middleware.js");

// Route modules
const listingRoutes = require("./routes/listing.js");
const reviewRoutes = require("./routes/review.js");
const userRoutes = require("./routes/user.js");
const bookingRoutes = require("./routes/booking.js");

// Database & server configuration
const MONGO_URL = process.env.ATLASDB_URL || process.env.MONGO_URL || "mongodb://127.0.0.1:27017/AthithiBandhu";
const PORT = process.env.PORT || 8080;
const SESSION_SECRET = process.env.SESSION_SECRET || "replace-this-with-a-long-random-secret";

// Connect to MongoDB (Atlas or Local)
async function main() {
    await mongoose.connect(MONGO_URL);
    const dbTarget = MONGO_URL.includes("mongodb+srv") ? "MongoDB Atlas (Online Cloud)" : "MongoDB Local";
    console.log(`Database connection established: ${dbTarget}`);
}

// View engine setup (EJS with EJS-Mate layouts)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Body parsing, method override for PUT/DELETE, and static assets
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// MongoDB-backed session store
const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: SESSION_SECRET
    },
    touchAfter: 24 * 3600 // Lazy session update: only touch after 24 hours unless data changed
});

store.on("error", (err) => {
    console.error("Mongo session store error:", err);
});

// Express session setup with secure cookie defaults
const sessionOptions = {
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
    }
};

app.use(session(sessionOptions));

// Flash messages
app.use(flash());

// Authentication with Passport and Passport-Local
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Expose currentUser, flash messages, and currency helpers to all EJS templates
app.use(setCurrentUser);

// Redirect root directly to listings catalog
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Mount application resource routes
app.use("/listings", listingRoutes);
app.use("/listings/:id/reviews", reviewRoutes);
app.use("/users", userRoutes);
app.use("/", bookingRoutes);

// Catch-all 404 handler for unknown routes
app.use((req, res, next) => {
    next(new ExpressErrors(404, "Page Not Found"));
});

// Centralized error handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("listings/error.ejs", { message });
});

// Start HTTP server once database is ready
main()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error("Database connection failed:", err);
        process.exit(1);
    });