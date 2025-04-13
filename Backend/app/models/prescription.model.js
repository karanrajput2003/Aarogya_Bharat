const mongoose = require("mongoose")

const PrescriptionSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: String,
    required: true,
    trim: true,
  },
  medicines: [
    {
      name: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
      instructions: {
        type: String,
        required: true,
      },
      duration: {
        type: String,
        required: true,
      },
      notes: {
        type: String,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Prescription", PrescriptionSchema)
