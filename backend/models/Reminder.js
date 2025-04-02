const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  tasks: {
    type: [String],  // This will store an array of task names (like "Eat", "Study: Math")
    required: true
  }
});

// Model creation
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;