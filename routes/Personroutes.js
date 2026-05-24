const express = require('express')
const router = express.Router();
const Person = require('../models/Person');



// POST route to add a person 
router.post('/' , async (req, res) =>{ 
  try{ 
  const data = req. body // Assuming the request body contains the person data 
  // Create a new Person document using the Mongoose model 
  const newperson= new Person(data);

  // Save the new person to the database 
  const response = await newperson.save(); 
  console.log( "data saved" ) ; 
  res.status (200).json(response) ; 
  }
  catch(err){ 
  console.log (err); 
  res.status(400).json('Internal Server Error'); 
  }
})


router.get('/' , async(req,res)=>{
  try{
    console.log("YOOOO");
    const data = await Person.find();
    res.status(200).json(data);
  }
  catch(error){
    console.log(error);
    res.send(404).json({error:"Error in finding data"});
  }
})



router.get('/:workType' , async(req,res)=>{
  try{
    const worktype = req.params.workType;
    if(worktype=='chief' || worktype=='manager' || worktype=='waiter'){
      const data = await Person.find({work:worktype});
      console.log("Data fetch successfully");
      res.status(200).json(data);
    }
    else{
      // not among these work type
      res.status(404).json({error:"This data is not available"});
    }
  }
  catch(error){
    console.log(error)
    res.status(500).send({error:"Error"});
  }
})

router.put('/:id' ,async(req,res)=>{
  try{
    const personId = req.params.id;
    const personNewdata = req.body;

    // now we will update
    const response = await Person.findByIdAndUpdate(personId,personNewdata, {
      new:true , // means when updated then return this and store in response
      runValidators:true // jo new data update kar rahe run karo validator ish pe
    })

    // when this id person not available
    if(!response){
      res.status(404).json({error:"Not found"});
    }

    console.log("Data updation done");
    res.status(202).json(response)
  }
  catch(error){
    console.log("data not updated" , error)
    res.status(500).json({error:"Internel server error"})
  }
})

rouer.delete('/:id', async(req,res)=>{
  try{
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

    if(!response){
      return res.status(404).json({error:"Person not found"});
    }

    console.log("Data delete");
    res.status(200).json("person Deleted successfully");
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});
  }
})


module.exports = router