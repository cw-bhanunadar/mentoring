var express =require("express");
var app=express();
var body=require("body-parser");
app.use(body.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("index")
});
app.get("/signup",function(req,res){
    res.render("signup");
});
app.post("/website",function(req,res){
    var username=req.body.username;
    res.render("website",{username:username});
});
app.listen(3000,function(){
    console.log("Server started");
});