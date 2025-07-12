require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/index.js');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));

// Test route
app.get('/', (req, res) => {
  res.send('Skill Swap API Running ✅');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
