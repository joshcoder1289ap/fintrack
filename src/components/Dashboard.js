import React from 'react';
import { MdTrendingDown } from 'react-icons/md';
import BudgetCard from './BudgetCard';
import RecentActivity from './RecentActivity';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Hello, User! 🌟</h1>
        <p>Track your expenses wisely</p>
      </div>
      
      <div className="dashboard-grid">
        <BudgetCard 
          totalSpent={2700}
          budget={4000}
          percentage={59}
          daysLeft={30}
        />
        
        <div className="stats-card">
          <h3 className="stats-title">Vs Last Month</h3>
          <div className="comparison down">
            <MdTrendingDown className="comparison-icon" />
            <span>50.7% decrease</span>
          </div>
          <p>Your spending is significantly lower compared to last month. Keep up the good work!</p>
        </div>
      </div>
      
      <RecentActivity />
    </div>
  );
};

export default Dashboard;