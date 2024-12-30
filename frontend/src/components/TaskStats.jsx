import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const TaskStats = ({ dynamicData }) => {
  const hardcodedData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Completed Tasks",
        data: [10, 15, 20, 25, 30, 35, 40],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "In Progress Tasks",
        data: [5, 8, 12, 15, 18, 20, 22],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Pending Tasks",
        data: [3, 5, 7, 10, 12, 15, 18],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
      },
    ],
  };

  const data = {
    labels: dynamicData?.labels || hardcodedData.labels,
    datasets: hardcodedData.datasets.map((dataset, index) => ({
      ...dataset,
      data: dynamicData?.datasets?.[index]?.data || dataset.data,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 18, 
          },
        },
      },
      tooltip: {
        bodyFont: {
          size: 16, 
        },
        titleFont: {
          size: 18, 
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Tasks",
          font: {
            size: 18, 
          },
        },
        ticks: {
          font: {
            size: 16, 
          },
        },
      },
      x: {
        title: {
          display: true,
          text: "Day of the Week",
          font: {
            size: 18, 
          },
        },
        ticks: {
          font: {
            size: 16, 
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "60%", 
        height: "950px", 
        marginLeft: "400px",
      }}
    >
      <h2 style={{ fontSize: "30px", textAlign: "center", marginBottom: "20px" }}>Weekly Task Completion Rates</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TaskStats;
