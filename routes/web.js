const express=require("express");
const FrontController = require("../controllers/FrontControllers");
const route =express.Router() ;  


console.log(FrontController)

route.get("/",FrontController.home)
route.get("/contact",FrontController.contact)
route.get("/login",FrontController.login)  
route.get("/register",FrontController.register) 
route.get("/contact",FrontController.contact)
route.get("/about",FrontController.about)

module.exports=route 
