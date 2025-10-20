// server/index.js

// 1. Import dependencies
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// 2. Conditional dotenv configuration for local development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 3. Initialize Express App
const app = express();

// 4. Connect to Database
connectDB();

// 5. Configure Middleware

// --- START: CORRECT CORS CONFIGURATION ---
const allowedOrigins = [
  'http://localhost:3000', // For your local development
  'https://final-returns-sbl-project.vercel.app' // Your live frontend URL
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests if origin is in our list or if there's no origin (like Postman)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions)); // Use the specific options
// --- END: CORRECT CORS CONFIGURATION ---

app.use(express.json());

// 6. Define API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));

// 7. Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));