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
      user: 'talkitouteduthon@gmail.com',
      pass: GMAIL_PASS
  },
      tls: {
          rejectUnauthorized: false
      }
});
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});

let doctor

app.post("/doctor-code",(req,res) => {
	
		const doc = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password,
		"degree": req.body.degree,
		"place": req.body.place,
		"time": req.body.time
	}
	var email = req.body.email;
	const mailOptions = {
      from: 'talkitouteduthon@gmail.com',
      to: req.body.email,
      subject: 'Welcome to TalkItOut',
      text: 'Welcome to TalkItOut. Your Code to Complete the Registration Process is - 123'+req.body.name+'*&%'
    };
    
    transporter.sendMail(mailOptions, function(err, data) { 
    if(err) { 
        console.log('Error Occurs'); 
    } else { 
        console.log('Email sent successfully'); 
    } 
}); 
    
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


app.get("/doctor-code",(req,res) => {
	res.render("doctor-code");
});

app.post("/doctor-login",(req,res) => {

doctorModel.findOne({'email':req.body.email},
  function(err,data)
  {
	  if(!err)
	  { 
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
             res.render("doctor-dashboard",{doctor:data})
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

app.post('/doctor/doctor-dashboard/add-blog', async (req,res) => {

    const data2 = {
        "title": req.body.title,
        "content": req.body.content,
        "author": req.body.author,
        "category": req.body.category,
    };
  const new_blog = new blogModel(data2);

  try {
     new_blog.save();
const blog =  blogModel.find({});

  try {
    res.status(200);
    res.render("add")
  } catch (err) {
    res.status(500).send(err);
  }
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;
