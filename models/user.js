const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    dateOfBirth: { type: Date, required: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    sex: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other", "Prefer not to say"]
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;
