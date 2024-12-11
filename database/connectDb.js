const mongoose=require("mongoose") ;
const url= "mongodb://127.0.0.1:27017/collegePortal" 
const connectDb=()=>{
    return mongoose.connect(url).then(()=>console.log("connected")).catch((error)=>console.log(error))
} 
module.exports=connectDb ;