const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { savedRedirectUrl } = require("../middleware.js");

// User Registration Routes
router.route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

// User Authentication (Login) Routes
router.route("/login")
    .get(userController.renderLoginForm)
    .post(
        savedRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: "/users/login",
            failureFlash: true
        }),
        userController.login
    );

// User Session Termination (Logout)
router.post("/logout", userController.logout);

module.exports = router;