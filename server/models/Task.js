// server/models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    // Note: createdAt is now handled automatically by timestamps option below
  },
  {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('task', TaskSchema);