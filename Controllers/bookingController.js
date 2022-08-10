const Booking = require("../Models/bookingModel");

exports.createBooking = async (req, res) => {
  try {
    await Booking.create(req.body);
    return res.status(200).json({ message: "booked successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// get bookings

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    return res.status(200).json({ result: bookings.length, bookings });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
