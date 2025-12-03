import React from 'react';
import ProgressBar from './ProgressBar';

const BudgetCard = ({ totalSpent, budget, percentage, daysLeft }) => {
  return (
    <div className="budget-card">
      <h2>Total Spent This Month</h2>
      <div className="total-spent">${totalSpent.toLocaleString()}</div>
      
      <div className="budget-info">
        <span>Budget: ${budget.toLocaleString()}</span>
        <span>{daysLeft} days left</span>
      </div>
      
      <ProgressBar percentage={percentage} />
      
      <div className="days-left">{daysLeft} Days Left</div>
    </div>
  );
};

export default BudgetCard;