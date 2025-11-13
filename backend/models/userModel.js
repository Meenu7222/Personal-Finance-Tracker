const pool = require('../config/db');

// Find a user by username
const findUserByUsername = async (username) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0]; // undefined if no match
  } catch (err) {
    console.error('Error finding user:', err);
    throw err;
  }
};

// Create a new user with timestamp
const createUser = async (username, password_hash) => {
  try {
    const result = await pool.query(
      `INSERT INTO users (username, password_hash, created_at)
       VALUES ($1, $2, NOW())
       RETURNING user_id, username, created_at`,
      [username, password_hash]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Error creating user:', err);
    throw err;
  }
};

module.exports = { findUserByUsername, createUser };
