import React from 'react';
import { MdTrendingUp } from 'react-icons/md';

const Reports = () => {
  return (
    <div>
      <h1 className="page-header">Financial Reports</h1>
      <div className="page-content">
        <div className="page-placeholder">
          <MdTrendingUp className="page-placeholder-icon" />
          <h2>Financial Reports</h2>
          <p>View detailed financial reports and analytics. Track your financial growth over time with visual charts.</p>
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;