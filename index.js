const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const ChatRoute = require('./Routes/ChatRoute');
const { connectToServer } = require('./Utils/dbConnect');

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
connectToServer(err => {
    if (!err) {
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } else {
        console.log(err);
    }
})

//All
app.all("*", (req, res) => {
    res.status(404).json({ message: "Route not found" });
})

// Routes
app.use('/chat', ChatRoute);

process.on('uncaughtException', err => {
    console.log(err);
    app.close(() => {
        process.exit(1);
    })
})