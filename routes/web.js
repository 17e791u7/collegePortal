const express=require("express");
const FrontController = require("../controllers/FrontControllers");
const route =express.Router() ;  


console.log(FrontController)

route.get('/',FrontController.register)
route.get("/home",FrontController.home)
route.get("/contact",FrontController.contact)
route.get("/",FrontController.login)  
// route.get("/register",FrontController.register) 
route.get("/contact",FrontController.contact)
route.get("/about",FrontController.about)
//insertdata
route.post('/userinsert',FrontController.userinsert)

module.exports=route 
