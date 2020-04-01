const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 6,
    maxlength: 20,
    required: true
  },
  email: {
    type: String,
    min: 6,
    maxlength: 50,
    required: true
  },
  password: {
    type: String,
    min: 6,
    maxlength: 100,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
