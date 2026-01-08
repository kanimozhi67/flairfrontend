// import React from "react";
// import { Form, Input, Button, message,Card, Typography } from "antd";
// import api from "../api/axiosClient";
// import { useNavigate } from "react-router-dom";

// const Login = ({ onSuccess, setUser }) => {
//   const navigate = useNavigate();
// const { Title } = Typography;
// const handlePassword=async(value)=>{
//   const {email,password}=value;
// try{
//   if(!email || !password){
//     message.error("please Enter all the fields")
//   }

// const res = await api.post("/auth/forgotPassword", value);
// }catch{
// message.error(err.response?.data?.message || " Failed to update password");
// }
// }
//   const onFinish = async (values) => {
//     try {
//       const res = await api.post("/auth/login", values);

//       const userData = res.data.user;

//       // Save token and userId in localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("userId", userData.id);
// localStorage.setItem("user", JSON.stringify({
//   ...userData,
//   model: "User"
// }));
//       // Set user in app state
//       if (setUser) setUser(userData);

//       message.success("Login successful");

//       if (onSuccess) onSuccess(); // close modal
//       navigate("/categories"); // redirect after login
//     } catch (err) {
//       message.error(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Card>
//     <Form
//       onFinish={onFinish}
//       layout="vertical"
//       style={{ width: "100%" }}
        
//     >
//       <Form.Item
//         name="username"
//         rules={[{ required: true, message: "Please enter your username" }]}
//         label="Username"
//       >
//         <Input size="large" placeholder="Enter your username" />
//       </Form.Item>

//       <Form.Item
//         name="password"
//         rules={[{ required: true, message: "Please enter your password" }]}
//         label="Password"
//       >
//         <Input.Password size="large" placeholder="Enter your password" />
//       </Form.Item>
// <button onClick={handlePassword} style={{border:0,textDecoration:"underline", color:"blueviolet"}}>Forgot password ?</button>
//       <Button
//         type="primary"
//         htmlType="submit"
//         block
//         size="large"
//         style={{ marginTop: 10, borderRadius: 8 }}
//       >
//         Login
//       </Button>
//     </Form>
//     </Card>
  
//   );
// };

// export default Login;
import React, { useState } from "react";
import { Form, Input, Button, message, Card, Typography, Modal } from "antd";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";

const Login = ({ onSuccess, setUser }) => {
  const navigate = useNavigate();
  const { Title } = Typography;

  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  /* ---------------- LOGIN ---------------- */
  const onFinish = async (values) => {
    try {
      const res = await api.post("/auth/login", values);
      const userData = res.data.user;

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", userData.id);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...userData, model: "User" })
      );

      if (setUser) setUser(userData);
      message.success("Login successful");

      if (onSuccess) onSuccess();
      navigate("/categories");
    } catch (err) {
      message.error(err.response?.data?.message || "Login failed");
    }
  };

  /* ---------------- FORGOT PASSWORD ---------------- */
  const handleForgotPassword = async (values) => {
    try {
      setForgotLoading(true);
      await api.post("/auth/forgotPassword", values);
      message.success("Password updated successfully");
      setForgotOpen(false);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
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
          type="link"
          onClick={() => setForgotOpen(true)}
          style={{ padding: 0, color: "blueviolet" ,textDecoration:"underline"}}
        >
          Forgot password?
        </Button>

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

      {/* ---------------- FORGOT PASSWORD MODAL ---------------- */}
      <Modal
        title="Reset Password"
        open={forgotOpen}
        onCancel={() => setForgotOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" onFinish={handleForgotPassword}>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Invalid email format" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: "Please enter a new password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={forgotLoading}
          >
            Update Password
          </Button>
        </Form>
      </Modal>
    </Card>
  );
};

export default Login;
