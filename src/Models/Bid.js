const mongoose = require("mongoose")

const bidController = new mongoose.Schema({
    bidId: {
        type: String,
        required: true
    },
    bidderId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    bidamount: {
        type: String,
        required: true
    },
    bidtime: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("bid", bidController);