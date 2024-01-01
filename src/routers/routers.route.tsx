import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../components/register/register";
import Login from "../components/login/login";
import PrivateRouter from "./private.router";
import DefaultLayout from "../layouts/defaultLayout";
import Home from "../components/home/home";
import Cart from "../components/cart/cart";
import Checkout from "../components/checkout/checkout";
import History from "../components/history/history";
import Product from "../components/product/product";
import ProductDetail from "../components/productDetail/productDetail";
import Profile from "../components/profile/profile";
import Favourites from "../components/favorites/favourites";

const Routers = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<DefaultLayout child={<Home />} />} />
        <Route
          path="/product"
          element={<DefaultLayout child={<Product />} />}
        />
        <Route
          path="/productdetail/:id"
          element={<DefaultLayout child={<ProductDetail />} />}
        />
        <Route path="/login" element={<DefaultLayout child={<Login />} />} />
        <Route
          path="/register"
          element={<DefaultLayout child={<Register />} />}
        />
        <Route element={<PrivateRouter />}>
          <Route path="/cart" element={<DefaultLayout child={<Cart />} />} />
          <Route
            path="/checkout"
            element={<DefaultLayout child={<Checkout />} />}
          />
          <Route path="/histories" element={<DefaultLayout child={<History />} />} />
          <Route path="/profile" element={<DefaultLayout child={<Profile></Profile>} />} />
          <Route path="/favourites" element={<DefaultLayout child={<Favourites />} />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </div>
  );
};

export default Routers;
