import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './AnalyticsDashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsDashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics/task-summary');
        
        // Process the data for Chart.js
        const labels = res.data.map(item => String(item.date));
        const dataPoints = res.data.map(item => Number(item.completedCount));

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Completed Tasks per Day',
              data: dataPoints,
              backgroundColor: 'rgba(255, 122, 0, 0.8)',
              borderColor: 'rgba(255, 152, 56, 1)',
              borderWidth: 2,
              barThickness: 60, // Fixed width for consistent bar rendering
            },
          ],
        });
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch analytics data', err);
        setError('Could not load analytics data.');
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { color: '#E0E0E0' }
      },
      title: {
        display: true,
        text: 'Your Productivity Over Time',
        color: '#FFFFFF',
        font: { size: 18 }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { 
          color: '#aaa', 
          stepSize: 1,
          precision: 0,
        },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        type: 'category',
        ticks: { 
          color: '#aaa',
          maxRotation: 45,
          minRotation: 0,
        },
        grid: { 
          color: 'rgba(255, 255, 255, 0.1)',
        },
      }
    },
  };

  if (loading) return <p style={{ color: '#fff', padding: '2rem' }}>Loading analytics...</p>;
  if (error) return <p style={{ color: 'red', padding: '2rem' }}>{error}</p>;

  return (
    <div className="analytics-container widget-card">
      <h2>Premium Analytics</h2>
      <div className="chart-wrapper">
        {chartData && chartData.labels && chartData.labels.length > 0 ? (
          <Bar options={options} data={chartData} />
        ) : (
          <p className="no-data-message">
            No completed tasks to analyze yet. Keep up the great work!
          </p>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;