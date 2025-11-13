import React, { useEffect, useState } from 'react';
import '../styles/dashboard.css';
import TransactionList from '../components/TransactionList';
import ChartComponent from '../components/ChartComponent';
import transactionService from '../services/transactionService';
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  const [transactions, setTransactions] = useState([]); // Initialize as empty array
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  const [pieData, setPieData] = useState({});
  const [lineData, setLineData] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Starting to fetch dashboard data...");

      // ✅ 1. Fetch all transactions
      const txns = await transactionService.getTransactions();
      console.log("📊 Fetched transactions:", txns);
      
      // Ensure transactions is always an array
      if (Array.isArray(txns)) {
        setTransactions(txns);
      } else {
        console.warn("⚠️ Transactions is not an array:", txns);
        setTransactions([]);
      }

      // ✅ 2. Fetch analysis (totals + chart data)
      const analysis = await transactionService.getAnalysis("monthly");
      console.log("📈 Analysis data:", analysis);

      setTotals({
        income: analysis?.income || 0,
        expense: analysis?.expense || 0,
        balance: (analysis?.income || 0) - (analysis?.expense || 0),
      });

      // ✅ Pie chart (expenses by category)
      setPieData({
        labels: analysis?.categories ? Object.keys(analysis.categories) : [],
        datasets: [
          {
            data: analysis?.categories ? Object.values(analysis.categories) : [],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
          },
        ],
      });

      // ✅ Line chart (balance over time)
      setLineData({
        labels: analysis?.timeline ? analysis.timeline.map((item) => item.date) : [],
        datasets: [
          {
            label: "Balance",
            data: analysis?.timeline ? analysis.timeline.map((item) => item.balance) : [],
            borderColor: "blue",
            fill: false,
          },
        ],
      });

      console.log("✅ Dashboard data loaded successfully");
    } catch (err) {
      console.error("❌ Error fetching dashboard data:", err);
      setError(err.message);
      // Set safe defaults on error
      setTransactions([]);
      setTotals({ income: 0, expense: 0, balance: 0 });
      setPieData({});
      setLineData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="dashboard-content">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="dashboard-content">
          <div className="error">
            <h3>Error loading dashboard</h3>
            <p>{error}</p>
            <button onClick={fetchData}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* ✅ Navbar at the top */}
      <Navbar />

      <div className="dashboard-content">
        <h2>Welcome to your Dashboard</h2>

        {/* Overview Cards */}
        <div className="overview">
          <div className="card income">Income: ₹{totals.income}</div>
          <div className="card expense">Expense: ₹{totals.expense}</div>
          <div className="card balance">Balance: ₹{totals.balance}</div>
        </div>

        {/* Transaction List - Pass safe data */}
        <TransactionList transactions={transactions} />

        {/* Charts - Only render if we have data */}
        {(pieData.labels?.length > 0 || lineData.labels?.length > 0) && (
          <ChartComponent pieData={pieData} lineData={lineData} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;