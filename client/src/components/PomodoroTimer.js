// src/components/PomodoroTimer.js -- FINAL, COMPLETE VERSION
import React, { useState, useEffect } from 'react';
import './PomodoroTimer.css';

const PomodoroTimer = ({ settings }) => {
  const [mode, setMode] = useState('focus');
  const [isActive, setIsActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(settings.focus * 60);
  const [sessionCount, setSessionCount] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isActive) {
      setIsActive(false);
      alert("Time's up!");

      if (mode === 'focus') {
        const newSessionCount = sessionCount + 1;
        setSessionCount(newSessionCount);

        if (newSessionCount % 4 === 0) {
          selectMode('longBreak');
        } else {
          selectMode('shortBreak');
        }
      } else {
        selectMode('focus');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining, mode, sessionCount, settings]);
  
  useEffect(() => {
    if (!isActive) {
      const newTime = (mode === 'focus' ? settings.focus : mode === 'shortBreak' ? settings.shortBreak : settings.longBreak) * 60;
      setTimeRemaining(newTime);
    }
  }, [mode, settings]);

  // --- THIS IS THE RESTORED FUNCTION ---
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };
  
  const selectMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
  };

  return (
    <div className="widget-card pomodoro-timer">
      <div className="timer-modes">
        <button className={`mode-btn ${mode === 'focus' ? 'active' : ''}`} onClick={() => selectMode('focus')}>Focus</button>
        <button className={`mode-btn ${mode === 'shortBreak' ? 'active' : ''}`} onClick={() => selectMode('shortBreak')}>Short Break</button>
        <button className={`mode-btn ${mode === 'longBreak' ? 'active' : ''}`} onClick={() => selectMode('longBreak')}>Long Break</button>
      </div>
      
      <div className="timer-display">{formatTime(timeRemaining)}</div>

      <div className="timer-controls">
        <button className="control-btn start-btn" onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
      </div>
      
      <div className="session-counter">
        Session {sessionCount % 4 === 0 && sessionCount !== 0 ? 4 : sessionCount % 4} of 4
      </div>
    </div>
  );
};

export default PomodoroTimer;