import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks as fetchTasksApi, deleteTask as deleteTaskApi, updateTask as updateTaskApi } from "../services/api";
import TaskCard from "./TaskCard";
import UpdateTaskForm from "./UpdateTaskForm";
import { setTasks, deleteTask, updateTask } from "../store/store";

const TaskBoard = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [statusFilter, setStatusFilter] = useState("All");
    const [taskToEdit, setTaskToEdit] = useState(null); 
  
    const loadTasks = async () => {
      try {
        const { data } = await fetchTasksApi();
        dispatch(setTasks(data.data));
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };
  
    useEffect(() => {
      loadTasks();
    }, []);
    
    const handleDeleteTask = async (taskId) => {
      try {
        await deleteTaskApi(taskId);
        dispatch(deleteTask(taskId));
      } catch (err) {
        console.error("Failed to delete task:", err);
      }
    };
  
    const handleUpdateStatus = async (taskId, currentStatus) => {
      try {
        const newStatus = currentStatus === "Pending" || currentStatus === "In Progress" ? "Completed" : currentStatus;
        const updatedAt = newStatus === "Completed" ? new Date().toISOString() : null;
        const updatedData = { status: newStatus, completedAt: updatedAt };
  
        await updateTaskApi(taskId, updatedData);
        dispatch(updateTask({ id: taskId, ...updatedData }));
      } catch (err) {
        console.error("Failed to update task:", err);
      }
    };
  
    const handleEditTask = (task) => {
      setTaskToEdit(task);
    };
  
    const handleUpdateTask = async (taskId, updatedData) => {
      try {
        await updateTaskApi(taskId, updatedData);
        dispatch(updateTask({ id: taskId, ...updatedData }));
        setTaskToEdit(null);
      } catch (err) {
        console.error("Failed to update task:", err);
      }
    };
  
    const handleCancelEdit = () => {
      setTaskToEdit(null);
    };
  
    const groupTasksByStatus = (tasksToGroup) => {
      const grouped = {
        Completed: [],
        "In Progress": [],
        Pending: [],
      };
    
      tasksToGroup.forEach((task) => {
        if (!grouped[task.status]) {
          grouped[task.status] = []; 
        }
        grouped[task.status].push(task);
      });
    
      return grouped;
    };

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
            return null; 
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



