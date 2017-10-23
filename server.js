const pg = require('pg');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

//TO stop forward button to access website further
app.use(function(req, res, next) {
	res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');
	next();
});

var conn = 'postgres://postgres:123456@localhost:5432/wt';
var client = new pg.Client(conn);
if(client.connect()) console.log('Successfully Connected..');
else console.log('Connection Unsuccessful..');

app.post('/q',function(req,res){
	console.log(req.body.avg);
});
app.get('/instructionaffectiveness',function(req,res){
	res.render("instructionaffectiveness");
});
app.get('/campusservice',function(req,res){
	res.render("campusservice");
});
app.get("/ment",function(req,res){
	res.render("ment");
});
/*****Signup*************/
app.post("/s",function(req,res)
{
	s = {
		'student_id':req.body.student_id,
		'name':req.body.name,
		'email':req.body.email,
		'branch':req.body.branch,
		'rollno':req.body.rollno,
		'password':req.body.password
	};
	client.query({
		text:'insert into student (student_id,name,email,branch,rollno,password) values ($1,$2,$3,$4,$5,$6)',
		values:[s['student_id'],s['name'],s['email'],s['branch'],s['rollno'],s['password']]
	});
	console.log(s['student_id']+" "+s['name']+" "+s['email']+" "+s['branch']+" "+s['rollno']+" "+s['password']);
	res.render("successfull_registration");
});
/******Student Login***************/
app.post("/l",function(req,res)
{
	var username="Bhanu Nadar";
	var email="bhanu.nadar@gmail.com";
	var rollno="7653";
	var branch="comps";
	var contact="7208755685";
	res.render("website",{username:username,email:email,rollno:rollno,branch:branch,contact:contact});
	login={
		'student_id':req.body.student_id,
		'password':req.body.password
	};
	client.query('select name,student_id from student where password=$1',[login['password']],function(err,result)
	{
		console.log(result.rows[0].name + " " + result.rows[0].student_id);
		if(result.length==0)
		{
			console.log(err);
-			res.render("failedlogin");
		}
		else
		{
			console.log(result.rows[0].name + " " + result.rows[0].student_id);
			if(login['student_id']==result.rows[0].student_id)
			{
				var username = result.rows[0].name;
    			res.render("website",{username:username});
			}
			else
				res.render("failedlogin");
		}
	});
});

/********mentor login**********/
app.post("/lmen",function(req,res)
{
	
	login={
		'mentor_id':req.body.mentor_id,
		'password':req.body.password
	};
	client.query('select name,mentor_id from mentor where mentor_id=$1',[login['password']],function(err,result)
	{
		console.log(result.rows[0].name + " " + result.rows[0].mentor_id);
		if(result.length==0)
		{
			console.log(err);
			res.render("failedlogin");
		}
		else
		{
			console.log(result.rows[0].name + " " + result.rows[0].mentor_id);
			if(login['mentor_id']==result.rows[0].mentor_id)
			{
				var username = result.rows[0].name;
    			res.render("mentor",{username:username});
			}
			else
				res.render("failedlogin");		
		}
	});
});

/***html**********/
app.get("/",function(req,res){
    res.render("index")
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.get("/forgot",function(req,res){
    res.render("forgot");
});

app.get("/mentorLogin",function(req,res){
    res.render("mentorLogin");
});
app.get("/mP",function(req,res){
	res.render("mentorProfile");
});
app.listen(3000,function(){
    console.log("Server started");
});
