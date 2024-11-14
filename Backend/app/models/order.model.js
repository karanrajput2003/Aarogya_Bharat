const mongoose = require("mongoose");

const Oders = new mongoose.Schema({
    doctorId: {
        type: String,
      },
    time: String,
    userId: {
      type: String,
    },
    amount: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },
    merchantTransactionId: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    isBooked: Boolean,
});

module.exports = mongoose.model("OdersBooking", Oders);
