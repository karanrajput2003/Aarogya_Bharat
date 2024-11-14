const mongoose = require("mongoose");

const Slots = new mongoose.Schema({
  doctorId: String,
  date: String,
  times: [
    {
      time: String,
      userId: {
        type: String,
        default: null,
      },
      amount: {
        type: Number,
        default: null,
      },
      status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING",
      },
      merchantTransactionId: {
        type: String,
        default: null,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      isBooked: Boolean,
    },
  ],
});

module.exports = mongoose.model("SlotsBooking", Slots);
