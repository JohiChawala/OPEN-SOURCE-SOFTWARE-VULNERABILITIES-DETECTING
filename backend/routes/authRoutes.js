const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register a new user
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  console.log('Register request received:', { name, email, password }); // Debugging

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email); // Debugging
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('User registered successfully:', user); // Debugging
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Error in register:', err); // Debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Login request received:', { email, password }); // Debugging

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email); // Debugging
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch for user:', email); // Debugging
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log('Login successful for user:', user); // Debugging
    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (err) {
    console.error('Error in login:', err); // Debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;