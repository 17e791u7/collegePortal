const express = require('express')
const route= require("./routes/web")
// console.log(express)
const app = express()
const port = 3000  
 
// view ejs set
app.set("view engine","ejs")

//route 

app.use('/',route) 


// console.log(app.get===express.Router().get) 
 







//server create
app.listen(port, () => {
  console.log(`server start localhsot:port ${port}`)
})