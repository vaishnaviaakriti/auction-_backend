const info = require("../Models/Info");
const jwt = require("jsonwebtoken");

// Function to register a new user
exports.register = async(req, res, next) => {
    const { name, email, phone, password } = req.body;
    console.log(req.body);
    const _user = new info({
        name,
        email,
        phone,
        password,
        active: true, // Set the default value of 'active' field to true
    });

    try {
        const eUser = await info.findOne({ email });

        if (!eUser) {
            await _user.save();
            req.subject = "user form submission ";
            req.text = "form is submitted successfully";
            next();
        } else {
            return res.status(400).json({
                message: "User Already Exist",
            });
        }
    } catch (error) {
        return res.status(400).json({ message: "Error occurred", error });
    }
};

// Function to fetch user registration details
exports.users = async(req, res) => {
    try {
        const users = await info.find({}, { password: 0 }); // Exclude password field from the response
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user details", error });
    }
};

// Function to handle user login
exports.login = async(req, res) => {
    const { email, password } = req.body;
    const eUser = await info.findOne({ email });

    if (eUser) {
        if (eUser.password === password) {
            const token = jwt.sign({
                    id: eUser.id,
                },
                "MyAPPSECRET", {
                    expiresIn: "24h",
                }
            );
            return res.status(200).json({
                message: "Login successful",
                token,
                isSuccess: true,
            });
        }
    } else {
        return res.status(404).json({ message: "Email or password is incorrect" });
    }
};

// Function to update user details including activation/deactivation
exports.updateUser = async(req, res) => {
    try {
        const { id } = req.params; // Assuming the user id is passed as a parameter
        const { active } = req.body; // Get the 'active' field from the request body

        // Update only the 'active' field
        const updateUser = await info.findByIdAndUpdate(id, { active });

        res.status(200).json({ message: "User updated successfully", updateUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", error });
    }
};