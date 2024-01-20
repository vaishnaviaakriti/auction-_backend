const { check } = require("express-validator")
const { validationResult } = require("express-validator")
exports.validateForm = [
    check("name").notEmpty().withMessage("Please Enter Name"),
    check("phoneNumber").isMobilePhone().withMessage("Please enter Phone"),
    check("email").isEmail().withMessage("Please Enter  valid Email"),
    check("intrest").notEmpty().withMessage("please enter intrest"),
    check("message").isLength({ max: 100, min: 1 }).withMessage("please enter within 100 chars ")
]



exports.isValidated = (req, res, next) => {

    const errors = validationResult(req)
    if (errors.array().length > 0) {
        return res.status(400).json({ message: errors.array()[0] })
    }
    next()
}