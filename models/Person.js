const mongoose = require("mongoose")
const bcrypt = require('bcrypt')

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
  },
  username:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true
  }
})

// now before storing the data need to hash password 
personSchema.pre('save',async function(){

  // this will store the current person/document we are talking about
  const person = this;
  
  // firstly check is other than password is modified no need to hash
  if( !person.isModified('password') ) return;

  try{
    
    //generate salt 
    const salt = await bcrypt.genSalt(10);
    
    // now hash 
    const hashPassword =await bcrypt.hash(person.password,salt);


    person.password = hashPassword;
    
  }
  catch(err){
    return err;
  }
})

personSchema.methods.comparePassword = async function(receivedPassword){
  try{
    const isSame = await bcrypt.compare(receivedPassword , this.password);
    return isSame;
  }
  catch(err){
    throw err;
  }
}



const person = mongoose.model('person',personSchema)
module.exports = person