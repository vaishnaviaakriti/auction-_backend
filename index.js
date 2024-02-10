const express = require("express")

const mongoose = require("mongoose")
const info = require("./src/Models/Info")
const { register, login } = require("./src/Controllers/info")
const { updateUser } = require("./src/Controllers/info")
const server = express()
const cors = require("cors")
const { addForm } = require("./src/Controllers/Form");
const { validateForm, isValidated } = require("./src/Middlewares");
const http = require("http")
    // const { Server } = require("socket.io ")
const { Server } = require('socket.io');
const { sendEmail } = require("./src/Helper/Email");
const bidController = require('./src/Controllers/bidController');
const { additem, getItem } = require("./src/Controllers/Item")
const app = http.createServer(server)
const io = new Server(app)

server.use(express.json());
server.use(cors());
server.get("/", (req, res) => {
    res.status(200).json({
        uname: "vaishnavi",
        uphone: "0000000",

    })
}), server.post("/register", register, sendEmail);
server.post("/login", login);
server.post("/addForm", validateForm, isValidated, addForm, sendEmail);
server.post('/submitBid', bidController.submitBid);

server.post('/addItem', additem)
server.get('/getItem', getItem)
    // server.put("/update-user", updateUser)
    // server.get("/get-product/:id", (req, res) => {
    //     res.send(req.params.id)
    // })

// io.on("connection", socket => {
//     console.log("new user connected")
//     socket.on("message", (message, room) => {
//         console.log(`New message recieved in $ { room }
//             and message is $ { message
//             }`);
//         socket.to(room).emit("message", message)

//     });
//     socket.on("join", (room) => {
//         console.log(room)
//         socket.join(room)
//         socket.emit("joined")
//     })



io.on("connection", socket => {
    console.log("new user connected");
    socket.on("message", (message, room) => {
        console.log(`New Message Received in ${ room }
            and message is ${ message }`);
        socket.to(room).emit("message", message)
    })
    socket.on("join", (room) => {
        console.log(room);
        socket.join(room)
        socket.emit("joined")
    })
})



app.listen("3000", () => {
    console.log("Server started")
});
mongoose
    .connect("mongodb://localhost:27017/test")
    .then(data => console.log("Database connected"))
    .catch(error => console.log(error))







// const mongoose = require("mongoose")
// const express = require("express")
// const { register, login, findUser } = require("./src/Controllers/info")
// const server = express()
// const cors = require("cors")
// const { verifyToken, isValidated, validationForm } = require("./src/Middlewares/index")
// const { addForm } = require("./src/Controllers/Form")
// const http = require('http');
// const { Server } = require("socket.io");

// const app = http.createServer(server)

// const io = new Server(app);

// server.use(express.json())
// server.use(cors())
// server.get("/", (req, res) => {
//     res.status(200).json({
//         uname: "Muskan",
//         uphone: "9908765432"
//     })
// })

// server.post("/register", register)
// server.post("/login", login)
// server.get("/get-user", verifyToken, findUser)
// server.post("/addForm", validationForm, isValidated, addForm)

// io.on("connection", socket => {
//     console.log("new user connected");
//     socket.on("message", (message, room) => {
//         console.log(`New Message Received in $ { room }
//             and message is $ { message }`);
//         socket.to(room).emit("message", message)
//     })
//     socket.on("join", (room) => {
//         console.log(room);
//         socket.join(room)
//         socket.emit("joined")
//     })


// })



// app.listen("3000", () => {
//     console.log("server started")
// })


// mongoose.connect("mongodb://localhost:27017/school")
//     .then(data => {
//         console.log("Database Connected");
//     })