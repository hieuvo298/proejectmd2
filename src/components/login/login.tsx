import React, { useEffect, useState } from "react";
import "./login.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { notifyError, notifySucces } from "../../common/toastify";
import { handleLogin } from "../../store/reducer/user";
import { useDispatch } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
export interface Login {
  email: string;
  password: string;
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.state === true) {
      notifySucces("Register Success");
    }
  }, [location]);
  const [loginData, setLoginData] = useState<Login>({
    email: "",
    password: "",
  });
  const handleChangeFormData = (e: any) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

  };
  const handleLoginForm = async (e: any) => {
    e.preventDefault();
    if (loginData.email === "" || loginData.password === "") {
      notifyError("Please enter all fields");
      console.log(loginData);
    }else {
      const response = await dispatch(handleLogin(loginData) as any).unwrap();
      if(response.response?.status === 400){
        notifyError(response.response.data)
      }
      if (response?.status === 201 || response?.status === 200) {
        navigate("/", {state:true});
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <Form
        name="login"
        className="login-form"
        initialValues={{ remember: true }}
        autoComplete="off"  
      >
        <h1>Login</h1>
        <Form.Item
          name="email"
          id="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChangeFormData}
          />
        </Form.Item>
        <Form.Item
          name="password"
          id="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            name="password"
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChangeFormData}
          />
        </Form.Item>
        <Form.Item>
          <button className="black-button"  onClick={handleLoginForm}>
            Log in
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
