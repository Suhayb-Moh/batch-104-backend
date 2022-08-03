const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@fikrcamp-bootcamp.6orfet1.mongodb.net/car_rental_system`
  )
  .then(() => {
    console.log("DB Connected ✅");
  });
