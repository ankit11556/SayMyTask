const mongoose = require('mongoose')

const reminderSchema = new mongoose.Schema({
  tasks: {
    type: [String],  // This will store an array of task names (like "Eat", "Study: Math")
    required: true,
    validate: {
      validator: function(arr){
        return arr.length > 0 && arr.every(task=>typeof task === 'string' && task.trim().length>0)
      },
      message: "Tasks must be a non-empty array of non-empty strings"
    }
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
  
},{timestamps:true});

reminderSchema.index({userId: 1, dateTime: 1})

// Model creation
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;