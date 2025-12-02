import React from 'react';
import { MdPieChart } from 'react-icons/md';

const Budget = () => {
  return (
    <div>
      <h1 className="page-header">Budget Planning</h1>
      <div className="page-content">
        <div className="page-placeholder">
          <MdPieChart className="page-placeholder-icon" />
          <h2>Budget Planning</h2>
          <p>Set and manage your monthly budgets. Allocate funds to different categories and track your progress.</p>
          <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Budget;