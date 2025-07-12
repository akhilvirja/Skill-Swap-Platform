const User = require('../models/user');

exports.getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user, updates, { new: true }).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addRating = async (req, res) => {
  try {
    const { targetUserId, rating, comment } = req.body;

    // Prevent rating yourself
    if (targetUserId === req.user)
      return res.status(400).json({ message: "You can't rate yourself" });

    const user = await User.findById(targetUserId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.ratings.push({
      raterId: req.user,
      rating,
      comment
    });

    await user.save();
    res.json({ message: 'Rating submitted', ratings: user.ratings });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
