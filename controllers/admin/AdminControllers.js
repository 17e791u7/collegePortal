const contactModel = require("../../models/Contact")
const CourseModel = require("../../models/course")
const nodemailer=require('nodemailer')
const courseController = require("../courseControllers")
const bcrypt=require("bcrypt")
const usermodel = require("../../models/user")

class AdminController{

    static dashboard=async(req,res)=>{
 
        try{
           const{name,email,image}=req.udata 
           const totalUser=await CourseModel.countDocuments({})
           const totalApproved=await CourseModel.countDocuments({status:"Approved"})
           const totalReject=await CourseModel.countDocuments({status:"Reject"})
           const totalPending=await CourseModel.countDocuments({status:"Pending"})
           console.log(totalUser,totalApproved,totalReject,totalPending)
            res.render('admin/dashboard',{n:name,e:email,i:image,totalUser,totalApproved,totalReject,totalPending,success:req.flash("success"),emailsend:req.flash("emailsend")})
        }
        catch(error)
        {
            console.log(error)
        }

    }

    static index=async(req,res)=>{
 
        try{
    
            res.render('admin/indexx')
        }
        catch(error)
        {
            console.log(error)
        }

    }

    static courseDisplay=async(req,res)=>{
 
        try{
            const{name,email,image}=req.udata
            const course=await CourseModel.find()
            res.render('admin/Course/allCourseDisplay',{n:name,e:email,i:image,c:course,success:req.flash("success")})
        }
        catch(error)
        {
            console.log(error)
        }

    } 

    static editCourse=async(req,res)=>{
 
        try{
            const {id} = req.params
            const{name,email,image}=req.udata
            const [course]=await CourseModel.find({_id:id})
            res.render('admin/Course/editCourse',{n:name,e:email,i:image,c:course})
        }
        catch(error)
        {
            console.log(error)
        }

    } 
    static viewCourse=async(req,res)=>{
 
        try{ 
            const {id} = req.params
            const{name,email,image}=req.udata 
            const [course]=await CourseModel.find({_id:id}) 
        
            res.render('admin/Course/viewCourse',{n:name,e:email,i:image,c:course})
        }
        catch(error)
        {
            console.log(error)
        }

    }

    static courseUpdate=async(req,res)=>{
 
        try{ 
            const{id} = req.params 
            const{name,email,phone,dob,address,gender,education,course}=req.body
            await CourseModel.findByIdAndUpdate(id,{name,email,phone,dob,address,gender,education,course
            }) 
            req.flash("success","you update the information successfully")
            res.redirect("/admin/courseDisplay")
        }
        catch(error)
        {
            console.log(error)
        }

    }

    // static update_status=async(req,res)=>{
 
    //     try{  
            
    //         const id=req.params.id
    //         console.log(id)
    //         const{name,email,status,comment}=req.body
    //         await CourseModel.findByIdAndUpdate(id,{status,comment})
    //         res.redirect("/admin/courseDisplay")
    //     }
    //     catch(error)
    //     {
    //         console.log(error)
    //     }

    // }

    static update_status=async(req,res)=>{
        try{
          const id=req.params.id;
          const {name,email,course,status,comment}=req.body
          await CourseModel.findByIdAndUpdate(id,{
            status,
            comment
          })
          if (status=="Reject") {
            this.RejectEmail(name,email,course,status,comment)
          } else {
            this.ApprovedEmail(name,email,course,status,comment)
          }
        //  this.sendEmail(name,email,course,status,comment)
          res.redirect('/admin/CourseDisplay')
        }catch(error){
            console.log(error)
        }
      }

