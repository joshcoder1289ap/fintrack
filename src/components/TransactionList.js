import React, { useState } from 'react';
import { 
  MdHome, 
  MdDirectionsCar, 
  MdWork, 
  MdFastfood, 
  MdLaptop, 
  MdTrendingUp, 
  MdFlashOn, 
  MdLocalGasStation,
  MdAttractions,
  MdCardGiftcard,
  MdSearch,
  MdAdd,
  MdFilterList,
  MdDownload,
  MdReceipt,
  MdDelete,
  MdEdit,
  MdArrowDropDown,
  MdDateRange,
  MdCreditCard,
  MdAccountBalanceWallet,
  MdAttachMoney,
  MdSort
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const TransactionList = ({ transactions: propTransactions, onDeleteTransaction }) => {
  const navigate = useNavigate();
  
  // Data transaksi default
  const defaultTransactions = [
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
      icon: <MdLaptop />,
      description: 'Web development project',
      paymentMethod: 'PayPal',
      color: '#3b82f6'
    },
  ];

  const [transactions, setTransactions] = useState(propTransactions || defaultTransactions);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  // Kategori unik
  const categories = [...new Set(transactions.map(t => t.category))];

  // Filter dan sort transaksi
  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesFilter = filter === 'all' || transaction.type === filter;
      const matchesSearch = transaction.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(transaction.category);
      
      return matchesFilter && matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'asc' 
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'amount') {
        return sortOrder === 'asc' 
          ? Math.abs(a.amount) - Math.abs(b.amount)
          : Math.abs(b.amount) - Math.abs(a.amount);
      } else {
        return sortOrder === 'asc'
          ? a.category.localeCompare(b.category)
          : b.category.localeCompare(a.category);
      }
    });

  // Hitung total
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalBalance = totalIncome - totalExpense;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(Math.abs(amount));
  };

  // Handler untuk kategori selection
  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Handler untuk delete transaction
  const handleDelete = (id) => {
    if (onDeleteTransaction) {
      onDeleteTransaction(id);
    } else {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  return (
    <div className="transaction-list-component">
      {/* Header dengan controls */}
      <div className="transaction-list-header">
        <div className="header-left">
          <h3>
            <MdReceipt /> Transactions
            <span className="count-badge">{filteredTransactions.length}</span>
          </h3>
          <p>Manage and review all your financial transactions</p>
        </div>
        
        <div className="header-right">
          <button 
            className="btn-add"
            onClick={() => navigate('/add-expense')}
          >
            <MdAdd /> Add Transaction
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-bar">
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
        
        <div className="sort-controls">
          <select 
            className="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>
          <button 
            className="sort-order-btn"
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            <MdSort /> {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="categories-filter">
        <h4>Filter by Category:</h4>
        <div className="categories-list">
          {categories.map(category => (
            <button
              key={category}
              className={`category-chip ${selectedCategories.includes(category) ? 'active' : ''}`}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="transactions-container">
        {filteredTransactions.length > 0 ? (
          <>
            {filteredTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-main">
                  <div 
                    className="transaction-icon"
                    style={{ 
                      backgroundColor: `${transaction.color}20`,
                      color: transaction.color
                    }}
                  >
                    {transaction.icon}
                  </div>
                  
                  <div className="transaction-content">
                    <div className="transaction-header">
                      <h4 className="transaction-title">{transaction.category}</h4>
                      <div className={`transaction-amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </div>
                    </div>
                    
                    <p className="transaction-description">{transaction.description}</p>
                    
                    <div className="transaction-footer">
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
                    className="action-btn edit-btn"
                    onClick={() => navigate(`/edit-expense/${transaction.id}`)}
                    title="Edit transaction"
                  >
                    <MdEdit />
                  </button>
                  <button 
                    className="action-btn delete-btn"
                    onClick={() => handleDelete(transaction.id)}
                    title="Delete transaction"
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}
            
            {/* Summary */}
            <div className="transaction-summary">
              <div className="summary-card">
                <div className="summary-item">
                  <div className="summary-label">Total Income</div>
                  <div className="summary-value income">+{formatCurrency(totalIncome)}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Total Expenses</div>
                  <div className="summary-value expense">-{formatCurrency(totalExpense)}</div>
                </div>
                <div className="summary-item">
                  <div className="summary-label">Net Balance</div>
                  <div className={`summary-value ${totalBalance >= 0 ? 'income' : 'expense'}`}>
                    {totalBalance >= 0 ? '+' : ''}{formatCurrency(totalBalance)}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              <MdReceipt />
            </div>
            <h3>No transactions found</h3>
            <p>Try adjusting your filters or add a new transaction</p>
            <button 
              className="btn-add"
              onClick={() => navigate('/add-expense')}
            >
              <MdAdd /> Add Your First Transaction
            </button>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <MdAttachMoney />
          </div>
          <div className="stat-content">
            <div className="stat-value">{filteredTransactions.length}</div>
            <div className="stat-label">Transactions</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <MdTrendingUp />
          </div>
          <div className="stat-content">
            <div className="stat-value income">+{formatCurrency(totalIncome)}</div>
            <div className="stat-label">Total Income</div>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <MdTrendingDown />
          </div>
          <div className="stat-content">
            <div className="stat-value expense">-{formatCurrency(totalExpense)}</div>
            <div className="stat-label">Total Expenses</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;