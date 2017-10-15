const pg = require('pg');
const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
//app.use(express.static(path.join("views")));
//app.engine('html', engines.mustache);
app.set("view engine","ejs");


var conn = 'postgres://postgres:123456@localhost:5432/wt';
var client = new pg.Client(conn);
if(client.connect()) console.log('Successfully Connected..');
else console.log('Connection Unsuccessful..');

function loginfailed(res)
{
	res.render("failedlogin");
}

function regsuccess(res)
{
	res.render("successfull_registration");
}

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
	regsuccess(res);
});

/******Student Login***************/
app.post("/l",function(req,res)
{
	login={
		'student_id':req.body.student_id,
		'password':req.body.password
	};
	console.log(login['student_id']+" "+login['password']);
	client.query('select name,password from student where student_id=$1',[login['student_id']],function(err,result)
	{
		if(result===undefined)
		{
			console.log(err);
-			loginfailed(res);
		}
		else
		{
			console.log(result.rows[0].password);
			if(login['password']==result.rows[0].password)
			{
				var username = result.rows[0].name;
    				res.render("website",{username:username});
			}
			else
				loginfailed(res);
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
	console.log(login['mentor_id']+" "+login['password']);
	client.query('select name,password from mentor where mentor_id=$1',[login['mentor_id']],function(err,result)
	{
		if(result===undefined)
		{
			console.log(err);
			loginfailed(res);
		}
		else
		{
			console.log(result.rows[0].password);
			if(login['password']==result.rows[0].password)
			{
				var username = result.rows[0].name;
    			res.render("mentor",{username:username});
			}
			else
				loginfailed(res);
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

app.listen(3000,function(){
    console.log("Server started");
});
