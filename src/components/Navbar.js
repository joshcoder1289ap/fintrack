import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdReceipt, MdPieChart, MdTrendingUp, MdAccountBalanceWallet } from 'react-icons/md';

const Navbar = () => {
  const navItems = [
    { path: '/', name: 'Dashboard', icon: <MdDashboard /> },
    { path: '/expenses', name: 'Expenses', icon: <MdReceipt /> },
    { path: '/budget', name: 'Budget', icon: <MdPieChart /> },
    { path: '/reports', name: 'Reports', icon: <MdTrendingUp /> },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          <MdAccountBalanceWallet className="nav-logo-icon" />
          <span>FinTrack</span>
        </NavLink>
        
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item.icon}
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;