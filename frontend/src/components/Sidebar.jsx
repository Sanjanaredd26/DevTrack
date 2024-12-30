import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../store/store";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
    localStorage.removeItem("token");
    navigate("/");
  };

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
            <li>
            <span
              onClick={handleLogout}
              className="logout-link"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogout();
              }}
            >
              🚪 Logout
            </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  
  export default Sidebar;