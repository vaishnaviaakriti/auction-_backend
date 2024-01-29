const Bid = require("../Models/Bid")

// Get all bids
exports.getAllBids = async(req, res) => {
    try {
        const bids = await Bid.find();
        res.json(bids);
    } catch (error) {
        console.error('Error fetching bids:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Create a new bid
exports.createBid = async(req, res) => {
    try {
        const newBid = await Bid.create(req.body);
        res.json(newBid);
    } catch (error) {
        console.error('Error creating bid:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Other CRUD operations (update, delete) can be added similarly if needed