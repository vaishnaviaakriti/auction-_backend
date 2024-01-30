const mongoose = require("mongoose")

const bidController = new mongoose.Schema({
    bidAmount: {
        type: String,
        required: true
    },
    bidDescription: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("bid", bidController);