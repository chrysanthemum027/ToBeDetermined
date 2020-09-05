const mongoose = require('mongoose');

const userpSchema = new mongoose.Schema({
  name: {
    type: String
    },
  email: {
type: String
},
password: {
type: String
}
  },
);

const userp = mongoose.model("userp", userpSchema);
module.exports = userp;
