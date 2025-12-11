import React from "react";
import { Form, Input, Button, message } from "antd";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const Signup = ({ onSuccess, setUser }) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Signup request
      const res = await api.post("/auth/signup", values);
      message.success("Account created!");

      // After signup, automatically login the user
      const loginRes = await api.post("/auth/login", {
        username: values.username,
        password: values.password,
      });

      const userData = loginRes.data.user;
      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("userId", userData.id);

      if (setUser) setUser(userData); // update app state

      if (onSuccess) onSuccess(); // close modal
      navigate("/categories"); // redirect after signup+login
    } catch (err) {
      message.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish} style={{ width: "100%" }}>
      <Form.Item
        name="email"
        label="Parent Email"
        rules={[{ required: true, message: "Please enter parent email!" }]}
      >
        <Input placeholder="Enter parent mail ID" size="large" />
      </Form.Item>

      <Form.Item
        name="username"
        label="Student Name"
        rules={[{ required: true, message: "Please enter the student name!" }]}
      >
        <Input placeholder="Enter student name" size="large" />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password placeholder="Password" size="large" />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
        block
        size="large"
        style={{ borderRadius: 8, marginTop: 10 }}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default Signup;
