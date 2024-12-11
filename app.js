const express = require('express')
const connectDb=require("./database/connectDb")
const route= require("./routes/web")
// console.log(express)
const app = express()
const port = 3000  
 
// view ejs set
app.set("view engine","ejs") 
//css image link public 
app.use(express.static("public")) 
app.use(express.urlencoded({extended:false})) 
//route 
app.use('/',route)
 

//connecting to db
connectDb()


// console.log(app.get===express.Router().get) 
 







//server create
app.listen(port, () => {
  console.log(`server start localhsot:port ${port}`)
})