import React, { useState, ChangeEvent, MouseEvent } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { notifyError, notifyWarning } from "../../common/toastify";
import UserService from "../../services/users.service";
import { ToastContainer } from "react-toastify";

export interface ILogin {
  id?: number;
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleLogin = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      notifyError("Please enter all fields");
    } else {
      try {
        const userService = new UserService();
        const response = await userService.login(loginData);

        if (response.data.user.role === 2) {
          notifyError("Not have access");
        } else {
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("idAdmin", response.data.user.id.toString());
          navigate("/dashboard", { state: response.data.user });
        }
      } catch (error) {
        console.error("Login error:", error);
        notifyError("An error occurred during login.");
      }
    }
  };

  return (
    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          value={loginData.email}
          onChange={handleChangeLogin}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={loginData.password}
          onChange={handleChangeLogin}
        />
        <button type="submit" onClick={handleLogin} className="login-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
