const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const premiumMiddleware = require('../middleware/premiumMiddleware');
const Task = require('../models/Task');

router.get(
  '/task-summary',
  [authMiddleware, premiumMiddleware],
  async (req, res) => {
    try {
      const taskSummary = await Task.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(req.user.id),
            isCompleted: true,
          },
        },
        {
          // Group by the completion date (using updatedAt which tracks when task was last modified)
          $group: {
            _id: { 
              $dateToString: { 
                format: '%Y-%m-%d', 
                date: '$updatedAt' 
              } 
            },
            completedCount: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
        {
          // Rename fields to match frontend expectations
          $project: {
            _id: 0,
            date: '$_id',
            completedCount: 1,
          },
        },
      ]);

      // Additional safety check: filter out any null dates (shouldn't happen, but just in case)
      const validData = taskSummary.filter(item => item.date !== null);

      console.log('Task Summary Response:', validData);

      res.json(validData);
    } catch (err) {
      console.error('Analytics Aggregation Error:', err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;