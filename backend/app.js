const express = require('express');
const app = express();
require('dotenv').config()
app.get("/",(req,res)=>{
  res.send("Hello World")
})

const PORT = process.env.PORT

app.listen(PORT,()=>{
  console.log(`server is running at http://localhost:${PORT}`);
})