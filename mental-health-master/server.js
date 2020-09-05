const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer")
const {MONGOURI} = require('./keys')
const blogModel = require('./model/blog.js');
const commentModel = require('./model/comment.js');
const doctorModel = require('./model/doctor.js');
const userpModel = require('./model/userp.js');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("Connected DATABASE")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
  secret: 'seCReT',
  cookie: { maxAge: 3600000 },
  saveUninitialized: false
}));

app.use(express.static('public'));
app.use(expressLayouts);
app.set("view engine", "ejs");


app.use('/userp', require('./routes/user.js'));
app.use('/doctor', require('./routes/doctor.js'));


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
		console.log(rem);
		blogModel.findOne({'title':rem},
  function(err,data)
  {
	  if(!err)
	  { 
		  blogModel.findOneAndUpdate({'title':rem},{'views':data.views+1},
  function(err,data)
  {
	  if(!err)
	  { 
	  
	  res.render('blog',{blog:data,msg:1});
	  }
	  else
	  {
		res.send(err);  
	  }})
  }
	  else
	  {
		res.send(err);  
	  }});
});


app.get('/doctor-available', async (req, res) => {
  const doctor = await doctorModel.find({});

  try {
    res.render('doctor-available',{doctor:doctor});
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/userp-blog:name",(req,res) => {
	var userpname = req.params.name;
		userpname = userpname.substring(1);
		
		const blog = blogModel.find({});

  try {
    res.render("userp-blog",{userp:userp,blog:blog,msg:0});
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/userp-blog:name/:title",(req,res) => {
	var userpname = req.params.name;
		userpname = userpname.substring(1);
		var blogtitle = req.params.title;
		blogtitle = blogtitle.substring(1);
		
		blogModel.findOne({'title':blogtitle},
  function(err,data)
  {
	  if(!err)
	  { 
		  blogModel.findOneAndUpdate({'title':blogtitle},{'views':data.views+1},
  function(err,data)
  {
	  if(!err)
	  { 
	  
	  res.render("userp-blog",{userp:userp,blog:data,msg:1});
	  }
	  else
	  {
		res.send(err);  
	  }})
  }
	  else
	  {
		res.send(err);  
	  }});
});


app.get('/home', (req, res) => {
  res.status(200);
  res.render("home");
});

app.get('*', (req, res) => {
  res.status(404);
  res.redirect("/home");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
