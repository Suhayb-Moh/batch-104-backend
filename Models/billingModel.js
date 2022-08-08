const mongoose = require("mongoose");

const billingSchema = mongoose.Schema({
  billDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  billStatus: {
    type: Boolean,
    default: false,
  },
  totalAmount: {
    type: Number,
  },
  booking,
});
