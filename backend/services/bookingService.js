const appointmentRepo = require('../repo/appointmentRepo');

const CLOSING_TIME = new Date("2026-03-07T17:00:00").getTime();
const OPENING_TIME = new Date("2026-03-07T09:00:00").getTime();

exports.checkAvailability = async (start, duration) => {
  const end = start + duration * 60000;

  if (start < OPENING_TIME || end > CLOSING_TIME) {
    return { available: false, message: "Outside working hours" };
  }

  const overlaps = await appointmentRepo.findOverlapping(start, end);
  
  if (overlaps.length > 0) {
    return { available: false };
  }

  return { available: true };
};

exports.findNextSlot = async (start, duration) => {
  const appointments = await appointmentRepo.getAllSorted();
  const durationMs = duration * 60000;
  let current = Math.max(start, OPENING_TIME);

  for (let appt of appointments) {
    let reqEnd = current + durationMs;

    if (reqEnd <= appt.start_time) {
      return { available: false, nextAvailable: current };
    }

    if (current < appt.end_time && reqEnd > appt.start_time) {
      current = appt.end_time;
    }
  }

  if (current + durationMs <= CLOSING_TIME) {
    return { available: false, nextAvailable: current };
  }

  return { available: false, message: "No slots available today" };
};

exports.createBooking = async (customerName, start, duration) => {
  const end = start + duration * 60000;
  return await appointmentRepo.create(customerName, start, end);
};

exports.getBookings = async () => {
  return await appointmentRepo.getAllSorted();
};
