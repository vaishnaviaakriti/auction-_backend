const Customer = require('../Models/Customer');
const mongoose = require('mongoose');

// Controller function to create a new customer
exports.createCustomer = async(req, res) => {
    try {
        const { Name, ProductId, PCategory, address, phoneNumber } = req.body;
        const customer = new Customer({ Name, ProductId, PCategory, address, phoneNumber });
        await customer.save();
        res.status(201).json({ message: 'Successfully added', customer });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

// Controller function to retrieve all customers
exports.getAllCustomers = async(req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Controller function to update customer status
exports.updateCustomerStatus = async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Check if id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ObjectId format' });
        }

        const customer = await Customer.findByIdAndUpdate(id, { status }, { new: true });
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        res.json({ message: 'Customer status updated successfully', customer });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}