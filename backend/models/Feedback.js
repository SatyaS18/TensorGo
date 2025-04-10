const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  category: String,
  rating: Number,
  comment: String,
  user: {
    name: String,
    email: String,
    picture: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
