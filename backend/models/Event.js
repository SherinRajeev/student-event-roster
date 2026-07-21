const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  date: Date,
  description: String,
  estimatedAttendance: { type: Number, default: 0 }
});

const Event = mongoose.model('events', eventSchema);
module.exports = Event;