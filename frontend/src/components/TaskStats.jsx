import React, { useEffect, useState } from "react";
import { fetchTasks } from "../services/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskStats = () => {
  const [chartData, setChartData] = useState(null);

  const loadTaskStats = async () => {
    try {
      const { data } = await fetchTasks();
      const tasks = data.data;

      console.log("Fetched Tasks:", tasks); // Debugging API Response

      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const groupedData = tasks.reduce((acc, task) => {
        const date = new Date(task.completedAt || task.createdAt);
        if (isNaN(date)) {
          console.error("Invalid date for task:", task); // Debug invalid dates
          return acc;
        }
        const day = daysOfWeek[date.getDay()];
        if (!acc[day]) {
          acc[day] = { Completed: 0, Pending: 0, "In Progress": 0 };
        }
        acc[day][task.status] += 1;
        return acc;
      }, {});

      console.log("Grouped Data:", groupedData); // Debug grouped data

      const labels = daysOfWeek;
      const completedData = labels.map((day) => groupedData[day]?.Completed || 0);
      const pendingData = labels.map((day) => groupedData[day]?.Pending || 0);
      const inProgressData = labels.map((day) => groupedData[day]?.["In Progress"] || 0);

      console.log("Completed Data:", completedData); // Debug chart data
      console.log("Pending Data:", pendingData);
      console.log("In Progress Data:", inProgressData);

      setChartData({
        labels,
        datasets: [
          {
            label: "Completed",
            data: completedData,
            backgroundColor: "rgba(75, 192, 192, 0.7)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Pending",
            data: pendingData,
            backgroundColor: "rgba(255, 159, 64, 0.7)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
          {
            label: "In Progress",
            data: inProgressData,
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      });
    } catch (err) {
      console.error("Error loading task stats:", err);
    }
  };

  useEffect(() => {
    loadTaskStats();
  }, []);

  return (
    <div className="task-stats-container">
      <h1>Task Completion Stats</h1>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Task Completion Rates by Day of the Week",
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Day of the Week",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Number of Tasks",
                },
                beginAtZero: true,
              },
            },
          }}
        />
      ) : (
        <p>Loading task stats...</p>
      )}
    </div>
  );
};

export default TaskStats;
