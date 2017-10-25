const pg = require('pg');
const express = require('express');
const bodyParser = require("body-parser");
const nodeMailer = require("nodemailer");
const path = require('path');
const sqlString = require('sqlstring');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

var conn = 'postgres://postgres:123456@localhost:5432/wt';
var client = new pg.Client(conn);
if(client.connect()) console.log('Successfully Connected..');
else console.log('Connection Unsuccessful..');

/*****************Recover Password***************/
app.post('/rp',function(req,ress){
	console.log('in rp');
	client.query('select email from student where student_id=$1',[req.body.student_id],function(err,result){
		console.log('in select query');
		if(err) console.log(err);
		else if (result.rows.length==0){
			console.log("No such user");
			res.redirect('/');
		}
		else{
			var data = result.rows[0].email;
			var pw = Math.floor((Math.random()*9800)+1000);
			var smtpTransport = nodeMailer.createTransport({
			host: 'smtp.gmail.com',
			port: 587,
			secure: false,
			requireTLS: true,
				auth: {
					user : 'redballonrock@gmail.com',
					pass : 'Bhanu@123'			        
				}
			});
			var mail = {
				from : "redballonrock@gmail.com",
				to : data,
				subject : "Reset Password",
				text : "Your new password is " + pw
			};
			smtpTransport.sendMail(mail,function(err,res){
				if(err)
					console.log(err);
				else
				{
					client.query('update student set password=$1 where student_id=$2',[pw,req.body.student_id],function(err,result){
						console.log("password updated");
						console.log("message sent");
						ress.redirect('/');
					});
				}
				smtpTransport.close();
			});
		}
	});
});


/**********Questionnaires************/
var student_id=0;
app.post('/ia',function(req,res){
	console.log(student_id);
	client.query('update rating set iarating=$1 where student_id=$2',[req.body.avg,student_id],function(err,result){});
});
app.post('/cs',function(req,res){
	console.log(student_id);
	client.query('update rating set csrating=$1 where student_id=$2',[req.body.avg,student_id],function(err,result){});
});
app.get('/instructionaffectiveness',function(req,res){
	res.render("instructionaffectiveness");
});
app.get('/campusservice',function(req,res){
	res.render("campusservice");
});

/*****Signup*************/
app.post("/s",function(req,res){
	s = {
		'student_id':req.body.student_id,
		'name':req.body.name,
		'email':req.body.email,
		'branch':req.body.branch,
		'rollno':req.body.rollno,
		'contact':req.body.contact,
		'password':req.body.password
	};
	client.query({
		text:'insert into student (student_id,name,email,branch,rollno,contact,password) values ($1,$2,$3,$4,$5,$6,$7)',
		values:[s['student_id'],s['name'],s['email'],s['branch'],s['rollno'],s['contact'],s['password']]
	});
	console.log(s['student_id']+" "+s['name']+" "+s['email']+" "+s['branch']+" "+s['rollno']+" "+s['contact']+" "+s['password']);
	res.render("successfull_registration");
});

/********Send And Receive Messages*************/
app.post('/sm',function(req,res){
	client.query('update msg set msg=$1 where student_id=$2',[req.body.msg,req.body.student_id],function(err,result){
		console.log("sent message " + req.body.msg + "to " + req.body.student_id);
	});
});

/******Student Login***************/
app.post("/l",function(req,res){
	client.query('select * from student where password=$1',[req.body.password],function(err,result){
		var data = result.rows[0];

		if(result.rows.length==0)
			res.render("failedlogin");
		else{
			if(req.body.student_id==data.student_id){	
				student_id=data.student_id;
				client.query('select msg from msg where student_id=$1',[req.body.student_id],function(err,result){
					res.render("website",{data:data,msg:result.rows[0].msg});
				});
			}
			else
				res.render("failedlogin");
		}
	});
});

/********mentor login**********/
app.post("/lmen",function(req,res){
	client.query('select * from mentor where password=$1',[req.body.password],function(err,result){
		var data = result.rows[0];
		if(result.rows.length==0)
			res.render("failedlogin");
		else{
			if(req.body.mentor_id==data.mentor_id){
				client.query('select student_id from student where mentor_id is null',function(err1,result1){
					client.query('select student_id from student where mentor_id=$1',[req.body.mentor_id],function(err2,result2){
						res.render("mentor",{data:data,result1:result1,result2:result2});
					});
				});
			}
			else
				res.render("failedlogin");
		}
	});
});

/****************Add Mentee****************/
app.post('/am',function(req,res){
	console.log(req.body.mentor_id,req.body.student_id);
	client.query('update student set mentor_id=$1 where student_id=$2',[req.body.mentor_id,req.body.student_id],function(err,result){});
});

/***html**********/
app.post("/edit",function(req,res){
	res.render("editProfile",{data:req.body.data});
});
app.get("/",function(req,res){
    res.render("index")
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.get("/forgot",function(req,res){
    res.render("forgot");
});

app.get("/ml",function(req,res){
    res.render("mentorLogin");
});
app.listen(3000,function(){
    console.log("Server started");
});
