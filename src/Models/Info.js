const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true // Set default value to true for active users
    }
});

module.exports = mongoose.model("Info", infoSchema);