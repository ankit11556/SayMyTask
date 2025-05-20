const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({
  tasks: {
    type: [String],  // This will store an array of task names (like "Eat", "Study: Math")
    required: true
  },
  dateTime: {
    type: Date,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
  
});

// Model creation
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;