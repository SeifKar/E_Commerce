import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-content">
        <div className="welcome-section">
          <h2>Welcome, {user?.name}!</h2>
          <p>Here's an overview of your account</p>
        </div>
        
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Orders</h3>
            <p className="stat-number">0</p>
            <p className="stat-label">Total Orders</p>
          </div>
          
          <div className="stat-card">
            <h3>Wishlist</h3>
            <p className="stat-number">0</p>
            <p className="stat-label">Saved Items</p>
          </div>
          
          <div className="stat-card">
            <h3>Cart</h3>
            <p className="stat-number">0</p>
            <p className="stat-label">Items in Cart</p>
          </div>
          
          <div className="stat-card">
            <h3>Reviews</h3>
            <p className="stat-number">0</p>
            <p className="stat-label">Product Reviews</p>
          </div>
        </div>
        
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <p>No recent activity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
