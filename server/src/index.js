require("dotenv").config()
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/index.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

connectDB();

app.get('/', (req, res) => res.send('Skill Swap API Running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
