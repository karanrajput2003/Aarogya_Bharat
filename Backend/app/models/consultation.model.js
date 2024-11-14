const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the virtual consultation booking
const virtualConsultationSchema = new Schema(
  {
    patient: {
      userId : {
        type : String
      },
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      medicalHistory: {
        type: String,
        default: "",
      },
      symptoms: {
        type: String,
        required: true,
      },
      insuranceDetails: {
        provider: {
          type: String,
          default: "",
        },
        policyNumber: {
          type: String,
          default: "",
        },
      },
    },
    consultationDetails: {
      preferredDate: {
        type: Date,
        required: true,
      },
      preferredTime: {
        type: String,
        required: true, // format: HH:mm A
      },
      doctorid: {
        type: String,
        default: "",
      },
    },
    consentToConsultation: {
      type: Boolean,
      required: true,
    },
    additionalNotes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
      default: "Scheduled",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create and export the model
const VirtualConsultationBooking = mongoose.model(
  "VirtualConsultationBooking",
  virtualConsultationSchema
);

module.exports = VirtualConsultationBooking;
