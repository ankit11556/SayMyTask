const Reminder = require("../models/Reminder");

exports.createReminder = async (req,res) => {
  try {
    const {  dateTime, tasks} = req.body;

    const userId = req.user._id
    const newReminder = new Reminder({ dateTime, tasks,userId});

    await newReminder.save()
    res.status(201).json({ message: 'Reminder created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reminder' });
  }
}

exports.getReminders = async (req,res) => {
  try {
    const reminders = await Reminder.find({userId: req.user._id})
    res.status(200).json(reminders)
  } catch (error) {
    res.status(500).json({error: error.message})
  }
}

exports.editReminder = async (req,res) => {
  try {
    const {id} = req.params;
    const {  dateTime, tasks} = req.body;

    const edit = await Reminder.findByIdAndUpdate(
      {_id: id,userId: req.user._id},
      { dateTime, tasks},
      {new: true, runValidators: true}
    )

    if(!edit){
      return res.status(404).json({error: 'Reminder not found'})
    }

    res.status(200).json({ message: 'Reminder updated successfully',edit});
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

exports.deleteReminder = async (req,res) => {
  try {
    const {id} = req.params;
    const reminder = await Reminder.findByIdAndDelete({_id: id,userId: req.user._id})
  
    if (!reminder) {
      return res.status(404).json({message: "reminder not found"});
    }

    res.status(200).json({message: "Reminder delete successfully!"})
  } catch (error) {
    res.status(500).json({message: "something went wrong",error: error.message})
  }
}