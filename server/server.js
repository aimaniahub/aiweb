// /server/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../config/db');
const { register, login } = require('./authController');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/api/register', register);
app.post('/api/login', login);

// Serve static files (HTML, CSS, JS)
app.use(express.static('../'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
