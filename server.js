const express = require("express")
const app = express();
const passport = require('passport')
const bodyparser = require('body-parser')
const db = require('./db')

const LocalStradegy = require('passport-local').Strategy;
const Person = require('./models/Person')

app.use(passport.initialize())


passport.use(new LocalStradegy(async(username,password,done)=>{
  // now run the logic 
  try{
    console.log("Received Credentials: ", username , password);
    const user =await Person.findOne({username});

    if(!user){
      return done(null,false,{message:'Incorrect username'});
    }
    // now compare the password using the hash method
    const isPasswordMatch =await user.comparePassword(password);
    if(isPasswordMatch){
      return done(null,user);
    }

    else 
      return done(null,false , {message:"Incorrect Password"});
  }
  catch(error){
    return done(error);
  }
}));

const localAuthMiddleware  =  passport.authenticate('local' , {session:false});

app.get('/' , function(req,res){
  res.send("OM NAMAH SHIVAY My name is MOHIT");
})




app.use(bodyparser.json());



// MiddleWare function  also have next 
const logRequest = (req,res,next)=>{
  console.log(`${new Date().toLocaleDateString()} Request Made to : ${req.originalUrl} `);
  next();
}



const PersonRoutes = require('../01/routes/Personroutes')
app.use('/person',localAuthMiddleware,PersonRoutes);

const MenuRouter = require('../01/routes/MenuRoutes');
app.use('/menu',MenuRouter);


const port = 3000;

app.listen(port,()=>{
  console.log ("Server stated successfully")
})