// In routes/apiRoutes.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET route for getting all users
router.get('/users', async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route for creating a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      // Add other fields here
    });
    res.status(200).json(newUser);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
