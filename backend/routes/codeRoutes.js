const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Code = require('../models/Code');

// Save code and result
router.post('/save', async (req, res) => {
  const { userId, code, result } = req.body;

  console.log('Save code request received:', { userId, code, result }); // Debugging

  try {
    // Convert userId to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    // Create a new code entry
    const newCode = new Code({ userId: objectIdUserId, code, result });
    await newCode.save();

    console.log('Code saved successfully:', newCode); // Debugging
    res.status(201).json({ message: 'Code saved successfully' });
  } catch (err) {
    console.error('Error saving code:', err); // Debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;