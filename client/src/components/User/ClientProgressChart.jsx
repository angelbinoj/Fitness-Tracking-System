import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ClientProgressChart = ({ labels = [], actual = [], target = 0 }) => {

  // ✅ FIX: check length, not labels existence
  if (labels.length === 0 || actual.length === 0) {
    
    return (
      <div className="flex items-center justify-center h-full text-gray-500 font-medium">
        Start logging to see your progress
      </div>
    );
  }

  const data = {
    labels,
    datasets: [
      {
        label: "Calories Consumed",
        data: actual,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.15)",
        tension: 0.35,
        pointRadius: 8,
        pointHoverRadius: 10,
        borderWidth: 3
      },
      {
        label: "Target Calories",
        data: labels.map(() => target),
        borderColor: "#dc2626",
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { top: 10, bottom: 10, left: 10, right: 10 }
    },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          boxWidth: 10,
          padding: 15,
          font: { size: 12, weight: "500" }
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
        offset: true,
        grid: { display: false },
        ticks: {
          color: "#374151",
          padding: 6,
          font: { size: 12 }
        },
        title: {
          display: true,
          text: "Date",
          color: "#374151",
          padding: { top: 4 },
          font: { size: 13, weight: "600" }
        }
      },
      y: {
        beginAtZero: true,
        grid: { color: "#e5a7ff" },
        ticks: {
          color: "#374151",
          padding: 6,
          font: { size: 12 }
        },
        title: {
          display: true,
          text: "Calories",
          color: "#374151",
          padding: { bottom: 6 },
          font: { size: 13, weight: "600" }
        }
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Line data={data} options={options} />
    </div>
  );
};

export default ClientProgressChart;
