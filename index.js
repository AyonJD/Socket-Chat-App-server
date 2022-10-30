const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const ChatRoute = require('./Routes/ChatRoute');
const UserRoute = require('./Routes/UserRoute');
const MessageRoute = require('./Routes/MessageRoute');
const { default: mongoose } = require('mongoose');

const PORT = process.env.PORT || 5000;
const app = express();

const corsFonfig = {
    origin: true,
    credentials: true,
}

app.use(cors(corsFonfig));
app.options('*', cors(corsFonfig));
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => console.log("Database connected successfully"))
    .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


// Routes
app.get("/", (req, res) => {
    res.send("Server is running");
})
app.use('/chat', ChatRoute);
app.use('/user', UserRoute);
app.use('/message', MessageRoute);

//All
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
})

process.on('uncaughtException', err => {
    console.log(err);
    app.close(() => {
        process.exit(1);
    })
})