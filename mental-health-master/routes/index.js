const express = require('express');
const blogModel = require('../model/blog.js');
const commentModel = require('../model/comment.js');
const doctorModel = require('../model/doctor.js');
const nodemailer = require("nodemailer");
const app = express();


app.get('/blog', async (req, res) => {
  const blog = await blogModel.find({});

  try {
    res.render('blog',{blog:blog,msg:0});
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/blog/:title', (req, res) => {
	
		var rem = req.params.title;
		rem = rem.substring(1);
		blogModel.findOne({'title':rem,msg:1},
  function(err,data)
  {
	  if(!err)
	  { 
	  res.render('blog',{blog:data});
	  }
	  else
	  {
		res.send(err);  
	  }});
});
