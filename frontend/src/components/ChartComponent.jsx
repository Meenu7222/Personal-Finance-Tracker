import React from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ChartComponent = ({ pieData, lineData }) => {
  if (!pieData || !pieData.datasets || !lineData || !lineData.datasets) {
    return <p>No chart data available</p>;
  }

  return (
    <div className="charts">
      <div className="pie-chart">
        <h4>Expenses by Category</h4>
        <Pie data={pieData} />
      </div>
      <div className="line-chart">
        <h4>Balance Over Time</h4>
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default ChartComponent;
