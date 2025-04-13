// models/User.js
const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Tablet", "Syrup", "Injection", "Capsule", "Ointment"],
    },
    dosageUnit: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    defaultInstructions: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
  
  // Add text index for search functionality
  MedicineSchema.index({ name: "text", description: "text" })
  
  module.exports = mongoose.model("Medicine", MedicineSchema)
  