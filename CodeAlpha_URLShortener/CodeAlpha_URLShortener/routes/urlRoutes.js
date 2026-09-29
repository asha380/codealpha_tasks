const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const router = express.Router();
console.log("URL routes loaded");

// Create Short URL
router.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "Original URL is required"
            });
        }

        const shortCode = nanoid(6);

        const newUrl = new Url({
            originalUrl,
            shortCode
        });

        await newUrl.save();

        res.status(201).json({
            message: "URL shortened successfully",
            originalUrl: originalUrl,
            shortCode: shortCode,
            shortUrl: `http://localhost:3000/${shortCode}`
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
// Redirect to Original URL
router.get("/:shortCode", async (req, res) => {
    try {
        const url = await Url.findOne({
            shortCode: req.params.shortCode
        });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

module.exports = router;