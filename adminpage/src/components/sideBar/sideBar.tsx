// components/SideBar.tsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";

import "./sideBar.css";
import { Button } from "antd";

const SideBar: React.FC = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<string>("dashboard");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <aside className="sidebar">
        <ul>
          <li
            className={`list-item ${location.pathname === "/" ? "active" : ""}`}
            onClick={() => handleTabClick("dashboard")}
          >
            <Link className="sidebar-link" to="/dashboard">
              <MdDashboard />
              Dashboard
            </Link>
          </li>
          <li
            className={`list-item ${
              location.pathname === "/users" ? "active" : ""
            }`}
            onClick={() => handleTabClick("users")}
          >
            <Link className="sidebar-link" to="/users">
              <FaUserCog /> Users Management
            </Link>
          </li>
          <li
            className={`list-item ${
              location.pathname === "/products" ? "active" : ""
            }`}
            onClick={() => handleTabClick("products")}
          >
            <Link className="sidebar-link" to="/products">
              <CiBoxList />
              Products Management
            </Link>
          </li>
          <li
            className={`list-item ${
              location.pathname === "/orders" ? "active" : ""
            }`}
            onClick={() => handleTabClick("orders")}
          >
            <Link className="sidebar-link" to="/orders">
              {" "}
              <CiMoneyBill />
              Orders Management
            </Link>
          </li>
          <li>
            <div className="logout-btn">
            <Button type="text">Log out</Button>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
