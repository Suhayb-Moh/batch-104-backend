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
    ref: "Category",
  },
  carCategoryPrice: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
  },
  availablibiltyFlag: {
    type: Boolean,
    required: true,
    default: true,
  },
  rating: {
    type: Number,
    default: 3,
  },
  image: {
    type: [String],
    required: true,
  },
});

const carModel = mongoose.model("Cars", carSchema);

module.exports = carModel;
