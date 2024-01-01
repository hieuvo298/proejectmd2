// components/Dashboard.tsx
import React from "react";
import "./dashboard.css";
import { FaRegUser } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Chart } from "react-google-charts";

const Dashboard: React.FC = () => {
  const data = [
    ["Year", "Sales", "Expenses", "Profit"],
    ["2014", 1000, 400, 200],
    ["2015", 1170, 460, 250],
    ["2016", 660, 1120, 300],
    ["2017", 1030, 540, 350],
  ];

  const options = {
    chart: {
      title: "Company Performance",
      subtitle: "Sales, Expenses, and Profit: 2014-2017",
    },
  };
  return (
    <section className="content active">
      <h1>Dashboard</h1>
      <hr />
      <div className="dashboard-content">
        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">1,504</div>
              <div className="cardName">Users</div>
            </div>
            <div className="iconBx">
              <Link to="/users">
                <FaRegUser className="dashboard-icon"/>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">80</div>
              <div className="cardName">Products</div>
            </div>
            <div className="iconBx">
              <Link to="/products">
                <IoCartOutline className="dashboard-icon"/>
              </Link>
            </div>
          </div>
          <div className="card">
            <div>
              <div className="numbers">$7,842</div>
              <div className="cardName">Revenue</div>
            </div>
            <div className="iconBx">
              <Link to="/orders">
                <FaRegMoneyBillAlt className="dashboard-icon"/>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Chart
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </section>
  );
};

export default Dashboard;
