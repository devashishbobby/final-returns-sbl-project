// 1. Import dependencies
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// 2. NEW: Conditional dotenv configuration
// This is a professional best practice. It loads our local .env file ONLY in development.
// In production (on Render), we will rely on the variables set in the dashboard.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// 3. Initialize Express App
const app = express();

// 4. Connect to Database
connectDB();

// 5. Configure Middleware
app.use(cors());
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