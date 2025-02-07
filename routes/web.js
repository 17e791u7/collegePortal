const express=require("express");
const FrontController = require("../controllers/FrontControllers");
const route =express.Router() ;   
const checkAuth=require("../middlewares/auth1");
const courseController = require("../controllers/courseControllers");
const AdminController = require("../controllers/admin/AdminControllers");
const authRoles = require("../middlewares/adminRole");
const isLogin = require("../middlewares/isLogin");
const contactController = require("../controllers/contactController");




route.get("/home",checkAuth,FrontController.home)
route.get("/contact",checkAuth,FrontController.contact)
route.get("/",isLogin,FrontController.login)  
route.get("/register",FrontController.register) 

route.get("/about",checkAuth,FrontController.about)
//insertdata
route.post('/userinsert',FrontController.userinsert)
route.get('/getdata',FrontController.getdata)
route.get('/update',FrontController.updateData)
route.post("/verifyLogin",FrontController.verifyLogin)
route.get('/logout',FrontController.logout) 
route.post('/course_insert',checkAuth,courseController.createCourse)
route.get('/courseDisplay',checkAuth,courseController.courseDisplay)
route.get("/viewCourse/:id",checkAuth,courseController.viewCourse)
route.get("/deleteCourse/:id",checkAuth,courseController.deleteCourse)
route.get("/editCourse/:id",checkAuth,courseController.editCourse)
route.post("/CourseUpdate/:id",checkAuth,courseController.courseUpdate)
route.get("/profile",checkAuth,FrontController.profile)
route.post("/changePassword",checkAuth,FrontController.changePassword)
route.post("/updateProfile",checkAuth,FrontController.updateProfile) 

//contactController admin 
route.post("/contactInfo",checkAuth,contactController.contactInfo)
route.get("/admin/viewContact/:Id",checkAuth,authRoles('admin'),contactController.viewContact)
route.get("/admin/editContact/:Id",checkAuth,authRoles('admin'),contactController.editContact)
route.get("/admin/deleteContact/:Id",checkAuth,authRoles('admin'),contactController.deleteContact)
route.get("/admin/contactDisplay",checkAuth,authRoles("admin"),AdminController.contactDisplay)
route.post("/admin/contactUpdate/:Id",checkAuth,authRoles("admin"),contactController.contactUpdate)



//adminController
route.get('/admin/dashboard',checkAuth,authRoles('admin'), AdminController.dashboard)
route.get('/admin/indexx',checkAuth,authRoles('admin'),AdminController.index)
route.get('/admin/courseDisplay',checkAuth,authRoles('admin'),AdminController.courseDisplay)
route.post('/admin/update_status/:id',checkAuth,authRoles('admin'),AdminController.update_status)
route.get('/admin/editCourse/:id',checkAuth,authRoles('admin'),AdminController.editCourse)
route.get('/admin/viewCourse/:id',checkAuth,authRoles('admin'),AdminController.viewCourse)
route.post('/admin/courseUpdate/:id',checkAuth,authRoles('admin'),AdminController.courseUpdate) 
//admin resetpassword
route.get('/admin/resetPassword',checkAuth,authRoles('admin'),AdminController.resetPassword)
route.get('/admin/passwordPage',checkAuth,authRoles('admin'),AdminController.passwordPage)
route.post('/admin/updatePassword',checkAuth,authRoles('admin'),AdminController.updatePassword)



// forgot password
route.post('/forgot_Password',FrontController.forgetPasswordVerify)
route.get('/reset_password',FrontController.reset_Password)
route.post('/reset_Password1',FrontController.reset_Password1)

//verifyMail
route.get('/register/verify',FrontController.verifyMail)




module.exports=route 
