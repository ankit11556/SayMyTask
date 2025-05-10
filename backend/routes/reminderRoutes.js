const express = require('express')
const reminderRouter = express.Router();
const reminderController = require('../controllers/reminderController')
const {protect} = require('../middlewares/authMiddleware')

reminderRouter.post('/',protect,reminderController.createReminder)
reminderRouter.get('/',protect,reminderController.getReminders)
reminderRouter.put('/:id',protect,reminderController.editReminder)
reminderRouter.delete('/:id',protect,reminderController.deleteReminder)
module.exports = reminderRouter;