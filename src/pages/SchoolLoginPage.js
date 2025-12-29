import React, { useState, useContext } from "react";
import { Form, Input, Button, message, Card, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axiosClient";

const { Option } = Select;

const SchoolLoginPage = ({ setUser, onSuccess }) => {
  const { studentlogin } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [schoolsLoading, setSchoolsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch schools
  React.useEffect(() => {
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
      const res = await studentlogin(values); // must return { token, user }

      if (!res?.token || !res?.user) {
        message.error(res?.message || "Login failed");
        return;
      }

      // Save token & user
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));

      if (!setUser || typeof setUser !== "function") {
        message.error("Internal error: cannot update user state");
        return;
      }

      setUser(res.user); // ✅ update global user state
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
          name="rollNo"
          label="Roll No"
          rules={[{ required: true, message: "Please enter roll number" }]}
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

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={loading}
        >
          Login
        </Button>
      </Form>
    </Card>
  );
};

export default SchoolLoginPage;
