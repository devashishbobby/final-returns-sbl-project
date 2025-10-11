// src/components/AddTaskModal.js
import React, { useState } from 'react';
import './AddTaskModal.css';

const AddTaskModal = ({ isOpen, onClose, onAddTask }) => {
  const [title, setTitle] = useState('');

  if (!isOpen) {
    return null; // Don't render anything if the modal is closed
  }

  const handleSubmit = () => {
    if (title.trim()) {
      onAddTask(title); // Pass the new title to the parent component
      setTitle(''); // Reset input
      onClose(); // Close the modal
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add a new task</h2>
        <input
          type="text"
          className="modal-input"
          placeholder="What's the next big thing?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus // Automatically focus the input field
        />
        <div className="modal-actions">
          <button className="modal-btn cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-btn ok-btn" onClick={handleSubmit}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;