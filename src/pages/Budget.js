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
import './Budget.css'

export default function FinTrack() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-300 to-purple-600 p-4 text-gray-800 font-sans">
      {/* Header */}
      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-4 shadow-md">
        <h1 className="text-3xl font-bold">FinTrack</h1>
        <p className="mt-1 text-lg">Hello, User! 👋</p>
        <p className="text-sm">Your financial overview</p>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="bg-white/70 backdrop-blur-md p-3 rounded-2xl shadow-md text-center">
          <p className="text-sm">Total Income</p>
          <p className="text-xl font-bold">$7,200</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md p-3 rounded-2xl shadow-md text-center">
          <p className="text-sm">Total Expenses</p>
          <p className="text-xl font-bold">$6,700</p>
        </div>
        <div className="bg-white/70 backdrop-blur-md p-3 rounded-2xl shadow-md text-center">
          <p className="text-sm">Savings</p>
          <p className="text-xl font-bold">$4,100</p>
        </div>
      </div>

      {/* Spending Breakdown */}
      <div className="bg-white/80 backdrop-blur-md mt-6 p-4 rounded-3xl shadow-md">
        <h2 className="font-semibold text-lg mb-3">Spending Breakdown</h2>
        <div className="flex items-center">
          <div className="text-sm">
            <p className="text-purple-600">Food & Groceries — 20%</p>
            <p className="text-blue-600">Rent — 30%</p>
            <p className="text-green-600">Transportation — 30%</p>
            <p className="text-yellow-500">Entertainment — 10%</p>
            <p className="text-red-500">Others — 10%</p>
          </div>
        </div>
      </div>

      {/* Goals */}
      <div className="bg-white/80 backdrop-blur-md mt-6 p-4 rounded-3xl shadow-md">
        <h2 className="font-semibold text-lg">Goals</h2>
        <input
          className="w-full p-3 mt-3 rounded-2xl shadow-inner border border-gray-300"
          placeholder="Enter your goal..."
        />
        <button className="mt-3 w-full bg-purple-500 text-white py-2 rounded-2xl shadow-md active:scale-95">
          Input Goal
        </button>
      </div>
    </div>
  );
}