      static RejectEmail = async (name, email, course, status, comment) => {
        //console.log(name, email, course)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "bhaskarsharma9833@gmail.com",
                pass: "ulen jieb qgst zhkw",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: ` Course ${course} Reject`, // Subject line
            text: "heelo", // plain text body
            html: `<head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                }
                .email-body {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .email-footer {
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">Message Registered Successfully</div>
                <div class="email-body">
                    <p>Dear <b>${name}</b>,</p>
                     
                    <p>Unfortunately, your course has been rejected. Please review the feedback below for further details:<br>
                   ${comment}</p>
                    <p>We appreciate your effort and encourage you to reach out if you have any questions or need clarification.</p>
                </div>
                <div class="email-footer">
                    Thank you,<br>
                    The Support Team
                </div>
            </div>
        </body>
             `, // html body
        });
    };
    static ApprovedEmail = async (name, email, course, status, comment) => {
        console.log(name, email, course)
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "bhaskarsharma9833@gmail.com",
                pass: "ulen jieb qgst zhkw",
            },
        });
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: ` Course ${course} Approved`, // Subject line
            text: "heelo", // plain text body
            html: `<head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    background-color: #f9f9f9;
                    margin: 0;
                    padding: 0;
                }
                .email-container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: #ffffff;
                    padding: 20px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
                .email-header {
                    font-size: 20px;
                    font-weight: bold;
                    margin-bottom: 10px;
                    text-align: center;
                }
                .email-body {
                    font-size: 16px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .email-footer {
                    font-size: 14px;
                    color: #777777;
                    text-align: center;
                    margin-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">Message Registered Successfully</div>
                <div class="email-body">
                    <p>Dear <b>${name}</b>,</p>
                   <p>We are pleased to inform you that your course has been approved! Congratulations on your hard work and dedication.<br>
                   ${comment}<p>
                    <p>We appreciate your effort and encourage you to reach out if you have any questions or need clarification.</p>
                </div>
                <div class="email-footer">
                    Thank you,<br>
                    The Support Team
                </div>
            </div>
        </body>
             `, // html body
        });
    }; 

    //admin contact display
    static contactDisplay=async(req,res)=>{
 
        try{
            const{name,email,image}=req.udata
            const contacts=await contactModel.find()
            res.render('admin/contact/allContactDisplay',{n:name,e:email,i:image,c:contacts})
        }
        catch(error)
        {
            console.log(error)
        }

    } 


    static resetPassword=async(req,res)=>{
 
        try{ 
    
            const{name,email}=req.udata 
            await this.resetPasswordMail(name,email)  
            req.flash("emailsend","email link send successfully")
            res.redirect("/admin/dashboard")
        }
        catch(error)
        {
            console.log(error)
        }

    } 

    static passwordPage=async(req,res)=>{
 
        try{
            const{name,email,image}=req.udata
            res.render('admin/resetPassword',{n:name,e:email,i:image})
        }
        catch(error)
        {
            console.log(error)
        }

    } 

    static updatePassword=async(req,res)=>{
 
        try{
            const{id}=req.udata
            const{password}= req.body  
            const hashpassword = await bcrypt.hash(password, 10)  
            await usermodel.findByIdAndUpdate(id,{password:hashpassword})
            req.flash("success","password updated successfully")

            res.redirect("/admin/dashboard")
        }
        catch(error)
        {
            console.log(error)
        }

    } 



    static resetPasswordMail = async (name,email) => {
        
        // connenct with the smtp server

        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,

            auth: {
                user: "bhaskarsharma9833@gmail.com",
                pass: "ulen jieb qgst zhkw",
            },
        }); 
        let info = await transporter.sendMail({
            from: "test@gmail.com", // sender address
            to: email, // list of receivers
            subject: `reset password for ${name}`, // Subject line
            text: "heelo", // plain text body
            html: `<head>
            <style>
                
            
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="email-header">Message Registered Successfully</div>
                <div class="email-body">
                    <p>Dear <b>${name} </b>,</p>
                   <p>please <a href="https://collegeportal-mhn5.onrender.com/admin/passwordPage" btn btn-secondry>Reset </a> your password using reset button<br>
                   <p>
                    
                   
                </div>
                <div class="email-footer">
                    Thank you,<br>
                    The Support Team
                </div>
            </div>
        </body>
             `, // html body
        });
    }; 





} 
module.exports=AdminController