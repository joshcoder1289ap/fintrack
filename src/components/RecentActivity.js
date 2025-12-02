import React from 'react';
import { MdFastfood, MdAttachMoney, MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';

const RecentActivity = () => {
  const activities = [
    { 
      category: 'Food & Dining', 
      date: 'November 2025', 
      amount: -120.50, 
      icon: <MdFastfood /> 
    },
    { 
      category: 'Salary', 
      date: 'November 2025', 
      amount: 56000, 
      icon: <MdAttachMoney /> 
    },
  ];

  return (
    <div className="recent-activity">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="activity-title">Recent Activity</h3>
        <Link to="/expenses" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '5px', 
          color: '#4f46e5', 
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '0.95rem'
        }}>
          View All <MdArrowForward />
        </Link>
      </div>
      
      <div className="activity-list">
        {activities.map((activity, index) => (
          <div key={index} className="activity-item">
            <div>
              <div className="activity-category">
                {activity.icon} {activity.category}
              </div>
              <div className="activity-date">{activity.date}</div>
            </div>
            <div className={`activity-amount ${activity.amount >= 0 ? 'income' : 'expense'}`}>
              {activity.amount >= 0 ? '+' : ''}${Math.abs(activity.amount).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;