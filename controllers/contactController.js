const contactModel = require("../models/Contact")


class contactController {
    static contactInfo = async (req,res)=>{
        try {  
            
             const{id}=req.udata
  
             const{firstName,lastName,Username,email,address1,address2,country,state,checkbox}=req.body
  
             if(checkbox=="on")
            {const data= await contactModel.create({user_id:id,firstName,lastName,Username,email,address1,address2,country,state})
              console.log(data) 
              req.flash('success',"your info is saved successfully......")
            
            }
            else
              req.flash("checkbox","please check the checkbox to save the info for the future......")

              res.redirect("/contact")
            
        }
        catch(error){
          console.log(error)
        }
      } 


      static async  viewContact(req,res)
     {
      try{ 
              const{name,image}=req.udata 
              const id=req.params.Id  
              const contact=await contactModel.findById(id)
              console.log(contact)
              res.render("admin/contact/viewContact",{c:contact,n:name,i:image})

         }
         catch(error){
            console.log(error)
         }

    }

    static async  editContact(req,res)
     {
      try{ 
              const{name,image}=req.udata 
              const id=req.params.Id  
              const contact=await contactModel.findById(id)
              console.log(contact)
              res.render("admin/contact/editContact",{c:contact,n:name,i:image})

         }
         catch(error){
            console.log(error)
         }
}

static async  contactUpdate(req,res)
     {
      try{ 
              
              const id=req.params.Id
              const {firstName,lastName,Username,email,address1,address2,country,state}=req.body

              await contactModel.findByIdAndUpdate(id,{firstName,lastName,Username,email,address1,address2,country,state})
              
            req.flash("success","Course Updated Successfully")
            res.redirect("/admin/contactDisplay")

         }
         catch(error){
            console.log(error)
         }
}



    static async  deleteContact(req,res)
     {
      try{ 
              
              const id=req.params.Id  
              const contact=await contactModel.findByIdAndDelete(id)
              
              res.redirect("admin/contactDisplay")

         }
         catch(error){
            console.log(error)
         }

 } 





} 

module.exports=contactController