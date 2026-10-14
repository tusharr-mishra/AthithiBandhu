const passport = require("passport");
const User = require("../models/user.js");
const Listing = require("../models/listing.js");
const ExpressErrors = require("../utils/ExpressErrors.js");

// SIGNUP PAGE
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// SIGNUP USER
module.exports.signup = async (req, res, next) => {
    try {
        const { user } = req.body;

        if (!user || typeof user !== "object") {
            throw new ExpressErrors(400, "Registration details are required.");
        }

        const { password, ...userData } = user;

        if (typeof password !== "string" || password.length < 8) {
            throw new ExpressErrors(400, "Password must contain at least 8 characters.");
        }

        const newUser = new User(userData);
        const registeredUser = await User.register(newUser, password);

        // Only assign sample listings if unowned listings exist waiting for an initial owner
        const hasUnowned = await Listing.exists({ $or: [{ owner: null }, { owner: { $exists: false } }] });
        if (hasUnowned) {
            await Listing.updateMany(
                { $or: [{ owner: null }, { owner: { $exists: false } }] },
                { owner: registeredUser._id }
            );
        }

        req.login(registeredUser, (err) => {
            if (err) return next(err);

            req.flash("success", "Welcome to AthithiBandhu! Your account has been created.");
            return res.redirect("/listings");
        });
    } catch (err) {
        if (err.code === 11000 || err.name === "UserExistsError") {
            req.flash("error", "That username or email is already registered.");
            return res.redirect("/users/signup");
        }

        if (err.name === "ValidationError") {
            req.flash("error", err.message);
            return res.redirect("/users/signup");
        }

        next(err);
    }
};

// LOGIN PAGE
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// LOGIN SUCCESS
module.exports.login = (req, res) => {
    req.flash("success", "Welcome back to AthithiBandhu!");
    res.redirect(res.locals.redirectUrl || "/listings");
};

// LOGOUT USER
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.flash("success", "You have been logged out successfully.");
        return res.redirect("/users/login");
    });
};