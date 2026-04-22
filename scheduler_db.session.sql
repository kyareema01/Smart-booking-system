CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_name VARCHAR(100),
  start_time BIGINT,
  end_time BIGINT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
