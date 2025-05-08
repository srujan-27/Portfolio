const express=require("express");
const router=express();

const acheivement=require("../models/AcheivementModel")

router.get("/",async(req,res)=>{
    try{
        const acheivements=await acheivement.find();
        res.json(acheivements);
        
        
    }
    catch{
        res.status(500).json({ message: error.message });
    }
})
module.exports = router;