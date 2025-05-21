const express = require('express');
const app = express();

require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

require('./config/db')
 

app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const reminderRouter = require('./routes/reminderRoutes')
const authRouter = require('./routes/authRoutes')
const userProfileRouter = require('./routes/userProfileRoutes')

app.use("/api/reminders",reminderRouter)
app.use("/api/auth",authRouter)
app.use("/api/user-profile",userProfileRouter)

const PORT = process.env.PORT

app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})