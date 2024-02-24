const express = require('express');
const app = express();
const Bid = require('../Models/Bid');
const Item = require('../Models/Item'); // Import the Item model

app.use(express.json()); // Middleware to parse JSON request bodies

const bidController = {
    submitBid: async(req, res) => {
        const { bidAmount, bidDescription, userId } = req.body;

        // Basic validation
        if (!bidAmount || isNaN(bidAmount) || !bidDescription || !userId) {
            return res.status(400).json({ error: 'Invalid bid data' });
        }

        try {
            // Save the bid to the database
            const newBid = await Bid.create({
                bidAmount: Number(bidAmount),
                bidDescription,
                userId // Assuming userId is a reference to the user who placed the bid
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
            // Find the highest bid in the database and populate the userId field
            const highestBid = await Bid.findOne().sort({ bidAmount: -1 }).populate('userId');

            if (!highestBid || !highestBid.userId) {
                return res.status(404).json({ error: 'No user found for the highest bid' });
            }

            // Extract the winner's details
            const winner = {
                name: highestBid.userId.name,
                email: highestBid.userId.email
                    // Add other user details as needed
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