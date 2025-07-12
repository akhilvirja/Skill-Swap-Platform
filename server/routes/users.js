const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getMyProfile, updateProfile, addRating} = require('../controllers/userController');
const User = require('../models/user'); 

router.get('/me', authMiddleware, getMyProfile);
router.put('/update', authMiddleware, updateProfile);
router.post('/rate', authMiddleware, addRating);

router.get('/public', async (req, res) => {
  try {
    const { skill, location, availability } = req.query;

    const query = {
      isPublic: true
    };

    if (skill) {
      query.skillsOffered = { $regex: skill, $options: 'i' };
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    if (availability) {
      query.availability = availability;
    }

    const users = await User.find(query).select('-password -ratings');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
