const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentSchema = new Schema(
  {
    order: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
