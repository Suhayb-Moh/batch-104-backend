const express = require("express");
const categoryRoutes = require("./Routes/categoryRoutes");
require("dotenv").config({ path: "./.env" });
require("./server");
const port = process.env.PORT || 8000;
const app = express();
app.use(express.json());

// app.use("/user", userRoutes);
// app.use("/customers", customersRoutes);
// app.use("/car", carRoutes);
// app.use("/bookings", bookingRoutes);
app.use("/categories", categoryRoutes);
// app.use("billing", billingRoutes);

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
