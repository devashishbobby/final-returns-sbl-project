// server/middleware/authMiddleware.js -- THE FINAL, CORRECTED VERSION

const jwt = require('jsonwebtoken');
const User = require('../models/User'); // We need the User model to query the database
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  // Get token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // 1. Verify the token to get the user's ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. THIS IS THE CRITICAL UPGRADE:
    // Instead of trusting the (potentially stale) token payload, we use the ID from the token
    // to fetch the LATEST user data directly from the database.
    // We use .select('-password') to exclude the password hash for security.
    const freshUser = await User.findById(decoded.user.id).select('-password');

    // If the user was deleted since the token was issued, deny access.
    if (!freshUser) {
        return res.status(401).json({ msg: 'User not found, authorization denied' });
    }

    // 3. Attach the FRESH user object to the request.
    req.user = freshUser;
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = authMiddleware;