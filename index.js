const express = require("express")
const mongoose = require("mongoose")
const info = require("./src/Models/Info")
const { register, login } = require("./src/Controllers/info")
const server = express()
const cors = require("cors")
const { addForm } = require("./src/Controllers/Form")
const { validateForm, isValidated } = require("./src/Middlewares")
const http = require("http")
const app = http.createServer(server)
const { Server } = require("socket.io")

const io = new Server(app)
server.use(express.json());
server.use(cors());
server.get("/", (req, res) => {
    res.status(200).json({
        uname: "vaishnavi",
        uphone: "0000000",

    })
}), server.post("/register", register);
server.post("/login", login);
server.post("/addForm", validateForm, isValidated, addForm);
io.on("connection", socket => {
    console.log("new user connected")
    socket.on("message", (message, room) => {
        console.log(`New message recieved in $ { room }
            and message is $ { message
            }`);
        socket.to(room).emit("message", message)

    });
    socket.on("join", (room) => {
        console.log(room)
        socket.join(room)
        socket.emit("joined")
    })
})



app.listen("3000", () => {
    console.log("Server started")
});
mongoose.connect("mongodb://localhost:27017")
    .then(data => console.log("Database connected"))
    .catch(error => console.log(error))