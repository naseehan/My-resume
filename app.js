const express = require("express");
const { request } = require("http");
const app = express();
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(express.urlencoded({extended: true}));

// tO apply css and get images from a static website
app.use(express.static("public"));



app.get("/", function(req, res){
res.sendFile(__dirname+"/signup.html")
})

// for server to pick it out in this route
app.post("/", function(req, res){
    const first = req.body.firstName;
    const last = req.body.lastName;
    const email = req.body.email;
  

    const data = {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: first,
                    LNAME: last
                }
    };

  

    const jsonData = JSON.stringify(data);

    const url = "https://us11.api.mailchimp.com/3.0/lists/c81533532f/members"

    const options = {
        method: "POST",
        auth: "naseehan:2eb3190646eb8550f620c0324fe202ee-us11"
    }

    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();

 

});


app.post("/failure", function(req, res){
    res.redirect("/");
})


// 2eb3190646eb8550f620c0324fe202ee-us11
// c81533532f.

app.listen(process.env.PORT || 3000, function(){
    console.log("server starterd at 3000");
})