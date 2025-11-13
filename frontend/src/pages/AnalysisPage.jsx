import React, { useState } from 'react';
import '../styles/analysis.css';
import ChartComponent from '../components/ChartComponent';
import transactionService from '../services/transactionService';
import Navbar from '../components/Navbar';   // ✅ Import Navbar

const AnalysisPage = () => {
  const [period, setPeriod] = useState('month');
  const [pieData, setPieData] = useState({});
  const [lineData, setLineData] = useState({});

  const handleChange = async (e) => {
    const selected = e.target.value;
    setPeriod(selected);
    const token = localStorage.getItem('token');
    const res = await transactionService.getAnalytics(selected, token);
    setPieData(res.pieData);
    setLineData(res.lineData);
  };

  return (
    <div className="analysis-page">
      {/* ✅ Navbar at the top */}
      <Navbar />

      <div className="analysis-content">
        <h2>Financial Analysis</h2>

        {/* Select Dropdown */}
        <select value={period} onChange={handleChange}>
          <option value="day">Today</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>

        {/* Charts */}
        <ChartComponent pieData={pieData} lineData={lineData} />
      </div>
    </div>
  );
};

export default AnalysisPage;
