const express = require('express');
const router = express.Router();

const {
  checkAvailability,
  createBooking,
  getBookings
} = require('../controllers/bookingController');

router.post('/check', checkAvailability);
router.post('/create', createBooking);
router.get('/', getBookings);

module.exports = router;