const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const expressLayouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer")
const {MONGOURI} = require('./keys')

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


<<<<<<< HEAD
//app.use('/user', require('./routes/user.js'));
app.use('/doctor', require('./routes/doctor.js'));
=======

//app.use('/', require('./routes/app.js'));
>>>>>>> 2ff27a3c8f8f77876eba7d2948ba4f536d6e73bf


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
