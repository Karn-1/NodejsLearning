const mongoose = require("mongoose")


// define the Person Schema  
const personSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true // as this is mandatory parameter for the schema.

  },
  age:{
    type:String
  },
  work:{
    type:String,
    enum:['chief' , 'waiter' , 'manager'],
    required:true
  },
  mobile:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  salary:{
    type:Number,
    required:true,
  }
})

const person = mongoose.model('person',personSchema)
module.exports = person