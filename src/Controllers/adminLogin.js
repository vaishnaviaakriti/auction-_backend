// backend/controllers/adminLogin.js

const adminEmail = 'aakritivaishu@gmail.com';
const adminPassword = 'admin123';

const adminLoginController = {
    login: async(req, res) => {
        const { email, password } = req.body;

        try {
            if (email !== adminEmail || password !== adminPassword) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }

            // If login successful, you may generate a token here and send it back to the client
            res.json({ success: true, message: 'Login successful' });
        } catch (error) {
            console.error('Error logging in:', error.message);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    }
};

module.exports = adminLoginController;