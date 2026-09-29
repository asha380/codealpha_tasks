const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

const urlRoutes = require("./routes/urlRoutes");

app.use(express.json());
app.use(express.static(__dirname));
app.get("/test.html", (req, res) => {
    res.sendFile(__dirname + "/test.html");
});

app.use("/", urlRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

// Home Route
app.get("/", (req, res) => {
    res.send("CodeAlpha URL Shortener API is running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});