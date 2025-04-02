const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Mongo connected");
})
.catch(()=>{
  console.log("Mongo not connected");
})