const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
    },
    medicalDegrees: {
      type: String,
    },
    specializations: {
      type: String,
    },
    registrationNumber: {
      type: String,
      unique: true,
    },
    yearsOfExperience: {
      type: Number,
    },
    workHistory: {
      type: String,
    },
    specialSkills: {
      type: String,
    },
    governmentid: {
      type: String,
      default: "/placeholder.svg?height=128&width=128",
    },
    license: {
      type: String,
      default: "/placeholder.svg?height=128&width=128",
    },
    registrationCertificate: {
      type: String,
      default: "/placeholder.svg?height=128&width=128",
    },
    clinicName: {
      type: String,
    },
    clinicAddress: {
      type: String,
    },
    clinicContact: {
      type: String,
    },
    consultationTimings: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "/placeholder.svg?height=128&width=128",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
