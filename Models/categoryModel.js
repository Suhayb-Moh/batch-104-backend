const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  numOfPeople: {
    type: Number,
    reuqired: true,
  },
  costPerDay: {
    type: Number,
    required: true,
  },
  lateFeePerHour: {
    type: String,
    required: true,
  },
});

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
