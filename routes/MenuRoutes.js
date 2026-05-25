const express = require('express')
const router = express.Router();
const Menu = require('../models/Menu')



// POST add menu items 
router.post('/',async(req,res)=>{
 try{
      const data = req.body;
      const newMenu = new Menu(data); // make new item 
      const response = await newMenu.save(); // save it to the database 
      console.log("Menu item saved")
      res.status(200).json(response);
 }
 catch(error){
  console.log(err);
  res.status(500).json({error:'Internel Serer Error'});
 }
});

// GET all the documents from the database
router.get('/' , async(req,res)=>{
  try{
    const data = await Menu.find();
    console.log("Menu Data fetch successfully");
    res.status(200).json(data);
  }  
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internel Server Error"});
  }
})

router.get('/:tastType', async(req,res)=>{
  try{
    const tastType = req.params.tastType;
    // / firstly check if someone request the food other than available type the no need to process
    if(tastType == 'sweet'||tastType =='sour'||tastType == 'spicy' ){
      // now fetch acc to this 
      const data = await Menu.find({taste:tastType});
      console.log("Menu datatype response fetched")
      res.status(200).json(data);
    }
    else{
      res.status(404).json({error:"Invalid TastType"});
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({error:"Internal Server Error"});
  }
})
/// PUT updating the data already stored in the database 
router.put('/:id' , async(req,res)=>{
  try{
    const id = req.params.id;

    // now data to be updated is available in the respone body
    const UpdatedData = req.body;

    // find the old stored data by id and update 
    const response = await Menu.findByIdAndUpdate(id , UpdatedData, {
      new :true, // return updated data
      runValidators:true,
  });

  if(!response){
    // when not get response means invalid id
    res.status(404).json({erro:'Invalid ID'})
  }
  console.log("Menu item updated successfully");
  res.status(202).json(response);
  }
  catch(error){
    res.send(500).json({error:"Internel Server Error"});
  }
})

router.delete('/:id',async(req,res)=>{
  try{
    const id = req.params.id;

    // find this id 
    const data = await Menu.findByIdAndDelete(id);
    console.log(data);
    if(!data){
      return res.status(404).json({ error: 'Menu Item not found' });
    }
    console.log('data delete');
    res.status(200).json({message: 'Menu Deleted Successfully'});
  }
  catch(error){
      console.log(err);
      res.status(500).json({error: 'Internal Server Error'});
  }
})

module.exports = router;