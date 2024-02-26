const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    bidAmount: {
        type: Number,
        required: true
    },
    bidDescription: {
        type: String,
        required: true
    },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item' // Reference to the Item model
    }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;