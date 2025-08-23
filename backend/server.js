const dotenv = require('dotenv')
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

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