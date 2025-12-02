import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  MdCheckCircle, 
  MdArrowBack, 
  MdDashboard, 
  MdReceipt,
  MdAttachMoney,
  MdCategory,
  MdCalendarToday,
  MdCreditCard,
  MdDescription,
  MdTrendingUp,
  MdTrendingDown,
  MdArrowForward,
  MdShare,
  MdPrint
} from 'react-icons/md';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Default data jika tidak ada state
  const expenseData = location.state?.expenseData || {
    id: Date.now(),
    amount: 120.50,
    category: 'Food & Dining',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Credit Card',
    notes: 'Lunch with colleagues',
    recurring: false,
    createdAt: new Date().toISOString()
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  // Stats data
  const monthlyStats = {
    totalSpent: 2820.50,
    budget: 4000,
    remainingBudget: 1179.50,
    percentageUsed: 71,
    daysLeft: 25,
    avgDaily: 94,
    transactionsThisMonth: 12
  };

  // Recent transactions
  const recentTransactions = [
    { category: 'Food & Dining', amount: -85.50, date: 'Today', time: '2:30 PM' },
    { category: 'Entertainment', amount: -45.00, date: 'Yesterday', time: '8:15 PM' },
    { category: 'Transportation', amount: -25.75, date: 'Nov 23', time: '10:00 AM' }
  ];

  // Category icon mapping
  const getCategoryIcon = (category) => {
    const icons = {
      'Food & Dining': '🍽️',
      'Rent': '🏠',
      'Car Payment': '🚗',
      'Entertainment': '🎬',
      'Shopping': '🛍️',
      'Utilities': '💡',
      'Healthcare': '🏥',
      'Education': '📚',
      'Other': '📦'
    };
    return icons[category] || '💰';
  };

  // Payment method icon mapping
  const getPaymentIcon = (method) => {
    const icons = {
      'Credit Card': '💳',
      'Debit Card': '💳',
      'Cash': '💵',
      'Bank Transfer': '🏦',
      'PayPal': '💰',
      'E-Wallet': '📱'
    };
    return icons[method] || '💳';
  };

  // Confetti effect
  useEffect(() => {
    const createConfetti = () => {
      const colors = ['#4f46e5', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = Math.random() * 10 + 5 + 'px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.opacity = Math.random() * 0.5 + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.querySelector('.success-page')?.appendChild(confetti);
        
        // Animate
        confetti.animate([
          { transform: 'translateY(-100vh) rotate(0deg)', opacity: 1 },
          { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
          duration: Math.random() * 3000 + 2000,
          easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remove after animation
        setTimeout(() => confetti.remove(), 5000);
      }
    };

    createConfetti();
  }, []);

  return (
    <div className="success-page">
      {/* Confetti elements will be added here */}
      
      <div className="success-container">
        {/* Success Icon with Animation */}
        <div className="success-icon-container">
          <div className="success-icon-circle">
            <MdCheckCircle className="success-icon" />
          </div>
          <div className="success-pulse"></div>
        </div>

        {/* Success Message */}
        <h1 className="success-title">Expense Added Successfully! 🎉</h1>
        <p className="success-subtitle">
          Your expense has been recorded and saved to your financial history.
        </p>

        {/* Transaction Details Card */}
        <div className="transaction-details-card">
          <div className="details-header">
            <h3>
              <MdReceipt /> Transaction Details
            </h3>
            <div className="details-actions">
              <button className="action-btn share">
                <MdShare /> Share
              </button>
              <button className="action-btn print">
                <MdPrint /> Print
              </button>
            </div>
          </div>

          <div className="details-grid">
            <div className="detail-item">
              <div className="detail-label">
                <MdAttachMoney /> Amount
              </div>
              <div className="detail-value amount">
                -{formatCurrency(expenseData.amount)}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <MdCategory /> Category
              </div>
              <div className="detail-value category">
                <span className="category-icon">{getCategoryIcon(expenseData.category)}</span>
                {expenseData.category}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <MdCalendarToday /> Date & Time
              </div>
              <div className="detail-value">
                {formatDate(expenseData.date)}
                <span className="time">• {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">
                <MdCreditCard /> Payment Method
              </div>
              <div className="detail-value payment">
                <span className="payment-icon">{getPaymentIcon(expenseData.paymentMethod)}</span>
                {expenseData.paymentMethod}
              </div>
            </div>

            {expenseData.notes && (
              <div className="detail-item full-width">
                <div className="detail-label">
                  <MdDescription /> Notes
                </div>
                <div className="detail-value notes">
                  {expenseData.notes}
                </div>
              </div>
            )}

            {expenseData.recurring && (
              <div className="detail-item full-width">
                <div className="detail-label recurring-label">
                  🔄 Recurring Expense
                </div>
                <div className="detail-value recurring">
                  This expense will repeat monthly
                </div>
              </div>
            )}
          </div>

          <div className="transaction-id">
            Transaction ID: <span className="id-value">{expenseData.id}</span>
          </div>
        </div>

        {/* Monthly Stats */}
        <div className="monthly-stats">
          <h3>Monthly Overview</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">Total Spent</div>
                <div className="stat-trend down">
                  <MdTrendingDown /> 5% less
                </div>
              </div>
              <div className="stat-value">${monthlyStats.totalSpent.toLocaleString()}</div>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${monthlyStats.percentageUsed}%` }}
                  ></div>
                </div>
                <div className="progress-label">
                  <span>${monthlyStats.remainingBudget.toLocaleString()} remaining</span>
                  <span>{monthlyStats.percentageUsed}% used</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">Days Left</div>
                <div className="stat-trend">
                  {monthlyStats.daysLeft} days
                </div>
              </div>
              <div className="stat-value large">{monthlyStats.daysLeft}</div>
              <div className="stat-desc">
                <div className="stat-item">
                  <span>Avg. Daily:</span>
                  <span>${monthlyStats.avgDaily}</span>
                </div>
                <div className="stat-item">
                  <span>Transactions:</span>
                  <span>{monthlyStats.transactionsThisMonth}</span>
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <div className="stat-title">Budget Status</div>
                <div className="stat-trend up">
                  <MdTrendingUp /> On track
                </div>
              </div>
              <div className="budget-status">
                <div className="status-indicator good"></div>
                <div className="status-text">You're within budget</div>
              </div>
              <div className="budget-tip">
                <p>💡 Tip: At this rate, you'll have ${(monthlyStats.remainingBudget / monthlyStats.daysLeft * 30).toLocaleString()} left by month end.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  {getCategoryIcon(transaction.category)}
                </div>
                <div className="activity-details">
                  <div className="activity-category">{transaction.category}</div>
                  <div className="activity-meta">
                    <span className="activity-date">{transaction.date}</span>
                    <span className="activity-time">{transaction.time}</span>
                  </div>
                </div>
                <div className={`activity-amount ${transaction.amount >= 0 ? 'income' : 'expense'}`}>
                  {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <Link to="/expenses" className="btn btn-secondary">
            <MdArrowBack /> Back to Expenses
          </Link>
          <Link to="/" className="btn btn-primary">
            <MdDashboard /> Go to Dashboard
          </Link>
          <button 
            className="btn btn-tertiary"
            onClick={() => navigate('/add-expense')}
          >
            <MdReceipt /> Add Another Expense
          </button>
        </div>

        {/* Next Steps */}
        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📊</div>
              <div className="step-content">
                <h4>Review Your Budget</h4>
                <p>See how this expense affects your monthly budget plan</p>
              </div>
              <MdArrowForward className="step-arrow" />
            </div>
            
            <div className="step-card">
              <div className="step-icon">🎯</div>
              <div className="step-content">
                <h4>Set Savings Goals</h4>
                <p>Create goals to balance your spending habits</p>
              </div>
              <MdArrowForward className="step-arrow" />
            </div>
            
            <div className="step-card">
              <div className="step-icon">📱</div>
              <div className="step-content">
                <h4>Download Receipt</h4>
                <p>Save a copy of this transaction for your records</p>
              </div>
              <MdArrowForward className="step-arrow" />
            </div>
          </div>
        </div>

        {/* Share Success */}
        <div className="share-success">
          <p>Share your financial discipline with friends! 🎯</p>
          <div className="share-buttons">
            <button className="share-btn twitter">Share on Twitter</button>
            <button className="share-btn linkedin">Share on LinkedIn</button>
            <button className="share-btn copy">Copy Link</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;