var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var fs=require('fs');
const FACEBOOK_ACCESS_TOKEN = 'EAAJkAkJdjuEBAN1QnMexzDGBXXs56XV0E1uiSmBNgELZBl4vZCgphZBYlnU6ptT6iVxCQaP4NrNpbus9HKAPNUyYZAHhSfx73es0uuQLMNjoqi63ZCaLUeiT7MywFuEGfgGcPCTS0ZACabECflZBzSYdtZA6utOV7rSlP1PLa1xdahce9R8VkZAHA';
const fburl='https://graph.facebook.com/v2.6/';
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) {
fs.writeFileSync("./data.json",JSON.stringify(req.body),'utf8');
var sender_id=req.body.originalRequest.data.sender.id;
var rec_id=req.body.originalRequest.data.recipient.id;

    if (req.body.result.action == "input.welcome") {
        if (req.body.result.resolvedQuery == "hi") {
         let body=fs.readFile(fburl+sender_id+"?access_token="+FACEBOOK_ACCESS_TOKEN, "utf8",function(err,data){
          let bodys=JSON.parse(data);
          return res.json({
                speech:"Welcome, "+bodys.first_name+" "+bodys.last_name,
                displayText: "Welcome, "+bodys.first_name+" "+bodys.last_name,
                source: 'agent'
            });
         });
       
            
        }

    }
});

app.get("/getdata/",function(req, res){
   fs.readFile("./data.json",'utf-8',function(err,data){
      res.json(data);
   });
   
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
})
