const Form = require("../Models/Form");

exports.addForm = async(req, res, next) => {
    try {
        // Get the name from the request body
        const { name } = req.body;

        // Perform a query to find a name in the database
        const existingName = await Form.findOne({ name });

        if (existingName) {
            // If the name exists, use it in req.text
            req.text = `Form is submitted successfully by ${name}`;
        } else {
            // If the name doesn't exist, you might want to handle this case accordingly
            req.text = `Form is submitted successfully, but the name ${name} was not found in the database.`;
        }

        // Save the form to the database
        const _form = new Form(req.body);
        await _form.save();

        req.subject = "user form submission";
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error Occurred" });
    }
};