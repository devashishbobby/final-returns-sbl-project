// server/index.js -- FINAL, SIMPLIFIED CORS FIX

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// --- Middleware ---

// 1. CORS: This MUST come before your API routes.
// We are using the default, most permissive configuration.
app.use(cors());

// 2. Body Parser: To accept JSON data.
app.use(express.json());


// --- API Routes ---
app.get('/', (req, res) => res.send('ProTrack API Running')); // This is the old test route
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));


// --- Server Listener ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));