const express = require("express");
const carController = require("../Controllers/carController");
const router = express.Router();

router.route("/").post(carController.createCar).get(carController.getCars);

router
  .route("/:id")
  .put(carController.updateCar)
  .get(carController.getCar)
  .delete(carController.deleteCar);

module.exports = router;
