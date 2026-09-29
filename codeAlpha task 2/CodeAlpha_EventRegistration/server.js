
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const eventRoutes = require("./routes/eventRoutes");

const app = express();

app.use(express.json());

// Event routes
app.use("/events", eventRoutes);

app.get("/", (req, res) => {
    res.send("Event Registration System API is running!");
});

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err.message);
    });