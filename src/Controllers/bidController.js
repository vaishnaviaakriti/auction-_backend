const express = require('express');
const app = express();
const Bid = require('../Models/Bid');
const Item = require('../Models/Item'); // Import the Item model

app.use(express.json()); // Middleware to parse JSON request bodies

const bidController = {
    submitBid: async(req, res) => {
        const { bidAmount, bidDescription } = req.body; // Change itemId to Item

        // Basic validation
        if (!bidAmount || isNaN(bidAmount) || !bidDescription) { // Change itemId to Item
            return res.status(400).json({ error: 'Invalid bid data' });
        }

        try {
            // Save the bid to the database
            const newBid = await Bid.create({
                bidAmount: Number(bidAmount),
                bidDescription,
                // item: Item // Change itemId to Item
            });

            // Send a success response
            res.json({ message: 'Bid submitted successfully', bid: newBid });
        } catch (error) {
            console.error('Error submitting bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getHighestBidAndWinner: async(req, res) => {
        try {
            // Find the highest bid in the database and populate the item field
            const highestBid = await Bid.findOne().sort({ bidAmount: -1 }).populate('bidAmount'); // Change itemId to item

            if (!highestBid || !highestBid.bidAmount) { // Change itemId to item
                return res.status(404).json({ error: 'No item found for the highest bid' }); // Change itemId to item
            }

            // Extract the winner's details
            const winner = {
                name: highestBid.bidAmount, // Change itemId to item
                // You may need to adjust this depending on the structure of the Item model
            };

            // Send the highest bid and winner's details
            res.json({ highestBid, winner });
        } catch (error) {
            console.error('Error fetching highest bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = bidController;