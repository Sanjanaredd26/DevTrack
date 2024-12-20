import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask, updateTask } from "../services/api";
import TaskCard from "./TaskCard";
import UpdateTaskForm from "./UpdateTaskForm";


const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const [statusFilter, setStatusFilter] = useState("All");
    const [taskToEdit, setTaskToEdit] = useState(null); // State for the task to be edited
  
    const loadTasks = async () => {
      try {
        const { data } = await fetchTasks();
        setTasks(data.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
  
    useEffect(() => {
      loadTasks();
    }, []);
  
    const handleDeleteTask = async (taskId) => {
      await deleteTask(taskId);
      loadTasks();
    };
  
    const handleUpdateStatus = async (taskId, currentStatus) => {
      const newStatus =
        currentStatus === "Pending" || currentStatus === "In Progress"
          ? "Completed"
          : currentStatus;
        
      const updatedAt = newStatus === "Completed" ? new Date().toISOString() : null;
  
      await updateTask(taskId, { status: newStatus });
      loadTasks();
    };
  
    const handleUpdateTask = async (taskId, updatedData) => {
      await updateTask(taskId, updatedData);
      setTaskToEdit(null); // Close update form
      loadTasks();
    };
  
    const handleEditTask = (task) => {
      setTaskToEdit(task); // Set the task to be edited
    };
  
    const handleCancelEdit = () => {
      setTaskToEdit(null); // Close the update form
    };
  
    const groupTasksByStatus = (tasksToGroup) => {
        const grouped = {
          Completed: [],
          "In Progress": [],
          Pending: [],
        };
        tasksToGroup.forEach((task) => {
          grouped[task.status].push(task);
        });
        return grouped;
      };

    // Filter tasks based on status
    const filteredTasks =
      statusFilter === "All"
        ? tasks
        : tasks.filter((task) => task.status === statusFilter);
    
    const groupedTasks = groupTasksByStatus(filteredTasks);
    
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "Completed").length;
    const pendingTasks = tasks.filter((task) => task.status === "Pending").length;
    const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;

  
    return (
      <div className="task-board">
        <h1>Task Board</h1>

        {/* Progress Bar with Task Statistics */}
        <div className="taskstats">
          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill completed"
                style={{
                width: `${(completedTasks / totalTasks) * 100 || 0}%`,
                }}
              ></div>
              <div
                className="progress-fill in-progress"
                style={{
                width: `${(inProgressTasks / totalTasks) * 100 || 0}%`,
               }}
              ></div>
              <div
                className="progress-fill pending"
                style={{
                width: `${(pendingTasks / totalTasks) * 100 || 0}%`,
               }}
              ></div>
            </div>
            <div className="task-counts">
              <span>Total: {totalTasks}</span>
              <span>Completed: {completedTasks}</span>
              <span>In Progress: {inProgressTasks}</span>
              <span>Pending: {pendingTasks}</span>
            </div>
        </div>
      </div>
  
        {/* Status Filter */}
        <div className="filter-section">
          <label>
            <strong>Filter:</strong>
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>


  
        {/* Grouped Tasks */}
        <div className="task-group-container">
           {Object.keys(groupedTasks).map((status) => {
             if (groupedTasks[status].length > 0) {
               return (
                 <div key={status} className="task-group">
                    <h2 className="status-header">{status}</h2>
                    <div className="task-list">
                      {groupedTasks[status].map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          onDelete={handleDeleteTask}
                          onUpdateStatus={handleUpdateStatus}
                          onEdit={handleEditTask}
                        />
                      ))}
                    </div>
                 </div>
               );
            }
            return null; // Do not render the group if there are no tasks
          })}
        </div>

        {/* Update Task Form Overlay */}
        {taskToEdit && (
          <div className="modal-overlay">
            <UpdateTaskForm
              task={taskToEdit}
              onUpdate={handleUpdateTask}
              onCancel={handleCancelEdit}
            />
          </div>
        )}
      </div>
    );
  };
  
export default TaskBoard;



