const info = require("../Models/Info")
const jwt = require("jsonwebtoken")
exports.register = async(req, res) => {
    const { name, email, phone, password } = req.body
    console.log(req.body)
    const _user = new info({
        name,
        email,
        phone,
        password
    })

    const eUser = await info.findOne({ email, })

    if (!eUser) {
        _user.save().then(newUser => {
                res.status(201).json({ message: "Acoount Created successfully" })
            })
            .catch(error => {
                res.status(400).json({ message: "Error occured", error })
            });
    } else {
        res.status(400).json({
            message: "User Already Exist"
        });
    }

}
exports.login = async(req, res) => {
    const { email, password } = req.body
    const eUser = await info.findOne({ email })
    if (eUser) {
        if (eUser.password === password) {
            const token = jwt.sign({
                id: eUser.id
            }, "MyAPPSECRET", {
                expiresIn: "24h"
            })
            return res.status(200).json({
                message: "login success",
                token,
                isSucess: true
            })


        }
    } else {
        return res.status(404).json({ message: "email or pass incorrect" })



    }
}