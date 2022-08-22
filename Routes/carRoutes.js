const express = require("express");
const multer = require("multer");
const carController = require("../Controllers/carController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/Images");
  },
  // filename: function (req, files, cb) {
  //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  //   let extension = files.mimetype.split("/")[1];
  //   cb(null, files.fieldname + "-" + uniqueSuffix + "." + extension);
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage }).array("images", 5);
router
  .route("/")
  .post(upload, carController.createCar)
  .get(carController.getCars);

router
  .route("/:id")
  .put(carController.updateCar)
  .get(carController.getCar)
  .delete(carController.deleteCar);

module.exports = router;
