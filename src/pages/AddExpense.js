import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MdAttachMoney, 
  MdCategory, 
  MdCalendarToday, 
  MdCreditCard,
  MdReceipt,
  MdDescription,
  MdArrowBack,
  MdSave,
  MdAdd,
  MdFastfood,
  MdHome,
  MdFlashOn,
  MdLocalGasStation,
  MdWaterDrop,
  MdAttractions,
  MdDirectionsCar,
  MdShoppingBag,
  MdCheckCircle
} from 'react-icons/md';
import './AddExpense.css';

const AddExpense = () => {
  const navigate = useNavigate();
  
  // State untuk form
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'credit_card',
    notes: '',
    recurring: false,
    receipt: null
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Kategori expenses
  const categories = [
    {
      group: 'Housing',
      items: [
        { id: 'rent', name: 'Rent', icon: <MdHome />, color: '#4f46e5' },
        { id: 'electricity', name: 'Electricity Bill', icon: <MdFlashOn />, color: '#f59e0b' },
        { id: 'gas', name: 'Gas', icon: <MdLocalGasStation />, color: '#ef4444' },
        { id: 'water', name: 'Water Bill', icon: <MdWaterDrop />, color: '#3b82f6' }
      ]
    },
    {
      group: 'Daily Living',
      items: [
        { id: 'food', name: 'Food & Groceries', icon: <MdFastfood />, color: '#10b981' },
        { id: 'entertainment', name: 'Entertainment', icon: <MdAttractions />, color: '#8b5cf6' },
        { id: 'car', name: 'Car Payment', icon: <MdDirectionsCar />, color: '#64748b' },
        { id: 'shopping', name: 'Shopping', icon: <MdShoppingBag />, color: '#ec4899' }
      ]
    },
    {
      group: 'Other',
      items: [
        { id: 'transportation', name: 'Transportation', icon: <MdDirectionsCar />, color: '#6366f1' },
        { id: 'health', name: 'Health & Medical', icon: '🏥', color: '#ef4444' },
        { id: 'education', name: 'Education', icon: '📚', color: '#8b5cf6' },
        { id: 'other', name: 'Other', icon: '📦', color: '#64748b' }
      ]
    }
  ];

  // Metode pembayaran
  const paymentMethods = [
    { id: 'credit_card', name: 'Credit Card', icon: <MdCreditCard /> },
    { id: 'debit_card', name: 'Debit Card', icon: <MdCreditCard /> },
    { id: 'cash', name: 'Cash', icon: '💵' },
    { id: 'bank_transfer', name: 'Bank Transfer', icon: '🏦' },
    { id: 'ewallet', name: 'E-Wallet', icon: '📱' },
    { id: 'paypal', name: 'PayPal', icon: '💰' }
  ];

  // Handler untuk input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error jika ada
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Validasi form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!formData.date) {
      newErrors.date = 'Please select a date';
    }
    
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handler submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulasi API call
    try {
      // Simpan data ke localStorage atau state management
      const expenseData = {
        ...formData,
        id: Date.now(),
        amount: parseFloat(formData.amount),
        createdAt: new Date().toISOString()
      };
      
      // Simpan ke localStorage (simulasi)
      const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
      existingExpenses.push(expenseData);
      localStorage.setItem('expenses', JSON.stringify(existingExpenses));
      
      // Redirect ke success page setelah 1.5 detik (simulasi loading)
      setTimeout(() => {
        navigate('/success', { 
          state: { expenseData }
        });
      }, 1500);
      
    } catch (error) {
      console.error('Error adding expense:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to add expense. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format tanggal untuk display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Hitung total expenses bulan ini (simulasi)
  const monthlyTotal = 2700;
  const monthlyBudget = 4000;
  const percentageUsed = Math.round((monthlyTotal / monthlyBudget) * 100);

  return (
    <div className="add-expense-page">
      {/* Header */}
      <div className="add-expense-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <MdArrowBack /> Back
        </button>
        
        <div className="header-content">
          <h1>Add New Expense</h1>
          <p>Track your spending by adding expenses here</p>
        </div>
        
        <div className="budget-summary">
          <div className="budget-progress">
            <div className="budget-label">
              <span>Monthly Budget</span>
              <span>${monthlyTotal.toLocaleString()} / ${monthlyBudget.toLocaleString()}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${percentageUsed}%` }}
              ></div>
            </div>
            <div className="budget-percentage">{percentageUsed}% used</div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="add-expense-container">
        <form onSubmit={handleSubmit} className="expense-form">
          {/* Amount Input */}
          <div className="form-section">
            <div className="form-header">
              <MdAttachMoney className="section-icon" />
              <h3>Amount</h3>
            </div>
            <div className="amount-input-container">
              <span className="currency-symbol">$</span>
              <input
                type="number"
                className={`amount-input ${errors.amount ? 'error' : ''}`}
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                step="0.01"
                min="0"
              />
            </div>
            {errors.amount && <div className="error-message">{errors.amount}</div>}
            
            {/* Quick Amount Buttons */}
            <div className="quick-amounts">
              {[10, 20, 50, 100, 200].map(amount => (
                <button
                  key={amount}
                  type="button"
                  className="quick-amount-btn"
                  onClick={() => handleInputChange('amount', amount)}
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Category Selection */}
          <div className="form-section">
            <div className="form-header">
              <MdCategory className="section-icon" />
              <h3>Category</h3>
            </div>
            
            {errors.category && <div className="error-message">{errors.category}</div>}
            
            <div className="category-grid">
              {categories.map(group => (
                <div key={group.group} className="category-group">
                  <h4 className="group-title">{group.group}</h4>
                  <div className="category-items">
                    {group.items.map(category => (
                      <button
                        key={category.id}
                        type="button"
                        className={`category-btn ${formData.category === category.id ? 'selected' : ''}`}
                        onClick={() => handleInputChange('category', category.id)}
                        style={{
                          '--category-color': category.color
                        }}
                      >
                        <span className="category-icon">
                          {category.icon}
                        </span>
                        <span className="category-name">{category.name}</span>
                        {formData.category === category.id && (
                          <MdCheckCircle className="check-icon" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date and Payment Method */}
          <div className="form-row">
            <div className="form-section">
              <div className="form-header">
                <MdCalendarToday className="section-icon" />
                <h3>Date</h3>
              </div>
              <div className="date-input-container">
                <input
                  type="date"
                  className={`date-input ${errors.date ? 'error' : ''}`}
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
                <div className="date-display">
                  {formatDate(formData.date)}
                </div>
              </div>
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>

            <div className="form-section">
              <div className="form-header">
                <MdCreditCard className="section-icon" />
                <h3>Payment Method</h3>
              </div>
              <div className="payment-methods">
                {paymentMethods.map(method => (
                  <button
                    key={method.id}
                    type="button"
                    className={`payment-method-btn ${formData.paymentMethod === method.id ? 'selected' : ''}`}
                    onClick={() => handleInputChange('paymentMethod', method.id)}
                  >
                    <span className="method-icon">{method.icon}</span>
                    <span className="method-name">{method.name}</span>
                  </button>
                ))}
              </div>
              {errors.paymentMethod && <div className="error-message">{errors.paymentMethod}</div>}
            </div>
          </div>

          {/* Notes and Additional Options */}
          <div className="form-section">
            <div className="form-header">
              <MdDescription className="section-icon" />
              <h3>Notes (Optional)</h3>
            </div>
            <textarea
              className="notes-input"
              placeholder="Add any notes or description about this expense..."
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows="3"
            />
            
            {/* Additional Options */}
            <div className="additional-options">
              <label className="option-checkbox">
                <input
                  type="checkbox"
                  checked={formData.recurring}
                  onChange={(e) => handleInputChange('recurring', e.target.checked)}
                />
                <span className="checkmark"></span>
                <span className="option-label">Make this a recurring expense</span>
              </label>
              
              {formData.recurring && (
                <div className="recurring-options">
                  <select 
                    className="recurring-select"
                    defaultValue="monthly"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}
              
              <div className="receipt-upload">
                <button type="button" className="upload-receipt-btn">
                  <MdReceipt /> Upload Receipt
                </button>
                {formData.receipt && (
                  <span className="receipt-name">{formData.receipt.name}</span>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate('/expenses')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  Adding...
                </>
              ) : (
                <>
                  <MdSave /> Add Expense
                </>
              )}
            </button>
          </div>

          {errors.submit && <div className="error-message submit-error">{errors.submit}</div>}
        </form>

        {/* Preview Card */}
        <div className="expense-preview">
          <h3 className="preview-title">
            <MdReceipt /> Expense Preview
          </h3>
          
          <div className="preview-card">
            <div className="preview-header">
              <div className="preview-category">
                {formData.category ? (
                  <>
                    <span className="category-icon-preview">
                      {categories.flatMap(g => g.items).find(c => c.id === formData.category)?.icon}
                    </span>
                    <span className="category-name-preview">
                      {categories.flatMap(g => g.items).find(c => c.id === formData.category)?.name}
                    </span>
                  </>
                ) : (
                  <span className="no-category">No category selected</span>
                )}
              </div>
              <div className="preview-amount">
                {formData.amount ? (
                  <>-${parseFloat(formData.amount).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  })}</>
                ) : (
                  <span className="no-amount">$0.00</span>
                )}
              </div>
            </div>
            
            <div className="preview-details">
              <div className="preview-detail">
                <span className="detail-label">Date:</span>
                <span className="detail-value">{formatDate(formData.date)}</span>
              </div>
              
              <div className="preview-detail">
                <span className="detail-label">Payment:</span>
                <span className="detail-value">
                  {paymentMethods.find(m => m.id === formData.paymentMethod)?.name || 'Not selected'}
                </span>
              </div>
              
              {formData.notes && (
                <div className="preview-detail">
                  <span className="detail-label">Notes:</span>
                  <span className="detail-value notes">{formData.notes}</span>
                </div>
              )}
              
              {formData.recurring && (
                <div className="preview-detail">
                  <span className="detail-label recurring">Recurring:</span>
                  <span className="detail-value recurring">Monthly</span>
                </div>
              )}
            </div>
            
            <div className="preview-impact">
              <h4>Budget Impact</h4>
              <div className="impact-stats">
                <div className="impact-stat">
                  <span className="stat-label">New Monthly Total:</span>
                  <span className="stat-value">
                    ${(monthlyTotal + (parseFloat(formData.amount) || 0)).toLocaleString()}
                  </span>
                </div>
                <div className="impact-stat">
                  <span className="stat-label">New Budget Usage:</span>
                  <span className="stat-value">
                    {Math.round(((monthlyTotal + (parseFloat(formData.amount) || 0)) / monthlyBudget) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Expenses */}
          <div className="recent-expenses">
            <h4>Recent Expenses</h4>
            <div className="recent-list">
              {[
                { category: 'Food & Groceries', amount: 85.50, date: 'Today' },
                { category: 'Entertainment', amount: 45.00, date: 'Yesterday' },
                { category: 'Transportation', amount: 25.75, date: 'Nov 23' }
              ].map((expense, index) => (
                <div key={index} className="recent-item">
                  <div className="recent-category">{expense.category}</div>
                  <div className="recent-amount">-${expense.amount.toFixed(2)}</div>
                  <div className="recent-date">{expense.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;