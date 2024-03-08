const Bid = require('../Models/Bid');

const bidController = {
    submitBid: async(req, res) => {
        try {
            const { bidAmount, bidDescription } = req.body;

            if (!bidAmount || isNaN(bidAmount) || !bidDescription) {
                return res.status(400).json({ error: 'Invalid bid data' });
            }

            const newBid = await Bid.create({
                bidAmount: Number(bidAmount),
                bidDescription,
            });

            res.json({ message: 'Bid submitted successfully', bid: newBid });
        } catch (error) {
            console.error('Error submitting bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getHighestBidAndWinner: async(req, res) => {
        try {
            const highestBid = await Bid.findOne().sort({ bidAmount: -1 }).populate('item');

            if (!highestBid || !highestBid.bidAmount) {
                return res.status(404).json({ error: 'No item found for the highest bid' });
            }

            const winner = {
                name: highestBid.bidAmount,
            };

            res.json({ highestBid, winner });
        } catch (error) {
            console.error('Error fetching highest bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getBidInfo: async(req, res) => {
        try {
            const bidInfo = await Bid.find();
            res.json(bidInfo);
        } catch (error) {
            console.error('Error fetching bid information:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = bidController;