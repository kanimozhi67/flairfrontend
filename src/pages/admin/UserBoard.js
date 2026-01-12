import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Spin,
  Empty,
  Input,
  Button,
  Modal,
  Form,
  message,
  Space,
  Popconfirm,
} from "antd";
import api from "../../api/axiosClient";

const UserBoard = () => {
  const [allUser, setAllUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form] = Form.useForm();

  /* ============================
      FETCH USERS (NORMALIZED)
     ============================ */
  const fetchAllUser = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/getalluser");

      // 🔥 Normalize userId → _id
      const normalized = res.data.map((u) => ({
        ...u,
        _id: u._id || u.userId,
      }));

      setAllUser(normalized);
      setFilteredUser(normalized);
    } catch (err) {
      console.error(err);
      message.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUser();
  }, []);

  /* ============================
      SEARCH
     ============================ */
  const handleSearch = (value) => {
    if (!value) {
      setFilteredUser(allUser);
      return;
    }

    const filtered = allUser.filter(
      (user) =>
        user.username?.toLowerCase().includes(value.toLowerCase()) ||
        user.email?.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredUser(filtered);
  };

  /* ============================
      EDIT
     ============================ */
  const handleEdit = (record) => {
    setEditingUser(record);
    form.setFieldsValue({
      username: record.username,
      email: record.email,
      level: record.level,
      sticker: record.sticker,
      score: record.points, // show current score
    });
    setIsEditOpen(true);
  };

  /* ============================
      UPDATE USER + SCORE
     ============================ */
  const handleUpdate = async () => {
    if (!editingUser?._id) {
      message.error("Invalid user selected");
      return;
    }

    try {
      setUpdating(true);
      const values = await form.validateFields();

      // 1️⃣ Update user info
      await api.put(`/admin/updateuser/${editingUser._id}`, {
        username: values.username,
        email: values.email,
        level: values.level,
        sticker: values.sticker,
      });

      // 2️⃣ Update score (add)
      if (values.score !== undefined && values.score !== "") {
        await api.put(`/admin/updatescore/${editingUser._id}`, {
          score: Number(values.score),
        });
      }

      message.success("User updated successfully");
      setIsEditOpen(false);
      form.resetFields();
      fetchAllUser();
    } catch (err) {
      console.error(err);
      message.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  /* ============================
      DELETE
     ============================ */
  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/deleteuser/${id}`);
      message.success("User deleted");
      fetchAllUser();
    } catch (err) {
      message.error("Delete failed");
    }
  };

  /* ============================
      TABLE COLUMNS
     ============================ */
  const studentColumns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Stickers",
      key: "sticker",
      render: (_, record) => (
        <Button type="link">
          🎖️ {record.sticker?.length || 0}
        </Button>
      ),
    },
    {
      title: "Score",
      dataIndex: "points",
      key: "points",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger type="link">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /* ============================
      RENDER
     ============================ */
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input.Search
            placeholder="Search by username or email"
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
            style={{ marginBottom: 16, maxWidth: 300 }}
          />

          <div style={{ marginBottom: 16 }}>
            Total Users:{" "}
            <span style={{ color: "red" }}>{allUser.length}</span>
          </div>

          {loading ? (
            <Spin />
          ) : filteredUser.length === 0 ? (
            <Empty description="No users found" />
          ) : (
            <Table
              columns={studentColumns}
              dataSource={filteredUser}
              rowKey="_id"
              pagination={{ pageSize: 10 }}
            />
          )}
        </Col>
      </Row>

      {/* ============================
          EDIT MODAL
         ============================ */}
      <Modal
        title="Edit User"
        open={isEditOpen}
        onOk={handleUpdate}
        confirmLoading={updating}
        onCancel={() => {
          setIsEditOpen(false);
          form.resetFields();
        }}
        okText="Update"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Stickers" name="sticker">
            <Input />
          </Form.Item>

          <Form.Item label="Level" name="level">
            <Input />
          </Form.Item>

          <Form.Item label="Score" name="score">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserBoard;
