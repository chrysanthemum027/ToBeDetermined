const express = require('express');
const blogModel = require('../model/blog.js');
const commentModel = require('../model/comment.js');
const doctorModel = require('../model/doctor.js');
const nodemailer = require("nodemailer");
const app = express();



