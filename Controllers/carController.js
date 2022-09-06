const Car = require("../Models/carModel");

exports.createCar = async (req, res) => {
  const myFiles = [];
  req.files.map((file) => {
    console.log(file.filename);
    myFiles.push(file.filename);
  });
  try {
    req.body.image = myFiles;
    await Car.create(req.body);
    return res.status(200).json({ message: "Car added successfully" });
  } catch (error) {
    return res.status(404).send({
      message: `Sorry something went wrong. Please try again ${error.message}`,
    });
  }
};

// get cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find()
      .populate({
        path: "carCategoryName",
        select: "categoryName",
      })
      .populate({
        path: "carCategoryPrice",
        select: "costPerDay",
      });

    return res.status(200).json({ result: cars.length, cars });
  } catch (error) {
    return res.status(500).json({
      error: `Sorry something went wrong please try again ${error.message}`,
    });
  }
};

// get single car

exports.getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id)
      .populate({
        path: "carCategoryName",
        select: "categoryName",
      })
      .populate({
        path: "carCategoryPrice",
        select: "costPerDay",
      });
    return res.status(200).json({ result: car });
  } catch (error) {
    return res.status(500).json({
      error: `Sorry something went wrong. please try again later ${error.message}`,
    });
  }
};

// get cars by id

exports.getCarsById = async (req, res) => {
  try {
    const cars = await Car.find({ carCategoryName: req.params.id });
    return res.status(200).json({ cars });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// delete car

exports.deleteCar = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      error: `Sorry something went wrong. please try again later ${error.message}`,
    });
  }
};

// update car record

exports.updateCar = async (req, res) => {
  try {
    await Car.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Record Updated" });
  } catch (error) {
    return res.status(500).send({
      error: `Sorry something went wrong. please try again later ${error.message}`,
    });
  }
};
