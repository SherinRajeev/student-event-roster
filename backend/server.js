const express = require('express');
const mongoose = require('mongoose');
const Event = require('./models/Event');
const cors = require('cors');

// Allow your Vercel domain specifically
app.use(cors({
    origin: 'https://your-frontend-domain.vercel.app' 
}));

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();
console.log("My Mongo URL is:", process.env.MONGODBURL); // Add this line to test

const port = 5000;

// GET all events
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ success: true, message: "Events returned", data: events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST a new event
app.post('/api/events', async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ success: false, error: "Event details cannot be empty" });
    }
    
    if (!req.body.title) {
      return res.status(400).json({ success: false, error: "Event title is required" });
    }

    const event = new Event(req.body);
    await event.save();
    res.status(201).json({ success: true, message: "Event added", data: event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// DELETE an event
app.delete('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!eventId) {
      return res.status(400).json({ success: false, error: "Event ID is required" });
    }

    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }
    res.status(200).json({ success: true, message: "Event deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

async function main() {
  await mongoose.connect(process.env.MONGODBURL);
}

main()
  .then(() => console.log("DB connected.."))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Events server listening on port ${port}`);
});