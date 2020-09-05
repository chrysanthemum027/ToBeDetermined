const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
content: {
    type: String
    },
author: {
type: String
},
blogtitle: {
type: String
}
  },
);


const comment = mongoose.model("comment", commentSchema);
const blog = mongoose.model("comment", commentSchema);
module.exports = comment;
