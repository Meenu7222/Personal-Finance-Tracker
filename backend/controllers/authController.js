const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { createUser, findUserByUsername } = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, hashedPassword);

    res.status(201).json({
      message: 'User registered successfully',
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Use user.user_id instead of user.userid
    const token = jwt.sign(
      { id: user.user_id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    //res.json({ token });
    res.json({
    token,
    message: "Login successful"
});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };
