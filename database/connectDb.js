const mongoose=require("mongoose") ;
const url= "mongodb://127.0.0.1:27017/collegePortal"  
const live_url="mongodb+srv://bhaskarsharma9833:ram123@cluster0.h4bqw.mongodb.net/collegePortal?retryWrites=true&w=majority&appName=Cluster0" 

const connectDb=()=>{
    return mongoose.connect(live_url).then(()=>console.log("connected")).catch((error)=>console.log(error))
} 
module.exports=connectDb ;