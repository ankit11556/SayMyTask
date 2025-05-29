const express = require('express');
const app = express();

require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmt = require('helmet')  
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const connectDB = require('./config/db')
 
app.use(helmt());
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
const { default: helmet } = require('helmet');

app.use("/api/reminders",reminderRouter);
app.use("/api/auth",authRouter);
app.use("/api/user-profile",userProfileRouter);

app.use((err,req,res,next)=>{
  console.log(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong',
  });
});

const PORT = process.env.PORT

connectDB().then(()=>{
app.listen(PORT,()=>{
  if(process.env.NODE_ENV !== 'production' ){
  console.log(`server is running at http://localhost:${PORT}`);
  }
  })
}).catch((err)=>{
  console.error("Failed to connect to DB:",err)
})