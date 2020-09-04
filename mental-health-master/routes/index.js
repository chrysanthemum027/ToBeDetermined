const express = require('express');
const blogModel = require('../models/blog.js');
const commentModel = require('../models/comment.js');
const doctorModel = require('../models/doctor.js');
const nodemailer = require("nodemailer");
const app = express();


app.get('/blog', async (req, res) => {
  const blog = await blogModel.find({});

  try {
    res.render('blog',{blog:blog});
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/blog/:title', (req, res) => {
	
		var rem = req.params.title;
		rem = rem.substring(1);
		blogModel.findOne({'title':rem},
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
