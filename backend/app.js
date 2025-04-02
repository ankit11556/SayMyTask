const express = require('express');
const app = express();
const reminderRouter = require('./routes/reminderRoutes')
require('dotenv').config()

require('./config/db')

app.use(express.json())
app.use("/api/reminders",reminderRouter)

app.get("/",(req,res)=>{
  res.send("Hello World")
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})