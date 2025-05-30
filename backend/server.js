require('dotenv').config()
const app = require('./app')
const connectDB = require('./config/db')

const PORT = process.env.PORT

connectDB().then(()=>{
app.listen(PORT,()=>{
  
  console.log(`server is running at http://localhost:${PORT}`);
  
  })
}).catch((err)=>{
  console.error("Failed to connect to DB:",err)
})