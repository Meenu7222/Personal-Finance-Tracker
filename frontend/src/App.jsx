import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AddTransactionPage from './pages/AddtransactionPage';
import AnalysisPage from './pages/AnalysisPage';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={token ? <DashboardPage /> : <Navigate to="/login" />} />
        <Route path="/add" element={token ? <AddTransactionPage /> : <Navigate to="/login" />} />
        <Route path="/analysis" element={token ? <AnalysisPage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;