// server/index.js -- FINAL CORRECTED ORDER

// 1. Load environment variables FIRST. This is the most critical step.
require('dotenv').config(); 

// 2. Import all other dependencies
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// 3. Initialize Express App
const app = express();

// 4. Connect to Database
connectDB();

// 5. Configure Middleware
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
app.use(cors(corsOptions));
app.use(express.json());

// 6. Define API Routes LAST
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// 7. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));