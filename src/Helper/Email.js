const nodemailer = require("nodemailer")


exports.sendEmail = (req, res) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
                user: "aakritivaishu@gmail.com",
                pass: "emlk dpjo wjrx sdzr"

            }

        })
        const data = {
            form: "aakritivaishu@gmail.com",
            to: req.body.email,
            subject: req.subject,
            text: req.text


        }
        transport.sendMail(data, (error, info) => {
            if (error) {
                console.log(error);
                res.status(400).json({ messaage: "Email Delivery Error" })
            } else {
                console.log(info);
                res.status(201).json({ message: "sucess" })
            }
        })
    } catch (error) {
        res.status(400).json({ message: "Email Error Occured" })
    }
}