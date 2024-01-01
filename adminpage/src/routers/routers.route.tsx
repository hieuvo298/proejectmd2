import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import DashBoard from "../components/dashboard/dashboard";
import ProductManagement from "../components/products/products";
import UserManagement from "../components/users/users";
import Oders from "../components/oders/oders";
import Login from "../components/login/Login";
import PrivateRouter from "./private.router";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRouter />}>
          <Route
            path="/dashboard"
            element={<AdminLayout child={<DashBoard />} />}
          />

          <Route
            path="/products"
            element={<AdminLayout child={<ProductManagement />} />}
          />
          <Route
            path="/users"
            element={<AdminLayout child={<UserManagement />} />}
          />
          <Route path="/orders" element={<AdminLayout child={<Oders />} />} />
        </Route>

        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
};

export default Routers;
