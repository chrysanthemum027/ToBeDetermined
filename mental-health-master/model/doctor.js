const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: {
    type: String
    },
  email: {
type: String
},
password: {
type: String
},
degree: {
type: String
},
time: {
type: String
},
place: {
type: String
}
  },
);

const doctor = mongoose.model("doctor", doctorSchema);
module.exports = doctor;
