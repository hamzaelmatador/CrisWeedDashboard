import Sidebar from "./Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Outlet } from "react-router-dom";

import "../styles/dashboardLayout.css";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />
      <div className="dashboard-content">
        <button
          className="menu-btn"
          onClick={() => {
            setSidebarOpen(!sidebarOpen);
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <button
          className={`sidebar-close-btn ${sidebarOpen ? "active" : ""}`}
          onClick={() => setSidebarOpen(false)}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
