
const express = require('express')
const bodyParser=require("body-parser")
const app = express()
const https=require('https')
const { json } = require('express')
const { request } = require('http')
const port = 3000
const apikey="5caf98a76739b09f828e97907438dcc9-us8"

const audianceid="cbc3679406"
app.use(bodyParser.urlencoded({extended:true}));


  
 
app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

//obliger post 
app.post("/",function(req,res){
  
    var n=req.body.nom
    var p=req.body.prenom
    var m=req.body.email
    
if ( n != '') {
  res.redirect("/marche")  
   
  
   var x={
    momber:[{
      email_address:m,
      status:"subscribed",
      merge_fields:{
        FNAME:n,
        LNAME:p
      }
       

    }]
      
   }

  const str=JSON.stringify(x)
  const url=  "https://us8.api.mailchimp.com/3.0/lists/"+audianceid;

  const option={
    method:"POST",
    auth:"sisali:"+apikey
      
  }
  const request =https.request(url,option,function (response){
    response.on("data",function(data){

      console.log(JSON.parse(data))
    })
    request.write(str);   
    request.end();
  })
    


} else {
  res.send("pas sessie le nom")
  res.redirect("/marchepas") 
}
   
 
       
}) 

app.get("/marche",function (req,res){
  res.send("bien good job")

})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
}) 