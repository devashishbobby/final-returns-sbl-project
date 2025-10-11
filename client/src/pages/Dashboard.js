// src/pages/Dashboard.js -- FINAL VERSION WITH PERSISTENT SETTINGS
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import './Dashboard.css';
import TaskList from '../components/TaskList';
import AddTaskModal from '../components/AddTaskModal';
import PomodoroTimer from '../components/PomodoroTimer';
import SettingsModal from '../components/SettingsModal';
import Sidebar from '../components/Sidebar';

const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) { return { text: 'Good Morning', emoji: '☀️' }; } 
  else if (currentHour < 18) { return { text: 'Good Afternoon', emoji: '🌤️' }; } 
  else { return { text: 'Good Evening', emoji: '🌙' }; }
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const greeting = getGreeting();

  // Initialize with defaults, will be overwritten by fetched data
  const [timerSettings, setTimerSettings] = useState({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user info (which now includes settings) and tasks concurrently
        const [userRes, tasksRes] = await Promise.all([api.get('/auth/me'), api.get('/tasks')]);
        
        setUser(userRes.data);
        setTasks(tasksRes.data);

        // --- NEW: Load saved settings from the user object ---
        if (userRes.data.settings) {
          setTimerSettings(userRes.data.settings);
        }

        setLoading(false);
      } catch (err) { handleLogout(); }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleAddTask = async (title) => {
    try {
      const res = await api.post('/tasks', { title });
      setTasks([...tasks, res.data]);
    } catch (err) { console.error('Failed to add task', err); }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) { console.error('Failed to delete task', err); }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      const res = await api.put(`/tasks/${taskId}`, { isCompleted: !currentStatus });
      setTasks(tasks.map(task => (task._id === taskId ? res.data : task)));
    } catch (err) { console.error('Failed to update task', err); }
  };
  
  
  // --- UPGRADED: Save settings function now calls the API ---
  const handleSaveSettings = async (newSettings) => {
    try {
      // Send the new settings to our backend endpoint
      const res = await api.put('/auth/settings', newSettings);
      
      // Update the local state with the settings confirmed by the server
      setTimerSettings(res.data);
      
      // Close the modal
      setIsSettingsModalOpen(false);
    } catch (err) {
      console.error('Failed to save settings', err);
      alert('Could not save settings. Please try again.');
    }
  };

  if (loading) { return <div className="dashboard-container">Loading...</div>; }

  return (
    <div className="dashboard-container">
        <Sidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            handleLogout={handleLogout}
        />

      <div className="dashboard-content">
        <header className="dashboard-header">
          <div className="header-actions">
            <button title="Menu" onClick={() => setIsSidebarOpen(true)}>☰</button>
          </div>
          <div className="header-greeting">
            <h1>{greeting.text} {greeting.emoji}</h1>
            <p>{user.name}</p>
          </div>
          <div className="header-actions">
            <button title="Settings" onClick={() => setIsSettingsModalOpen(true)}>⚙️</button>
          </div>
        </header>

        <main>
          <PomodoroTimer settings={timerSettings} />
          <TaskList
            tasks={tasks}
            onOpenModal={() => setIsTaskModalOpen(true)}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask} 
          />
        </main>
      </div>
      
      <AddTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />
      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        currentSettings={timerSettings}
        onSave={handleSaveSettings}
      />
    </div>
  );
};

export default Dashboard;