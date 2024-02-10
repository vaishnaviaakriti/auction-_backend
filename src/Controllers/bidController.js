// Controllers/bidController.js

const Bid = require('../Models/Bid');

const bidController = {
    submitBid: async(req, res) => {
        const { bidAmount, bidDescription } = req.body;

        // Basic validation
        if (!bidAmount || isNaN(bidAmount) || !bidDescription) {
            return res.status(400).json({ error: 'Invalid bid data' });
        }

        try {
            // Save the bid to the database
            const newBid = await Bid.create({
                bidAmount: Number(bidAmount),
                bidDescription,
            });

            // Send a success response
            res.json({ message: 'Bid submitted successfully', bid: newBid });
        } catch (error) {
            console.error('Error submitting bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },


};

module.exports = bidController;
// Other CRUD operations (update, delete) can be added similarly if needed