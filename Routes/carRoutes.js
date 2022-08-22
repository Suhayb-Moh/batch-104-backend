const express = require("express");
const multer = require("multer");
const carController = require("../Controllers/carController");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let extension = file.mimetype.split("/")[1];
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});

const upload = multer({ storage: storage });
router
  .route("/")
  .post(upload.single("image"), carController.createCar)
  .get(carController.getCars);

router
  .route("/:id")
  .put(carController.updateCar)
  .get(carController.getCar)
  .delete(carController.deleteCar);

module.exports = router;
