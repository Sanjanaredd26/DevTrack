import React, { useState } from "react";
import { createTask } from "../services/api";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../store/store";

const AddTask = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending", 
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTask(formData);
      dispatch(addTask(data));
      setSuccessMessage("Task added successfully!");
      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      console.error("Failed to create task:", err);
    }
  };

  return (
    <div className="add-task-container">
      <h1 className="form-title">Add New Task</h1>
      {successMessage && <p className="success">{successMessage}</p>}
      <form className="add-task-form" onSubmit={handleSubmit}>
        {/* Task Title */}
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Task Description */}
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Task Description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-task-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
