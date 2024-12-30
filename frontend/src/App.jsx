import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import Layout from "./components/Layout";
import Sidebar from "./components/Sidebar";
import TaskBoard from "./components/TaskBoard";
import AddTask from "./components/AddTask";
import TaskStats from "./components/TaskStats";

import "./index.css"; 

function App() {
  return (
    <Router>
      <Routes>
        {/* Authentication Page */}
        <Route path="/" element={<AuthPage />} />

        {/* Dashboard Layout */}
         {/* Dashboard Routes Wrapped in Layout */}
         <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<TaskBoard />} />
          <Route path="add-task" element={<AddTask />} />
          <Route path="task-stats" element={<TaskStats />} /> 
  
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
