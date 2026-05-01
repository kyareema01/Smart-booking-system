const express = require('express');
const router = express.Router();

const {
  checkAvailability,
  findNextSlot,
  createBooking,
  getBookings
} = require('../controllers/bookingController');

router.post('/check', checkAvailability);
router.post('/next-slot', findNextSlot);
router.post('/create', createBooking);
router.get('/', getBookings);

module.exports = router;