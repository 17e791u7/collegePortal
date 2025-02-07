const jwt=require("jsonwebtoken")
const usermodel = require("../models/user") 

const isLogin=async(req,res,next)=>{ 

    const {token}=req.cookies 
    if(token){
        verifyLogin=jwt.decode(token) 
        const data= await usermodel.findOne({_id:verifyLogin.ID}) 

        if(data.role=="student")
            res.redirect("/home")

        else if(data.role=="admin")
            res.redirect("/admin/dashboard") 
        
    }  
    else {
    next() 
    }

} 
module.exports= isLogin
