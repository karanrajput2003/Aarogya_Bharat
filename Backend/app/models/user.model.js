// models/User.js
const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    aadhar_no: String,
    address: String,
    password: String,
    phoneno: String, // Add this for phone number
    profilePicture: String, // Add this for profile picture
    feedback: String, // Add this for feedback
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;
