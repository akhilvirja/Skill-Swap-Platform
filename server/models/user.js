const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String },
  profilePhoto: { type: String },
  isPublic: { type: Boolean, default: true },
  availability: [String],
  skillsOffered: [String],
  skillsWanted: [String],
  ratings: [
    {
      raterId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 },
      comment: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
