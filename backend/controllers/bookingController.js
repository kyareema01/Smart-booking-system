const bookingService = require('../services/bookingService');

exports.checkAvailability = async (req, res) => {
  try {
    const { start, duration } = req.body;
    const result = await bookingService.checkAvailability(start, duration);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.findNextSlot = async (req, res) => {
  try {
    const { start, duration } = req.body;
    const result = await bookingService.findNextSlot(start, duration);
    return res.json(result);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { customerName, start, duration } = req.body;
    await bookingService.createBooking(customerName, start, duration);
    return res.json({ message: "✅ Booking created" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await bookingService.getBookings();
    return res.json(bookings);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
