import React, { useState, useEffect } from 'react';
import { 
  MdReceipt, 
  MdTrendingUp, 
  MdTrendingDown, 
  MdCalendarToday,
  MdPieChart,
  MdBarChart,
  MdInsights,
  MdWarning,
  MdCheckCircle,
  MdArrowForward,
  MdSavings,
  MdAccountBalance,
  MdAttachMoney,
  MdFilterList,
  MdSearch,
  MdAdd,
  MdDownload,
  MdEdit,
  MdDelete,
  MdArrowBack,
  MdCreditCard,
  MdFastfood,
  MdHome,
  MdDirectionsCar,
  MdLocalGasStation,
  MdWaterDrop,
  MdAttractions,
  MdShoppingBag,
  MdDateRange,
  MdAccountBalanceWallet
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import './Expenses.css';

const Expenses = () => {
  const navigate = useNavigate();
  
  // State untuk view mode
  const [activeView, setActiveView] = useState('list'); // list, chart, insights
  const [timeRange, setTimeRange] = useState('month'); // week, month, year
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, income, expense
  const [showFilters, setShowFilters] = useState(false);
  
  // Data transaksi
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      category: 'Rent', 
      amount: -3000.00, 
      type: 'expense', 
      date: '2025-11-01', 
      displayDate: 'Nov 1, 2025',
      icon: <MdHome />,
      description: 'Monthly apartment rent',
      paymentMethod: 'Bank Transfer',
      color: '#4f46e5'
    },
    { 
      id: 2, 
      category: 'Car Payment', 
      amount: -1200.00, 
      type: 'expense', 
      date: '2025-11-02', 
      displayDate: 'Nov 2, 2025',
      icon: <MdDirectionsCar />,
      description: 'Car loan installment',
      paymentMethod: 'Auto Debit',
      color: '#7c3aed'
    },
    { 
      id: 3, 
      category: 'Monthly Salary', 
      amount: 2500.00, 
      type: 'income', 
      date: '2025-11-03', 
      displayDate: 'Nov 3, 2025',
      icon: <MdAccountBalanceWallet />,
      description: 'Monthly salary from company',
      paymentMethod: 'Direct Deposit',
      color: '#10b981'
    },
    { 
      id: 4, 
      category: 'Food & Groceries', 
      amount: -800.00, 
      type: 'expense', 
      date: '2025-11-04', 
      displayDate: 'Nov 4, 2025',
      icon: <MdFastfood />,
      description: 'Weekly groceries shopping',
      paymentMethod: 'Credit Card',
      color: '#f59e0b'
    },
    { 
      id: 5, 
      category: 'Freelance Project', 
      amount: 1200.00, 
      type: 'income', 
      date: '2025-11-05', 
      displayDate: 'Nov 5, 2025',
      icon: <MdReceipt />,
      description: 'Web development project',
      paymentMethod: 'PayPal',
      color: '#3b82f6'
    },
    { 
      id: 6, 
      category: 'Stock Dividend', 
      amount: 800.00, 
      type: 'income', 
      date: '2025-11-08', 
      displayDate: 'Nov 8, 2025',
      icon: <MdTrendingUp />,
      description: 'Quarterly stock dividends',
      paymentMethod: 'Broker Account',
      color: '#8b5cf6'
    },
    { 
      id: 7, 
      category: 'Electricity Bill', 
      amount: -150.00, 
      type: 'expense', 
      date: '2025-11-10', 
      displayDate: 'Nov 10, 2025',
      icon: <MdHome />,
      description: 'Monthly electricity bill',
      paymentMethod: 'Online Banking',
      color: '#ef4444'
    },
    { 
      id: 8, 
      category: 'Gas', 
      amount: -70.00, 
      type: 'expense', 
      date: '2025-11-12', 
      displayDate: 'Nov 12, 2025',
      icon: <MdLocalGasStation />,
      description: 'Car fuel',
      paymentMethod: 'Credit Card',
      color: '#64748b'
    },
    { 
      id: 9, 
      category: 'Commission', 
      amount: 1000.00, 
      type: 'income', 
      date: '2025-11-15', 
      displayDate: 'Nov 15, 2025',
      icon: <MdAccountBalanceWallet />,
      description: 'Sales commission',
      paymentMethod: 'Bank Transfer',
      color: '#10b981'
    },
    { 
      id: 10, 
      category: 'Entertainment', 
      amount: -1780.00, 
      type: 'expense', 
      date: '2025-11-18', 
      displayDate: 'Nov 18, 2025',
      icon: <MdAttractions />,
      description: 'Concert tickets and dinner',
      paymentMethod: 'Credit Card',
      color: '#ec4899'
    },
    { 
      id: 11, 
      category: 'Gift', 
      amount: 500.00, 
      type: 'income', 
      date: '2025-11-20', 
      displayDate: 'Nov 20, 2025',
      icon: <MdReceipt />,
      description: 'Birthday gift from family',
      paymentMethod: 'Cash',
      color: '#8b5cf6'
    },
  ]);

  // State untuk stats
  const [stats, setStats] = useState({
    totalSpent: 2700,
    totalIncome: 0,
    totalExpense: 0,
    avgDaily: 90,
    biggestExpense: 3000,
    transactionsCount: 11,
    budget: 4000,
    remainingBudget: 1300,
    daysLeft: 25,
    budgetUsed: 67
  });

  // Chart data
  const [categorySpending, setCategorySpending] = useState([]);
  const [spendingTrend, setSpendingTrend] = useState([]);

  // Inisialisasi data
  useEffect(() => {
    calculateStats();
    calculateCategorySpending();
    calculateSpendingTrend();
  }, [transactions, timeRange]);

  // Hitung statistics
  const calculateStats = () => {
    const totalIncome = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const totalSpent = totalExpense;
    const biggestExpense = Math.max(...transactions.filter(t => t.type === 'expense').map(t => Math.abs(t.amount)));
    
    let avgDaily = 0;
    if (timeRange === 'week') {
      avgDaily = totalSpent / 7;
    } else if (timeRange === 'month') {
      avgDaily = totalSpent / 30;
    } else {
      avgDaily = totalSpent / 365;
    }

    const budget = 4000;
    const budgetUsed = Math.round((totalSpent / budget) * 100);
    const remainingBudget = budget - totalSpent;
    const daysLeft = 25;

    setStats({
      totalSpent,
      totalIncome,
      totalExpense,
      avgDaily: Math.round(avgDaily),
      biggestExpense,
      transactionsCount: transactions.length,
      budget,
      remainingBudget,
      daysLeft,
      budgetUsed
    });
  };

  // Hitung spending per kategori
  const calculateCategorySpending = () => {
    const categories = {};
    
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        if (!categories[transaction.category]) {
          categories[transaction.category] = {
            amount: 0,
            count: 0,
            color: transaction.color
          };
        }
        categories[transaction.category].amount += Math.abs(transaction.amount);
        categories[transaction.category].count++;
      }
    });

    const totalExpense = stats.totalExpense;
    const categoryArray = Object.keys(categories).map(category => ({
      category,
      amount: categories[category].amount,
      count: categories[category].count,
      percentage: Math.round((categories[category].amount / totalExpense) * 100),
      color: categories[category].color
    }));

    setCategorySpending(categoryArray.sort((a, b) => b.amount - a.amount));
  };

  // Hitung spending trend
  const calculateSpendingTrend = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trend = months.map((month, index) => ({
      month,
      amount: 1500 + (index * 200) + Math.random() * 300,
      color: index === months.length - 1 ? '#ef4444' : '#4f46e5'
    }));
    
    setSpendingTrend(trend.slice(-7)); // Last 7 months
  };

  // Filter transactions
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || transaction.type === filter;
    
    return matchesSearch && matchesFilter;
  });

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  // Format currency dengan desimal
  const formatCurrencyDecimal = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  // Hapus transaksi
  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  // Edit transaksi
  const handleEditTransaction = (id) => {
    navigate(`/edit-expense/${id}`);
  };

  // Export data
  const handleExportData = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `expenses_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Recent transactions untuk quick view
  const recentTransactions = transactions.slice(-3).reverse();

  // Budget alerts
  const budgetAlerts = [
    { category: 'Entertainment', status: 'over', percentage: 140, message: '40% over budget' },
    { category: 'Food & Groceries', status: 'warning', percentage: 85, message: 'Approaching limit' },
    { category: 'Transportation', status: 'good', percentage: 45, message: 'Within budget' }
  ];

  return (
    <div className="expenses-page">
      {/* Header Section */}
      <div className="expenses-header">
        <div className="header-left">
          <h1>Expense Tracking</h1>
          <p>Monitor and manage all your financial transactions</p>
        </div>
        
        <div className="header-actions">
          <button 
            className="add-expense-btn"
            onClick={() => navigate('/add-expense')}
          >
            <MdAdd /> Add Expense
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={`view-btn ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => setActiveView('list')}
        >
          <MdReceipt /> List View
        </button>
        <button 
          className={`view-btn ${activeView === 'chart' ? 'active' : ''}`}
          onClick={() => setActiveView('chart')}
        >
          <MdPieChart /> Charts
        </button>
        <button 
          className={`view-btn ${activeView === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveView('insights')}
        >
          <MdInsights /> Insights
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        {/* Total Spent Card */}
        <div className="stat-card main-stat">
          <div className="stat-header">
            <div className="stat-title">
              <MdAttachMoney className="stat-icon" />
              <h3>Total Spent</h3>
            </div>
            <span className="time-badge">{timeRange}ly</span>
          </div>
          <div className="stat-value">${stats.totalSpent.toLocaleString()}</div>
          
          <div className="progress-container">
            <div className="progress-label">
              <span>Budget: ${stats.budget.toLocaleString()}</span>
              <span>{stats.budgetUsed}% used</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${stats.budgetUsed}%` }}
              ></div>
            </div>
          </div>
          
          <div className="stat-footer">
            <span className="trend-down">
              <MdTrendingDown /> 12% less than last month
            </span>
            <span className="remaining">${stats.remainingBudget.toLocaleString()} remaining</span>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="stat-card">
          <div className="stat-header">
            <h3><MdBarChart /> Quick Stats</h3>
          </div>
          <div className="stat-list">
            <div className="stat-item">
              <span className="item-label">Avg. Daily Spend</span>
              <span className="item-value">${stats.avgDaily}</span>
            </div>
            <div className="stat-item">
              <span className="item-label">Biggest Expense</span>
              <span className="item-value expense">${stats.biggestExpense}</span>
            </div>
            <div className="stat-item">
              <span className="item-label">Transactions</span>
              <span className="item-value">{stats.transactionsCount}</span>
            </div>
            <div className="stat-item">
              <span className="item-label">Days Left</span>
              <span className="item-value">{stats.daysLeft}</span>
            </div>
          </div>
        </div>

        {/* Time Range & Controls */}
        <div className="stat-card">
          <div className="stat-header">
            <h3><MdCalendarToday /> Time Range</h3>
          </div>
          <div className="time-range-selector">
            {['week', 'month', 'year'].map(range => (
              <button
                key={range}
                className={`range-btn ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
          
          <div className="quick-actions">
            <button 
              className="action-btn primary"
              onClick={() => navigate('/add-expense')}
            >
              <MdReceipt /> Quick Add
            </button>
            <button 
              className="action-btn secondary"
              onClick={() => setShowFilters(!showFilters)}
            >
              <MdFilterList /> {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="filters-panel">
          <div className="filter-group">
            <h4>Search</h4>
            <div className="search-container">
              <MdSearch className="search-icon" />
              <input
                type="text"
                className="search-input"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="filter-group">
            <h4>Type</h4>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-btn ${filter === 'income' ? 'active' : ''}`}
                onClick={() => setFilter('income')}
              >
                Income
              </button>
              <button 
                className={`filter-btn ${filter === 'expense' ? 'active' : ''}`}
                onClick={() => setFilter('expense')}
              >
                Expenses
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content based on Active View */}
      {activeView === 'list' ? (
        <div className="transactions-list-view">
          <div className="list-header">
            <h3>All Transactions ({filteredTransactions.length})</h3>
            <div className="sort-options">
              <select className="sort-select">
                <option>Date: Newest First</option>
                <option>Date: Oldest First</option>
                <option>Amount: High to Low</option>
                <option>Amount: Low to High</option>
              </select>
            </div>
          </div>
          
          {filteredTransactions.length > 0 ? (
            <div className="transactions-container">
              {filteredTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-card">
                  <div className="transaction-info">
                    <div 
                      className="transaction-icon"
                      style={{ backgroundColor: `${transaction.color}20`, color: transaction.color }}
                    >
                      {transaction.icon}
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-header">
                        <h4 className="transaction-category">{transaction.category}</h4>
                        <div className={`transaction-amount ${transaction.type}`}>
                          {transaction.amount >= 0 ? '+' : '-'}{formatCurrencyDecimal(transaction.amount)}
                        </div>
                      </div>
                      <p className="transaction-description">{transaction.description}</p>
                      <div className="transaction-meta">
                        <span className="transaction-date">
                          <MdDateRange /> {transaction.displayDate}
                        </span>
                        <span className="transaction-method">
                          <MdCreditCard /> {transaction.paymentMethod}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="transaction-actions">
                    <button 
                      className="action-btn edit"
                      onClick={() => handleEditTransaction(transaction.id)}
                    >
                      <MdEdit />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📄</div>
              <h3>No transactions found</h3>
              <p>Try adjusting your search or filters</p>
              <button 
                className="add-expense-btn"
                onClick={() => navigate('/add-expense')}
              >
                <MdAdd /> Add Your First Expense
              </button>
            </div>
          )}
          
          {/* Summary */}
          <div className="transactions-summary">
            <div className="summary-card">
              <div className="summary-item">
                <span className="summary-label">Total Income</span>
                <span className="summary-value income">+{formatCurrency(stats.totalIncome)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Total Expenses</span>
                <span className="summary-value expense">-{formatCurrency(stats.totalExpense)}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Net Balance</span>
                <span className={`summary-value ${stats.totalIncome - stats.totalExpense >= 0 ? 'income' : 'expense'}`}>
                  {stats.totalIncome - stats.totalExpense >= 0 ? '+' : ''}
                  {formatCurrency(stats.totalIncome - stats.totalExpense)}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : activeView === 'chart' ? (
        <div className="chart-view">
          <div className="chart-section">
            <h3>Spending by Category</h3>
            <div className="pie-chart-container">
              <div className="chart-legend">
                {categorySpending.map(item => (
                  <div key={item.category} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <div className="legend-details">
                      <span className="legend-category">{item.category}</span>
                      <span className="legend-amount">{formatCurrency(item.amount)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="chart-section">
            <h3>Spending Trend</h3>
            <div className="trend-chart">
              {spendingTrend.map(item => (
                <div key={item.month} className="trend-bar-container">
                  <div 
                    className="trend-bar" 
                    style={{ 
                      height: `${(item.amount / 3000) * 100}%`,
                      backgroundColor: item.color
                    }}
                  ></div>
                  <span className="trend-month">{item.month}</span>
                  <span className="trend-value">${item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="insights-view">
          <div className="insights-header">
            <h2><MdInsights /> Financial Insights</h2>
            <p>AI-powered insights based on your spending patterns</p>
          </div>
          
          <div className="insights-grid">
            {/* Budget Alerts */}
            <div className="insight-card alert">
              <h4><MdWarning /> Budget Alerts</h4>
              <div className="alerts-list">
                {budgetAlerts.map(alert => (
                  <div key={alert.category} className={`alert-item ${alert.status}`}>
                    <div className="alert-category">{alert.category}</div>
                    <div className="alert-message">{alert.message}</div>
                    <div className="alert-percentage">{alert.percentage}%</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Savings Opportunity */}
            <div className="insight-card savings">
              <h4><MdSavings /> Savings Opportunity</h4>
              <p>You could save <strong>${(stats.totalSpent * 0.15).toLocaleString()}</strong> this month by:</p>
              <ul>
                <li>Reducing entertainment spending by 30%</li>
                <li>Using public transport 2 days/week</li>
                <li>Meal planning to reduce food waste</li>
              </ul>
            </div>
            
            {/* Recent Transactions */}
            <div className="insight-card recent">
              <h4>Recent Activity</h4>
              <div className="recent-transactions">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="recent-item">
                    <div className="recent-info">
                      <span className="recent-category">{transaction.category}</span>
                      <span className="recent-date">{transaction.displayDate}</span>
                    </div>
                    <div className={`recent-amount ${transaction.type}`}>
                      {transaction.amount >= 0 ? '+' : ''}{formatCurrencyDecimal(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Financial Health */}
            <div className="insight-card health">
              <h4><MdAccountBalance /> Financial Health</h4>
              <div className="health-score">
                <div className="score-circle">
                  <span className="score-value">78</span>
                  <span className="score-label">/100</span>
                </div>
                <div className="score-details">
                  <p><MdCheckCircle color="#10b981" /> Good spending control</p>
                  <p><MdCheckCircle color="#10b981" /> Multiple income streams</p>
                  <p><MdWarning color="#f59e0b" /> High entertainment spending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <div className="quick-nav">
        <button className="nav-card" onClick={() => navigate('/budget')}>
          <MdPieChart />
          <span>Budget Planning</span>
          <MdArrowForward />
        </button>
        
        <button className="nav-card" onClick={() => navigate('/add-expense')}>
          <MdAdd />
          <span>Add More Expenses</span>
          <MdArrowForward />
        </button>
      </div>
    </div>
  );
};

export default Expenses;