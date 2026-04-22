const db = require('../db');

const CLOSING_TIME = new Date("2026-03-07T17:00:00").getTime();
const OPENING_TIME = new Date("2026-03-07T09:00:00").getTime();

// 🔍 Check availability
exports.checkAvailability = (req, res) => {
  const { start, duration } = req.body;

  const end = start + duration * 60000;

  if (start < OPENING_TIME || end > CLOSING_TIME) {
    return res.json({ available: false, message: "Outside working hours" });
  }

  const query = `
    SELECT * FROM appointments
    WHERE NOT (end_time <= ? OR start_time >= ?)
  `;

  db.query(query, [start, end], (err, results) => {
    if (err) return res.status(500).json(err);

    if (results.length > 0) {
      return res.json({ available: false });
    }

    return res.json({ available: true });
  });
};

// 📅 Create booking
exports.createBooking = (req, res) => {
  const { customerName, start, duration } = req.body;
  const end = start + duration * 60000;

  const query = `
    INSERT INTO appointments (customer_name, start_time, end_time)
    VALUES (?, ?, ?)
  `;

  db.query(query, [customerName, start, end], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "✅ Booking created" });
  });
};

// 📖 Get all bookings
exports.getBookings = (req, res) => {
  db.query("SELECT * FROM appointments ORDER BY start_time", (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};