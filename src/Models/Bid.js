const mongoose = require("mongoose")

const bidController = new mongoose.Schema({
    bidAmount: {
        type: Number,
        required: true
    },
    bidDescription: {
        type: String,
        required: true
    },
    // highestbid: {
    //     type: Number,
    //     required: true
    // }
});
const Bid = mongoose.model('Bid', bidController);

module.exports = Bid;