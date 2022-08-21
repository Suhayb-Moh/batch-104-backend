const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  plateNumber: {
    type: String,
    required: true,
    unique: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  modelYear: {
    type: Date,
    required: true,
  },
  carCategoryName: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  availablibiltyFlag: {
    type: Boolean,
    required: true,
    default: true,
  },
  image: {
    type: [String],
    required: true,
  },
});

const carModel = mongoose.model("Cars", carSchema);

module.exports = carModel;
