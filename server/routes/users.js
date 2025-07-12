const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { getMyProfile, updateProfile } = require('../controllers/userController');

router.get('/me', authMiddleware, getMyProfile);
router.put('/update', authMiddleware, updateProfile);

module.exports = router;
