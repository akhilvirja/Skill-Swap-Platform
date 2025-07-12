require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));

app.use('/api/users', require('./routes/users'));

// Test route
app.get('/', (req, res) => {
  res.send('Skill Swap API Running ');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
