// pages/SchoolTeacherLoginPage.jsx
import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Button, message, Card, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosClient";
//import { schooladminlogin } from "../api/auth" ;

const { Option } = Select;

const SchoolAdminLogin = ({ setUser, onSuccess }) => {
 const { schooladminlogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await api.get("/admin/schools");
        setSchools(res.data);
      } catch (err) {
        message.error("Failed to load schools");
      } finally {
        setSchoolsLoading(false);
      }
    };
    fetchSchools();
  }, []);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await schooladminlogin(values);

    //  if (!res?.token || !res?.admin) {
    //     message.error(res?.message || "Login failed");
    //     return;
    //   }
localStorage.setItem("token", res.token);
      // Save token & teacher in localStorage
    localStorage.setItem("user", JSON.stringify(res.admin));
setUser(res.admin);

    

      message.success("Login successful");
      onSuccess?.();
      navigate("/categories");
    } catch (err) {
      console.error("Login error:", err);
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="schoolId"
          label="School"
          rules={[{ required: true, message: "Please select your school" }]}
        >
          <Select placeholder="Select School" loading={schoolsLoading}>
            {schools.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please enter email" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" block size="large" loading={loading}>
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default SchoolAdminLogin;
