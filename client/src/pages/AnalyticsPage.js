// client/src/pages/AnalyticsPage.js -- THE SMART GATEKEEPER

import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import AnalyticsDashboard from '../components/AnalyticsDashboard'; // The component with graphs
import PremiumUpgradePrompt from '../components/PremiumUpgradePrompt'; // The component with the payment button

const AnalyticsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the user's data to check their premium status
    const fetchUser = async () => {
      try {
        const res = await api.get('/auth/me');
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch user data', err);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212', color: 'white' }}>
        Loading...
      </div>
    );
  }

  // This is the conditional rendering logic
  return (
    <div>
      {user && user.isPremium ? (
        // If the user is premium, show the dashboard with graphs
        <AnalyticsDashboard />
      ) : (
        // Otherwise, show the prompt to upgrade
        <PremiumUpgradePrompt />
      )}
    </div>
  );
};

export default AnalyticsPage;