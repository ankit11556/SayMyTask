const express = require('express');
const app = express();

const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')  
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
 
app.use(helmet());
app.use(morgan('dev'));
app.use(rateLimit({
  windowMs: 15*60*1000,
  max: 100
}))
app.use(cors({
  origin: process.env.BASE_URL,
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

const reminderRouter = require('./routes/reminderRoutes')
const authRouter = require('./routes/authRoutes')
const userProfileRouter = require('./routes/userProfileRoutes');
const translateRouter = require('./routes/translateRoute')

app.use("/api/reminders",reminderRouter);
app.use("/api/auth",authRouter);
app.use("/api/user-profile",userProfileRouter);
app.use("/api",translateRouter)

app.use((err,req,res,next)=>{
  console.log(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  });
});

module.exports = app