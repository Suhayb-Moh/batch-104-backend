const mongoose = require("mongoose");

const createRandomNumbers = () => {
  let randomString = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 5; i++) {
    randomString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return randomString;
};

const bookingSchema = mongoose.Schema({
  bookingID: {
    type: String,
    default: createRandomNumbers,
  },
  fromDateTime: {
    type: Date,
    required: true,
  },
  //   returnDateTime: {
  //     type: String,
  //     required: true,
  //   },
  Amount: {
    type: mongoose.Types.ObjectId,
  },
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  plateNumber: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});

const bookingModel = mongoose.model("Booking", bookingSchema);
module.exports = bookingModel;
