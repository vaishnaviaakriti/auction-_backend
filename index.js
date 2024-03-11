const express = require("express");
const mongoose = require("mongoose");
const bidController = require('./src/Controllers/bidController');
const adminLoginController = require('./src/Controllers/adminLogin');
const { register, login, users, updateUser } = require("./src/Controllers/info");
const { addForm, getForms } = require("./src/Controllers/Form");
const { validateForm, isValidated } = require("./src/Middlewares");
const { additem, getItem } = require("./src/Controllers/Item");
const { sendEmail } = require("./src/Helper/Email");
const { createCustomer, getAllCustomers, updateCustomerStatus } = require('./src/Controllers/customer'); // Importing Customer controllers
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = express();
const app = http.createServer(server);
const io = new Server(app);

server.use(express.json());
server.use(cors());

// Define routes
server.get("/", (req, res) => {
    res.status(200).json({
        uname: "vaishnavi",
        uphone: "0000000",
    });
});

// User routes
server.get("/users", users);
server.post("/register", register, sendEmail);
server.post("/login", login);
server.put("/updateUser/:id", updateUser);

// Form routes
server.post("/addForm", validateForm, isValidated, addForm, sendEmail);
server.get("/getForms", getForms);

// Bid routes
server.post('/submitBid', bidController.submitBid);
server.get('/getHighestBidAndWinner', bidController.getHighestBidAndWinner);
server.get('/bids', bidController.getBidInfo);

// Item routes
server.post('/addItem', additem);
server.get('/getItem', getItem);

// Customer routes
server.post('/addCustomer', createCustomer);
server.get('/getCustomers', getAllCustomers);
server.put('/updateCustomer/:id', updateCustomerStatus);
// PUT route for updating customer status

// Admin login route
server.post('/admin/login', adminLoginController.login);

// Socket.io integration
io.on("connection", socket => {
    console.log("New user connected");
    socket.on("message", (message, room) => {
        console.log(`New Message Received in ${room} and message is ${message}`);
        socket.to(room).emit("message", message);
    });
    socket.on("join", (room) => {
        console.log(`Joining room: ${room}`);
        socket.join(room);
        socket.emit("joined");
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Database connected"))
    .catch(error => console.error("Database connection error:", error));