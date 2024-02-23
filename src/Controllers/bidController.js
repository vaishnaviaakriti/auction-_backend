const express = require('express');
const app = express();
const Bid = require('../Models/Bid');

app.use(express.json()); // Middleware to parse JSON request bodies

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

    updateBid: async(req, res) => {
        const { id } = req.params;
        const { bidAmount, bidDescription } = req.body;

        // Basic validation
        if (!bidAmount || isNaN(bidAmount) || !bidDescription) {
            return res.status(400).json({ error: 'Invalid bid data' });
        }

        try {
            // Update the bid in the database
            const updatedBid = await Bid.findByIdAndUpdate(id, {
                bidAmount: Number(bidAmount),
                bidDescription,
            }, { new: true });

            if (!updatedBid) {
                return res.status(404).json({ error: 'Bid not found' });
            }

            // Send a success response
            res.json({ message: 'Bid updated successfully', bid: updatedBid });
        } catch (error) {
            console.error('Error updating bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteBid: async(req, res) => {
        const { id } = req.params;

        try {
            // Delete the bid from the database
            const deletedBid = await Bid.findByIdAndDelete(id);

            if (!deletedBid) {
                return res.status(404).json({ error: 'Bid not found' });
            }

            // Send a success response
            res.json({ message: 'Bid deleted successfully', bid: deletedBid });
        } catch (error) {
            console.error('Error deleting bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getHighestBid: async(req, res) => {
        try {
            // Find the highest bid in the database
            const highestBid = await Bid.findOne().sort({ bidAmount: -1 });

            if (!highestBid) {
                return res.status(404).json({ error: 'No bids found' });
            }

            // Send the highest bid
            res.json({ highestBid });
        } catch (error) {
            console.error('Error fetching highest bid:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = bidController;