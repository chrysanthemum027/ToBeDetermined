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

<<<<<<< HEAD
const comment = mongoose.model("comment", commentSchema);
=======
const blog = mongoose.model("comment", commentSchema);
>>>>>>> 2ff27a3c8f8f77876eba7d2948ba4f536d6e73bf
module.exports = comment;
