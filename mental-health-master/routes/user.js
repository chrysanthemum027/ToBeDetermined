const express = require('express');
const blogModel = require('../model/blog.js');
const commentModel = require('../model/comment.js');
const doctorModel = require('../model/doctor.js');
const userpModel = require('../model/userp.js');
const nodemailer = require("nodemailer");
;const {GMAIL_PASS} = require('../keys')
const converter = require('json-2-csv');
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

let userp

app.post("/userp-code",(req,res) => {
		const userp = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password
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
    res.render("userp-register",{
        name : userp.name,
        email: userp.email,
        password: userp.password
      });
    
})

app.post("/userp-register",(req,res) => {
	const { name, code} = req.body;
	if(code == '123'+name+'*&%'){
			const user = {
		"name": req.body.name,
		"email": req.body.email,
		"password": req.body.password
	}
	
	const new_userp = new userpModel(user);

  try {
    new_userp.save();
    console.log("saved");
const userp = userpModel.find({});

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
	console.log("error!!!!!!!");
	res.status(500);
	res.redirect("/error");
}
	
})


app.get("/userp-code",(req,res) => {
	res.render("userp-code");
});

app.post("/userp-login",(req,res) => {
console.log(req.body.name);
userpModel.findOne({'email':req.body.email},
  function(err,data)
  {
	  if(!err)
	  { 
	     if(data.password == req.body.password)
	     {
			 const userp = {
		"name": data.name,
		"email": req.body.email,
		"password": req.body.password
    };
    req.session.user = userp;
			 res.status(200);
			 console.log(userp);
             res.render("userp-dashboard",{userp:userp})
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

app.get("/logout",(req,res) => {
	res.redirect("/home");
});


module.exports = app;
