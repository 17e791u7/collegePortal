const mongoose=require("mongoose")


const ContactSchema= mongoose.Schema({user_id:{type:"String"},
                                     firstName:{type:"String",Required:true},
                                     lastName:{type:"String",Required:true},
                                     Username:{type:"String",Required:true}, 
                                     email:{type:"String"} ,
                                     address1:{type:"String",Required:true},
                                     address2:{type:"String"} ,
                                     country:{type:"String",Required:true},
                                      state:{type:"String",Required:true} ,
                                      user_id:{type:"String"}
                                    
}) 

const contactModel=new mongoose.model("ContactInfo",ContactSchema)

module.exports=contactModel 