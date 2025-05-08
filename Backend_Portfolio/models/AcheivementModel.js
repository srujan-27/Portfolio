const mongoose=require("mongoose")

const AcheivementSchema=new mongoose.Schema({
    
    description:String,
    photos:[String],
    title:String,
},{
    collection:'Achievements'
});

const Acheivement=mongoose.model('Acheivement',AcheivementSchema);

module.exports=Acheivement;
