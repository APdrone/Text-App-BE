const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, "word field is required"],
    unique: true,
  },
});

const word = mongoose.model("word", wordSchema);

module.exports = word;
