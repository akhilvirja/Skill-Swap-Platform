const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { createSwap, getMySwaps, updateStatus } = require('../controllers/swapController');

router.post('/', auth, createSwap);
router.get('/me', auth, getMySwaps);
router.patch('/:id/accept', auth, (req, res) => updateStatus({ ...req, body: { action: 'accept' } }, res));
router.patch('/:id/reject', auth, (req, res) => updateStatus({ ...req, body: { action: 'reject' } }, res));
router.patch('/:id/cancel', auth, (req, res) => updateStatus({ ...req, body: { action: 'cancel' } }, res));

module.exports = router;
