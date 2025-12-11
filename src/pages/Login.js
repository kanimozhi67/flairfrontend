import React from "react";
import { Form, Input, Button, message,Card, Typography } from "antd";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const Login = ({ onSuccess, setUser }) => {
  const navigate = useNavigate();
const { Title } = Typography;
  const onFinish = async (values) => {
    try {
      const res = await api.post("/auth/login", values);

      const userData = res.data.user;

      // Save token and userId in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", userData.id);

      // Set user in app state
      if (setUser) setUser(userData);

      message.success("Login successful");

      if (onSuccess) onSuccess(); // close modal
      navigate("/categories"); // redirect after login
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Card>
    <Form
      onFinish={onFinish}
      layout="vertical"
      style={{ width: "100%" }}
        
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please enter your username" }]}
        label="Username"
      >
        <Input size="large" placeholder="Enter your username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
        label="Password"
      >
        <Input.Password size="large" placeholder="Enter your password" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        style={{ marginTop: 10, borderRadius: 8 }}
      >
        Login
      </Button>
    </Form>
    </Card>
    //  <div
    //   style={{
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     minHeight: "100vh",
    //     background: "#f0f2f5",
    //     padding: 20,
    //   }}
    // >
    //   <Card
    //     style={{
    //       width: 400,
    //       borderRadius: 12,
    //       boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    //     }}
    //   >
    //     <Title level={3} style={{ textAlign: "center", marginBottom: 30 }}>
    //       Login
    //     </Title>

    //     <Form
    //       onFinish={onFinish}
    //       layout="vertical"
    //       style={{ width: "100%" }}
    //     >
    //       <Form.Item
    //         name="username"
    //         label="Username"
    //         rules={[{ required: true, message: "Please enter your username" }]}
    //       >
    //         <Input size="large" placeholder="Enter your username" />
    //       </Form.Item>

    //       <Form.Item
    //         name="password"
    //         label="Password"
    //         rules={[{ required: true, message: "Please enter your password" }]}
    //       >
    //         <Input.Password size="large" placeholder="Enter your password" />
    //       </Form.Item>

    //       <Form.Item>
    //         <Button
    //           type="primary"
    //           htmlType="submit"
    //           block
    //           size="large"
    //           style={{
    //             marginTop: 10,
    //             borderRadius: 8,
    //             background: "#1890ff",
    //             borderColor: "#1890ff",
    //           }}
    //         >
    //           Login
    //         </Button>
    //       </Form.Item>
    //     </Form>
    //   </Card>
    // </div>
  );
};

export default Login;
