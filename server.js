
const express = require("express")
const app = express();
const port = 3000;

const bodyparser = require('body-parser')
app.use(bodyparser.json());


const db = require('./db')



const PersonRoutes = require('../01/routes/Personroutes')
app.use('/person',PersonRoutes);


app.get('/',(req,res)=>{
  res.send("OM NAMAH SHIVAY My name is MOHIT ")
})



app.listen(3000,()=>{
  console.log("Server stated successfully")
})