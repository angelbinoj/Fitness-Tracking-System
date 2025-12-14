import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const AdminProgressChart = ({
  labels = [],
  users = [],
  earnings = []
}) => {
  if (!labels.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 font-medium">
        No platform data available
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Users Joined",
        data: users,
        backgroundColor: "rgba(22, 163, 74, 0.7)",
        borderRadius: 6,
        barThickness: 26
      },
      {
        label: "Platform Earnings (₹)",
        data: earnings,
        backgroundColor: "rgba(37, 99, 235, 0.7)",
        borderRadius: 6,
        barThickness: 26
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    },
    scales: {
      x: {
        grid: { display: false },
        title: {
          display: true,
          text: "Month"
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.1)"
        },
        title: {
          display: true,
          text: "Value"
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default AdminProgressChart;
