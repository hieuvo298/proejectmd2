import React, { useState, useEffect } from "react";
import "./profile.css";
import UserService from "../../services/user.service";
import { IUser } from "../../types/types";

const Profile = () => {
  const [user, setUser] = useState<IUser>({
    email: "",
    username: "",
    password: "",
    role: 1,
    status: true,
    phone: "",
    address: "",
    cart: [],
  });

  const userService = new UserService();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const idUser = localStorage.getItem("idUser");
        const userData:any = await userService.getUserById(Number(idUser));
        setUser(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userService]);

  return (
    <div>
      <nav className="nav-bar">
        <ul>
          <li>Profile</li>
          <li>Message</li>
          <li>Orders</li>
          <li>Favorites</li>
        </ul>
      </nav>
      <div className="profile-container">
        <div className="avatar-profile">
        </div>
        <div className="profile-information">
          <h3>{user.username}</h3>
          {user.createAt !== undefined && (
          <p>{`Nike Member Since ${new Date(user.createAt).toLocaleDateString()}`}</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
