// const express=require('express');
// const app=express();

// app.get("/",(req,res)=>{
//     console.log("sucsess");
        
// })

// app.listen(3000);
const express=require("express");
const app=express();

const mongoose=require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true})

