const express = require('express');
const app = express();

require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('./config/db')
 

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const reminderRouter = require('./routes/reminderRoutes')
const authRouter = require('./routes/authRoutes')

app.use("/api/reminders",reminderRouter)
app.use("/api/auth",authRouter)


const PORT = process.env.PORT

app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})