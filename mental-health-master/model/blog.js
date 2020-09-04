const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String
    },
  author: {
type: String
},
views: {
type: Number,
default: 0
},
category: {
type: String
}
  },
);

const blog = mongoose.model("blog", blogSchema);
module.exports = blog;
