import React from "react";
import { NavLink } from "react-router-dom";



const Sidebar = () => {
    return (
      <div className="sidebar">
        <h2>📋 Task Manager</h2>
        <nav>
          <ul>
            <li>
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                🗂 Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/add-task" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                ➕ Add New Tasks
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/task-stats" 
                className={({ isActive }) => isActive ? "active-link" : ""}
              >
                📊 Task Stats
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;