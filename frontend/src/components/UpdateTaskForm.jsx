import React, { useState, useEffect } from "react";

const UpdateTaskForm = ({ task, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: task.status,
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "Pending",
      });
    }
  }, [task]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task.id, formData);
  };

  return (
    <div className="modal-content">
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="form-actions">
          <button type="submit" className="update-btn">Update</button>
          <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTaskForm;
