const jwt=require("jsonwebtoken")
const usermodel = require("../models/user")
const checkAuth= async (req,res,next)=>{ 
console.log("checkauth") 
const {token}=req.cookies  


if(!token){
     req.flash("error","Unauthoreised user please login") 
     res.redirect("/")  
} 

else{
    const verifyToken=jwt.verify(token,'hkjdfhfkj7864876')  
    const data= await usermodel.findOne({_id:verifyToken.ID})
    // console.log(data) 
    req.udata=data
    next()
} 



}
module.exports=checkAuth 