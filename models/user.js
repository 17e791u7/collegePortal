const mongoose=require("mongoose")

const UserSchema= mongoose.Schema(
    {
        name:{type:String,require},
        email:{type:String,require},
        paswword:{type:String,require}
     }
        
) 

const usermodel=mongoose.model("user",UserSchema) 
module.exports= usermodel 