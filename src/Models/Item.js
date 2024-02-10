const mongoose = require("mongoose")

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
    bid: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bid",
    }]
})
module.exports = mongoose.model("Item", item);