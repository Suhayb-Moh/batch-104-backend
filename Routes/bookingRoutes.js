const express = require("express");
const bookingController = require("../Controllers/bookingController");
const router = express.Router();

router
  .route("/")
  .post(bookingController.createBooking)
  .get(bookingController.getBookings);

module.exports = router;
