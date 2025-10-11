// src/components/TaskList.js -- DEBUGGING VERSION
import React from 'react';
import './TaskList.css';

const TaskList = ({ tasks, onOpenModal, onDeleteTask, onToggleTask }) => {
  return (
    <div className="widget-card">
      <div className="task-list-header">
        <h2>Tasks</h2>
        <button className="add-task-btn" onClick={onOpenModal}>+</button>
      </div>
      <div className="tasks-container">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task._id} className="task-item">
              <div className="task-item-left">
                <div 
                  className={`task-checkbox ${task.isCompleted ? 'completed' : ''}`}
                  onClick={() => {
                    console.log(`Checkbox clicked! Toggling task: ${task._id}`); // <-- DEBUG LINE
                    onToggleTask(task._id, task.isCompleted);
                  }}
                ></div>
                <span className={task.isCompleted ? 'completed-text' : ''}>
                  {task.title}
                </span>
              </div>
              <button 
                className="delete-task-btn" 
                onClick={() => onDeleteTask(task._id)}
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <p className="no-tasks-message">No tasks yet. Add one!</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;