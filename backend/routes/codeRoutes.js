const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Code = require('../models/Code');

router.post("/save", async (req, res) => {
  const { userId, code, result } = req.body;
  console.log('Save code request received:', { userId, code, result }); // Debugging

  try {
    // Convert userId to ObjectId
    const objectIdUserId = new mongoose.Types.ObjectId(userId);

    const newEntry = new Code({
      userId: objectIdUserId,
      code,
      result
    });

    await newEntry.save();
    res.status(200).json({ message: "Saved successfully!" });
  } catch (err) {
    console.error("Error saving code:", err);
    res.status(500).json({ error: "Failed to save to database" });
  }
});


module.exports = router;