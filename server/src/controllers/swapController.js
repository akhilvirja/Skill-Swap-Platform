const SwapRequest = require('../models/SwapRequest');
const User = require('../models/user');

exports.createSwap = async (req, res) => {
  try {
    const { toUser, skillOffered, skillWanted, message } = req.body;
    const swap = await SwapRequest.create({
      fromUser: req.user,
      toUser,
      skillOffered,
      skillWanted,
      message
    });
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMySwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find({
      $or: [
        { fromUser: req.user },
        { toUser: req.user }
      ]
    }).populate('fromUser toUser', 'name email');
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { action } = req.body; // "accept", "reject", "cancel"

  try {
    const swap = await SwapRequest.findById(id);
    if (!swap) return res.status(404).json({ message: 'Swap not found' });

    // Only the toUser can accept/reject, fromUser can cancel
    if (
      (action === 'accept' || action === 'reject') &&
      String(swap.toUser) !== req.user
    ) return res.status(403).json({ message: 'Not authorized' });

    if (action === 'cancel' && String(swap.fromUser) !== req.user)
      return res.status(403).json({ message: 'Not authorized' });

    swap.status = action;
    await swap.save();
    res.json({ message: `Swap ${action}ed`, swap });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
