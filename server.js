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



/**********Questionnaires************/
app.post('/q',function(req,res){
	console.log(req.body.avg);
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
	client.query('update msg set msg=$1 where student_id=$2',[req.body.msg,req.body.rollno],function(err,result){
		console.log("sent message " + req.body.msg + "to " + req.body.rollno);
	});
});




/******Student Login***************/
app.post("/l",function(req,res){
	client.query('select * from student where password=$1',[req.body.password],function(err,result){
		var data = result.rows[0];
		if(result.rows.length==0)
			res.render("failedlogin");
		else{
			if(req.body.student_id==data.student_id)
			{
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
	client.query('update student set mentor_id=$1 where student_id=$2',[req.body.mentor_id,req.body.student_id],function(req,result){
		res.redirect('/ml');
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

app.get("/ml",function(req,res){
    res.render("mentorLogin");
});
app.listen(3000,function(){
    console.log("Server started");
});
