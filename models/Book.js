const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 6,
    maxlength: 50,
    required: true
  },
  description: {
    type: String,
    min: 6,
    maxlength: 255,
    required: true
  },

  author: {
    type: String,
    min: 6,
    maxlength: 50,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Book", bookSchema);
