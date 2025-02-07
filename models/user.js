const mongoose=require("mongoose")

const UserSchema= mongoose.Schema(
    {
        name:{type:String,Required:true},
        email:{type:String,Required:true},
        password:{type:String,Required:true} ,
        image:{  
            public_id:{type:String,Required:true},
            url:{
                type:String,Required:true
            }
           } 
           
        ,role:{type:String,default:"Student"},
        token: {
            type: String
        },

        is_verify:{
            type:String,
            default:0
          }
     } 
     ,{timestamps:true} ) 

const usermodel=mongoose.model("user",UserSchema) 
module.exports= usermodel 