import React, { useState } from "react";
import UpdateTaskForm from "./UpdateTaskForm";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TaskCard = ({ task, onDelete, onUpdateStatus, onEdit }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed":
        return "task-title completed";
      case "Pending":
        return "task-title pending";
      case "In Progress":
        return "task-title in-progress";
      default:
        return "task-title";
    }
  };


  return (
    <div className="task-card">
      <div className={getStatusClass(task.status)}>
        <h3 className="title-text">{task.title}</h3>
      </div>
      <p className="description">{task.description}</p>
      {/* Status Badge */}
      <div className={`status-badge ${task.status.toLowerCase().replace(" ", "-")}`}>
        {task.status.toUpperCase()}
      </div>

      <div className="task-actions">
         {/* Update Button */}
        <button onClick={() => onEdit(task)}><i className="fas fa-edit"></i></button>
        {/* Delete Button */}
        <button onClick={() => onDelete(task.id)}><i className="fas fa-trash-alt"></i></button>
        {/* Mark Completed Button */}
        <button onClick={() => onUpdateStatus(task.id, task.status)}>{task.status === "Completed" ? (<> <i className="fas fa-check-circle"></i></>) : (<><i className="fas fa-check"></i></>)}</button>
      </div>

      {showUpdateForm && (
        <UpdateTaskForm
          task={task}
          onClose={() => setShowUpdateForm(false)}
          onUpdateTask={onUpdateTask}
        />
      )}
    </div>
  );
};

export default TaskCard;
