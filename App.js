const express = require("express");
const categoryRoutes = require("./Routes/categoryRoutes");
const userRoutes = require("./Routes/userRoutes");
const carRoutes = require("./Routes/carRoutes");
const bookingRoutes = require("./Routes/bookingroutes");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });
require("./server");
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());
app.use(express.static("Images"));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", userRoutes);
// app.use("/customers", customersRoutes);
app.use("/car", carRoutes);
app.use("/bookings", bookingRoutes);
app.use("/categories", categoryRoutes);
// app.use("billing", billingRoutes);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
