const express=require("express");
const router=express();
const project=require("../models/ProjectModel");

router.get("/",async (req , res)=>{
    try{
        const projects=await project.find();
        res.json(projects);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports=router;