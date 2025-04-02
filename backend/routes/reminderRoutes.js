const express = require('express')
const reminderRouter = express.Router();
const reminderController = require('../controllers/reminderController')

reminderRouter.post('/',reminderController.createReminder)
reminderRouter.get('/',reminderController.getReminders)
reminderRouter.delete('/:id',reminderController.deleteReminder)
module.exports = reminderRouter;