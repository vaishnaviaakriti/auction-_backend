// backend/models/AdminLogin.js

const mongoose = require('mongoose');

const adminLoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Assuming each admin has a unique email
    },
    password: {
        type: String,
        required: true
    }
});

const AdminLogin = mongoose.model('AdminLogin', adminLoginSchema);

module.exports = AdminLogin;