const db = require('../db');

exports.getAllSorted = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM appointments ORDER BY start_time", (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.findOverlapping = (start, end) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT * FROM appointments
      WHERE NOT (end_time <= ? OR start_time >= ?)
    `;
    db.query(query, [start, end], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.create = (customerName, start, end) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO appointments (customer_name, start_time, end_time)
      VALUES (?, ?, ?)
    `;
    db.query(query, [customerName, start, end], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
