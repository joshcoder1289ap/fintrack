import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Expenses from './pages/Expenses';
import Budget from './pages/Budget';
import Success from './pages/Success';
import AddExpense from './pages/AddExpense';
import './styles/App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/budget" element={<Budget />} />
          <Route path="/success" element={<Success />} />
          <Route path="/add-expense" element={<AddExpense />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;