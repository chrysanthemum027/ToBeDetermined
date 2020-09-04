const express = require('express');
const blogModel = require('../model/blog.js');
const commentModel = require('../model/comment.js');
const doctorModel = require('../model/doctor.js');
const nodemailer = require("nodemailer");
const {GMAIL_PASS} = require('../keys')
const app = express();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'talkitouteduthon',
      pass: GMAIL_PASS
  }
});

let doctor


app.get("/doctor-code",(req,res) => {
	res.render("doctor-code");
});
app.post("/doctor-code",(req,res) => {
	
		const doc = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password,
		"degree": req.body.degree,
		"place": req.body.place,
		"time": req.body.time
	}
	
	const mailOptions = {
      from: 'talkitouteduthon@gmail.com',
      to: doc.email,
      subject: 'Welcome to TalkItOut',
      text: 'Welcome to TalkItOut. Your Code to Complete the Registration Process is - 123'+doc.name+'*&%'
    };
    
    res.status(200);
    res.render("doctor-register",{
        name : doc.name,
        email: doc.email,
        password: doc.password,
        degree: doc.degree,
        place: doc.place,
        time: doc.time
      });
    
})

app.post("/doctor-register",(req,res) => {
	const { name, code} = req.body;
	if(code == '123'+name+'*&%'){
			const doc = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password,
		"degree": req.body.degree,
		"place": req.body.place,
		"time": req.body.time
	}
	
	const new_doctor = new doctorModel(doc);

  try {
    new_doctor.save();
const doctor = doctorModel.find({});

  try {
    res.status(200);
    res.redirect("home")
  } catch (err) {
    res.status(500).send(err);
  }
  } catch (err) {
    res.status(500).send(err);
  }
}
else
{
	res.status(500);
	res.redirect("/error");
}
	
})


app.get("/doctor-login",(req,res) => {
	res.render("doctor-login");
});

app.post("/doctor-login",(req,res) => {


doctorModel.findOne({'email':req.body.email},
  function(err,data)
  {
	  if(!err)
	  { 
		  console.log(data.password);
		  console.log(req.body.password);
	     if(data.password == req.body.password)
	     {
			 const doctor = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password,
		"degree": req.body.degree,
		"place": req.body.place,
		"time": req.body.time
    };
    req.session.user = doctor;
			 res.status(200);
             res.render("doctor-dashboard",{doctor:req.session.user})
		 }
		 else
		 {
		  res.status(500);
	      res.redirect("/error");
		 }
	  }
	  else
	  {
		res.send(err);  
	  }});

	
}
)



module.exports = app;
