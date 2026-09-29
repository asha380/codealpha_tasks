const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");

// 1. Create a new event
router.post("/", async (req, res) => {
    try {
        const event = new Event(req.body);
        await event.save();
        res.status(201).json({
            message: "Event created successfully",
            event
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 2. Get all events
router.get("/", async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Register for an event
router.post("/:id/register", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        const registration = new Registration({
            event: event._id,
            name: req.body.name,
            email: req.body.email
        });

        await registration.save();

        res.status(201).json({
            message: "Registration successful",
            registration
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 4. Get all registrations for a specific event
router.get("/:id/registrations", async (req, res) => {
    try {
        const registrations = await Registration.find({ eventId: req.params.id });
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 5. Get event by ID
router.get("/:id", async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 6. Cancel / Delete a registration
router.delete("/registration/:regId", async (req, res) => {
    try {
        await Registration.findByIdAndDelete(req.params.regId);
        res.status(200).json({ message: "Registration cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;