const mongoose=require("mongoose")

const UserSchema= mongoose.Schema(
    {
        name:{type:String,Required:true},
        email:{type:String,Required:true},
        password:{type:String,Required:true} 
        ,role:{type:String,default:"Student"}
     } 
     ,{timestamps:true} ) 

const usermodel=mongoose.model("user",UserSchema) 
module.exports= usermodel 