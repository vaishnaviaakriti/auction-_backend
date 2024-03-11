const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    ProductId: {
        type: String,
        required: true
    },
    PCategory: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("Customer", customerSchema);