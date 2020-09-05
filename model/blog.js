const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
    },
  author: {
type: String,
required: true
},
views: {
type: Number,
default: 0
},
category: {
type: String,
required: true
}
  },
);

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;
