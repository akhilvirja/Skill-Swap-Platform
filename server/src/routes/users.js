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
    const users = await User.find().select('-password -ratings');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
