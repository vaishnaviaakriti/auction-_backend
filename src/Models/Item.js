const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    data: {
        type: String, // Changed to String type
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
});

const item = new mongoose.Schema({
    productid: {
        type: String,
        required: true
    },
    sellerid: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    currentprice: {
        type: Number,
        required: true
    },
    startdate: {
        type: Number,
        required: true
    },
    enddate: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    images: [imageSchema],
    bid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
    }]
});

module.exports = mongoose.model("Item", item);