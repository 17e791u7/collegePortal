const usermodel = require("../models/user")
const bcrypt = require('bcrypt')
const cloudinary = require("cloudinary")
const jwt = require("jsonwebtoken");
const CourseModel = require("../models/course");
const randomstring=require("randomstring")
const nodemailer=require("nodemailer")




//cloudinary setup


// Configuration
cloudinary.config({
   cloud_name: 'dvt6f2yax',
   api_key: '389155789221486',
   api_secret: '9VKmQeS4py4MzA3sSGlu5D-2h1w' // Click 'View API Keys' above to copy your API secret
});

class FrontController {
   static home = async (req, res) => {
      try {
         const { name, image, email, id } = req.udata

         const btech = await CourseModel.findOne({ user_id: id, course: "btech" })
         const bca = await CourseModel.findOne({ user_id: id, course: "bca" })
         const mca = await CourseModel.findOne({ user_id: id, course: "mca" })
         console.log(btech)
         console.log(bca)
         console.log(mca)
         res.render("home", { n: name, i: image, e: email, bca: bca, mca: mca, btech: btech })

      }
      catch (error) {
         console.log(error)

      }

   }



   static about = async (req, res) => {
      try {
         const { name, image } = req.udata
         res.render("about", { n: name, i: image })
      }
      catch (error) {
         console.log(error)

      }

   }



   static login = async (req, res) => {
      try {
         res.render("login", { msg: req.flash("success"), msg1: req.flash("error"), error: req.flash("error"),resetPassword:req.flash("resetPassword"),notRegistered:req.flash("notRegistered"),passwordChanged:req.flash("passwordChanged"),norole: req.flash("norole") })
      }
      catch (error) {
         console.log(error)

      }

   }

   static contact = async (req, res) => {
      try {
         const { name, image } = req.udata
         res.render("contact", { n: name, i: image , checkbox:req.flash("checkbox"),success:req.flash("success")})
      }
      catch (error) {
         console.log(error)

      }

   }

   static register = async (req, res) => {
      try {
         res.render("register", { msg: req.flash("error"),verifyEmail: req.flash("verifyEmail") })
      }
      catch (error) {
         console.log(error)

      }

   }

   //user insert

