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

const TrainerProgressChart = ({
  labels = [],
  earnings = [],
  clients = []
}) => {
  if (!labels.length) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 font-medium">
        No progress data available
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Earnings (₹)",
        data: earnings,
        backgroundColor: "rgba(37, 99, 235, 0.7)",
        borderRadius: 6,
        barThickness: 28
      },
      {
        label: "Clients Joined",
        data: clients,
        backgroundColor: "rgba(22, 163, 74, 0.7)",
        borderRadius: 6,
        barThickness: 28
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: 10
    },

    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 15,
          font: {
            size: 12,
            weight: "500"
          }
        }
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        padding: 10
      }
    },

    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: "#374151",
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: "Month",
          color: "#374151",
          font: {
            size: 13,
            weight: "600"
          }
        }
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
        ticks: {
          color: "#374151",
          font: {
            size: 12
          }
        },
        title: {
          display: true,
          text: "Value",
          color: "#374151",
          font: {
            size: 13,
            weight: "600"
          }
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

export default TrainerProgressChart;
