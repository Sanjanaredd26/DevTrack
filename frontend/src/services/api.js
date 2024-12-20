import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // Backend Flask API URL
});

export const signIn = (data) => api.post("/auth/login", data);
export const signUp = (data) => api.post("/auth/register", data);
export const fetchTasks = async () => {
  const token = localStorage.getItem("token");
  return api.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = async (taskData) => {
  const token = localStorage.getItem("token");
  return api.post("/tasks", taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = async (taskId, taskData) => {
  const token = localStorage.getItem("token");
  return api.put(`/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  return api.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default api;
