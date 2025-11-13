import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">Finance Tracker</div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/add">Add</Link></li>
        <li><Link to="/analysis">Analysis</Link></li>
        <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;