   static userinsert = async (req, res) => {
      try {

         // console.log(req.files)


         /* 
         let data = new usermodel({ name, email, password }) 
          console.log(data)
         data = await data.save()
         console.log(data) 
           
 
          res.redirect('/')  */
         const { name, email, password, confirmpassword } = req.body

         if (!name || !email || !password || !confirmpassword) {
            req.flash("error", "All fields are required")
            return res.redirect("/register")
         }

         const isEmail = await usermodel.findOne({ email })

         if (isEmail) {
            req.flash("error", "Email already exists")
            return res.redirect("/register")
         }

         if (password != confirmpassword) {
            req.flash("error", "Password does not match")
            return res.redirect("/register")
         }

         const file = req.files.image;
         const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, { folder: "userprofile" })
         console.log(imageUpload)


         const hashpassword = await bcrypt.hash(password, 10)
         const data = await usermodel.create({
            name, email, password: hashpassword,
            image: {
               public_id: imageUpload.public_id, url: imageUpload.secure_url
            }

         }) 

         if (data) {

            this.sendVerifymail(name, email, data.id)
            req.flash('verifyEmail', 'Your Register Success, Plz verify mail')
            res.redirect('/register')
        } else {
            req.flash('error', 'not found')
            req.redirect('/register')
        }

         req.flash("success", "Registered Successfully ! please login here ")

         res.redirect('/')



      }
      catch (error) {
         console.log(error)

      }

   } 



   static sendVerifymail = async (name, email, user_id) => {
      //console.log(name, email, user_id);
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
        subject: "For Verification mail", // Subject line
        text: "heelo", // plain text body
        html: "<p>Hii " +
          name +
          ',Please click here to <a href="https://collegeportal-mhn5.onrender.com/register/verify?id=' +
          user_id +
          '">Verify</a>Your mail</p>.',
  
      });
      //console.log(info);
    }; 

    static verifyMail = async (req, res) => {
      try {
          //console.log(req.query.id)
          const updateinfo = await usermodel.findByIdAndUpdate(req.query.id, {
              is_verify: 1,
          });
          console.log(updateinfo)
          if (updateinfo) {
              let token = jwt.sign({ ID: updateinfo.id }, 'hkjdfhfkj7864876')
              //console.log(token)middleware
              res.cookie('token', token, token, {
                  httpOnly: true,
                  secure: true,
                  maxAge: 3600000,
              })
              res.redirect("/home");
          }
      } catch (error) {
          console.log(error);
      }
  };


   static async getdata(req, res) {
      try {
         let data
         data = await usermodel.find({ _id: "675a8a3b9c0204ea7d56d2cc" })
         console.log(data)


      }
      catch (error) {

         console.log(error)


      }
   }


   static async updateData(req, res) {
      try {
         let data
         data = await usermodel.updateOne({ _id: "675a8a3b9c0204ea7d56d2cc" }, { $set: { name: "monu" } }).then(() => console.log("data inserted"))
         console.log(data)



      }
      catch (error) {

         console.log(error)


      }
   }


   static async verifyLogin(req, res) {
      try {
         //   console.log(req.body) ;


         const { email, password } = req.body

         if (!email || !password) {
            req.flash("error", "All fields are required")
            return res.redirect("/")
         }

         const user = await usermodel.findOne({ email })

         if (!user) {
            req.flash("error", "you are not registered user !")
            return res.redirect("/")
         }

         const isMatch = await bcrypt.compare(password, user.password)

         if (isMatch) {
            
            if (user.role == "Student" && user.is_verify==1) {
               const token = jwt.sign({ ID: user.id }, "hkjdfhfkj7864876")
               console.log(token)
               res.cookie("token", token)
               return res.redirect("/home")
            }
           
           
          else if (user.role == "admin") {
               const token = jwt.sign({ ID: user.id }, "hkjdfhfkj7864876")
               console.log(token)
               res.cookie("token", token)
               return res.redirect("/admin/dashboard")
            }
            else {
               req.flash("error", "please verify your email")
               return res.redirect("/")
   
            }

         }
         else {
            req.flash("error", "your email password doesn't match")
            return res.redirect("/")

         }




      }
      catch (error) {

         console.log(error)


      }
   }

   static logout = async (req, res) => {
      try {
         res.clearCookie("token");//token nam ki cookie ko clear rahe he
         res.redirect("/")
      }
      catch (error) {
         console.log(error)

      }

   }

   static profile = async (req, res) => {
      try {
         const { name, image, email } = req.udata
         res.render("profile", { n: name, i: image, e: email, message: req.flash("error") })

      }
      catch (error) {
         console.log(error)
      }


   }
   static changePassword = async (req, res) => {
      try {
         const { id } = req.udata;
         // console.log(req.body);
         const { op, np, cp } = req.body;
         if (op && np && cp) {
            const user = await usermodel.findById(id);
            const isMatched = await bcrypt.compare(op, user.password);
            //console.log(isMatched)
            if (!isMatched) {
               req.flash("error", "Current password is incorrect ");
               res.redirect("/profile");
            } else {
               if (np != cp) {
                  req.flash("error", "Password does not match");
                  res.redirect("/profile");
               } else {
                  const newHashPassword = await bcrypt.hash(np, 10);
                  await usermodel.findByIdAndUpdate(id, {
                     password: newHashPassword,
                  });
                  req.flash("success", "Password Updated successfully ");
                  res.redirect("/");
               }
            }
         } else {
            req.flash("error", "ALL fields are required ");
            res.redirect("/profile");
         }
      } catch (error) {
         console.log(error);
      }

   };

   static updateProfile = async (req, res) => {
      try {
         const { id } = req.udata;
         const { name, email } = req.body;
         if (req.files) {
            const user = await usermodel.findById(id);
            const imageID = user.image.public_id;
            // console.log(imageID);

            //deleting image from Cloudinary
            await cloudinary.uploader.destroy(imageID);
            //new image update
            const imagefile = req.files.image;
            const imageupload = await cloudinary.uploader.upload(
               imagefile.tempFilePath,
               {
                  folder: "userprofile",
               }
            );
            var data = {
               name: name,
               email: email,
               image: {
                  public_id: imageupload.public_id,
                  url: imageupload.secure_url,
               },
            };
         } else {
            var data = {
               name: name,
               email: email,
            };
         }
         await usermodel.findByIdAndUpdate(id, data);
         req.flash("success", "Update Profile successfully");
         res.redirect("/profile");
      } catch (error) {
         console.log(error);
      }
   };

   static forgetPasswordVerify = async (req, res) => {
      try {
        const { email } = req.body;
        const userData = await usermodel.findOne({ email: email });
        //console.log(userData)
        if (userData) {
          const randomString = randomstring.generate();
          await usermodel.updateOne(
            { email: email },
            { $set: { token: randomString } }
          );
          this.sendEmail(userData.name, userData.email, randomString);
          req.flash("resetPassword", "Plz Check Your mail to reset Your Password!");
          res.redirect("/");
        } else {
          req.flash("notRegistered", "You are not a registered Email");
          res.redirect("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    static sendEmail = async (name, email, token) => {
      // console.log(name,email,status,comment)
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
        subject: "Reset Password", // Subject line
        text: "heelo", // plain text body
        html: "<p>Hii " +
          name +
          ',Please click here to <a href="https://collegeportal-mhn5.onrender.com/reset_password?token=' +
          token +
          '">Reset</a>Your Password.',
  
      });
    };
  
    static reset_Password = async (req, res) => {
      try {
        const token = req.query.token;
        const tokenData = await usermodel.findOne({ token: token });
        if (tokenData) {
          res.render("resetPassword", { user_id: tokenData._id });
        } else {
          res.render("404");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    static reset_Password1 = async (req, res) => {
      try {
        const { password, user_id } = req.body;
        const newHashPassword = await bcrypt.hash(password, 10);
        await usermodel.findByIdAndUpdate(user_id, {
          password: newHashPassword,
          token: "",
        });
        req.flash("passwordChanged", "Reset Password Updated successfully ");
        res.redirect("/");
      } catch (error) {
        console.log(error);
      }
    };





}

module.exports = FrontController