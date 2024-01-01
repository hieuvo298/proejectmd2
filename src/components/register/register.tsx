import React, { useState } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import { notifyError } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { IUser } from "../../types/types";

const Register = () => {
  const [registerData, setRegisterData] = useState<IUser>({
    username: "",
    email: "",
    password: "",
    role: 1,
    status: true,
    phone: "",
    address: "",
    confirm: "",
    cart:[],

  });
  const { confirm, ...formData } = registerData;
  const navigate = useNavigate();
  const confirmPassword = () => {
    return registerData.password === registerData.confirm;
  };
  const handleChangeFormData = (e: any) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e: any) => {
    e.preventDefault();
    if (
      registerData.username === "" ||
      registerData.email === "" ||
      registerData.password === "" ||
      registerData.confirm === ""
    ) {
      notifyError("Please fill in the form");
    } else if (!confirmPassword()) {
      notifyError("Passwords do not match");
    } else {
      try {
        const userService = new UserService();
        const response = await userService.register(formData);
        if (response.status === 201) {
          navigate("/login", { state: true });
        }
      } catch (error: any) {
        notifyError(error.response.data);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <ToastContainer />
        <h1>Register</h1>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          required
          value={registerData.username}
          onChange={handleChangeFormData}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email address"
          required
          value={registerData.email}
          onChange={handleChangeFormData}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
          value={registerData.password}
          onChange={handleChangeFormData}
        />
        <label htmlFor="confirm-password">Confirm Password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirm"
          placeholder="Enter your confirm password"
          onChange={handleChangeFormData}
        />
        <button className="black-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
