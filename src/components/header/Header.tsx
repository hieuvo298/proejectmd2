// Header.tsx
import React, { useEffect, useState } from "react";
import "./Header.css";
import { CiSearch } from "react-icons/ci";
import { IoBagOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import UserService from "../../services/user.service";
import { IUser } from "../../types/types";
import { useDispatch, useSelector } from "react-redux";
import { FiUser } from "react-icons/fi";
import { update } from "../../store/reducer/update";

const Header: React.FC = () => {
  const [isFixed, setIsFixed] = useState(false);
  const location = useLocation();
  const userService = new UserService();
  const idUser = localStorage.getItem("idUser") as string;
  const [user, setUser] = useState<IUser | null>(null);
  const status = useSelector((state: any) => state.update);
  const [count, setCount] = useState<number>(0);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const getUser = async () => {
      if (idUser) {
        const data: any = await userService.getUserById(Number(idUser));
        setUser(data.data);
        setCount(data.data.cart.length);
        dispatch(update());
      }
    };
    getUser();
  }, [idUser, status, count]);

  const handleLogout = () => {
    localStorage.removeItem("idUser");
    setUser(null);
    dispatch(update());
  };
  return (
    <header>
      <div className="header-logo-1">
        <figure>
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/myproject-12c2b.appspot.com/o/asset%2FJumpman_logo.svg.png?alt=media&token=a8e340c6-5d48-4e90-81fb-0853ffe5e164"
              alt="anh"
            />
          </Link>
        </figure>
        <div className="header-info">
          {user ? (
            <>
              <div className="">
                <Link className="profile-name" to="/profile">
                  Hi {user?.username} <FiUser className="profile-icon" />
                </Link>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <span id="register">
                <Link to="/register">Join us</Link>
              </span>
              <span id="login">
                <Link to="/login">Login</Link>
              </span>
            </>
          )}
        </div>
      </div>
      <section className={`header-2 ${isFixed ? "fixed" : ""}`}>
        <div className="header-logo">
          <Link to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/myproject-12c2b.appspot.com/o/asset%2Fnikelogo.png?alt=media&token=4ca95c7e-ba46-4bec-98aa-b143731bfcc6 "
              alt="anh"
            />
          </Link>
        </div>
        <nav className="header-page">
          <ul>
            <li className={location.pathname === "/product" ? "selected" : ""}>
              <Link to="/product">All Shoes</Link>
            </li>
            <li className={location.pathname === "/jordan" ? "selected" : ""}>
              <Link to="/product">Jordan</Link>
            </li>
            <li className={location.pathname === "/running" ? "selected" : ""}>
              <Link to="/running">Running</Link>
            </li>
            <li
              className={location.pathname === "/lifestyle" ? "selected" : ""}
            >
              <Link to="/lifestyle">Life style</Link>
            </li>
          </ul>
        </nav>
        <div className="header-logo-right">
          <div className="header-right">
            <div className="search-box">
              <input id="search-input" type="text" placeholder="Search" value={search}  />
              <button type="submit" className="search-btn">
                <CiSearch className="search" />
              </button>
            </div>
            <button>
              <Link to="/favourites">
                <CiHeart className="favorite-products" />
              </Link>
            </button>
            <div className="cart-group">
              <button>
                <Link to="/cart">
                  <IoBagOutline className="shopping-cart" />
                </Link>
                <span className="cart-quantity">{count}</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
