import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Empty, Table, Button, Modal, Input, message } from "antd";
import api from "../../api/axiosClient";

const SchoolBoard = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSchool, setNewSchool] = useState("");
  const [teacherModal, setTeacherModal] = useState({ visible: false, schoolId: null, username: "", email: "" });

  const fetchSchools = async () => {
    try {
      const res = await api.get("/admin/schools");
      setSchools(res.data);
    } catch (err) {
      message.error("Failed to fetch schools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  const handleAddSchool = async () => {
    if (!newSchool) return;
    try {
      await api.post("/admin/school", { name: newSchool });
      message.success("School added!");
      setNewSchool("");
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to add school");
    }
  };

  const handleDeleteSchool = async (id) => {
    try {
      await api.delete(`/admin/school/${id}`);
      message.success("School deleted!");
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete school");
    }
  };

  const handleAddTeacher = async () => {
    const { schoolId, username, email } = teacherModal;
    if (!username || !email) return;

    try {
      await api.post("/admin/teacher", { schoolId, username, email, password: "default123" });
      message.success("Teacher added!");
      setTeacherModal({ visible: false, schoolId: null, username: "", email: "" });
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to add teacher");
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    try {
      await api.delete(`/admin/teacher/${teacherId}`);
      message.success("Teacher deleted!");
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete teacher");
    }
  };

  if (loading) return <Spin size="large" />;
  if (!schools.length) return <Empty description="No schools found" />;

  return (
    <div> SchoolBoard
      <div style={{ marginBottom: 16 }}>
        <Input
          placeholder="New School Name"
          value={newSchool}
          onChange={(e) => setNewSchool(e.target.value)}
          style={{ width: 300, marginRight: 8 }}
        />
        <Button type="primary" onClick={handleAddSchool}>Add School</Button>
      </div>

      <Row gutter={[16, 16]}>
        {schools.map((school) => (
          <Col xs={24} md={12} key={school._id}>
            <Card
              title={school.name}
              extra={<Button danger onClick={() => handleDeleteSchool(school._id)}>Delete</Button>}
              style={{ marginBottom: 16 }}
            >
              <Button
                type="dashed"
                style={{ marginBottom: 8 }}
                onClick={() => setTeacherModal({ ...teacherModal, visible: true, schoolId: school._id })}
              >
                Add Teacher
              </Button>

              <Table
                dataSource={school.teachers}
                columns={[
                  { title: "Username", dataIndex: "username", key: "username" },
                  { title: "Email", dataIndex: "email", key: "email" },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                      <Button danger size="small" onClick={() => handleDeleteTeacher(record._id)}>
                        Delete
                      </Button>
                    ),
                  },
                ]}
                rowKey={(record) => record._id}
                pagination={false}
                locale={{ emptyText: "No teachers added yet" }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Modal
        title="Add Teacher"
        open={teacherModal.visible}
        onOk={handleAddTeacher}
        onCancel={() => setTeacherModal({ visible: false, schoolId: null, username: "", email: "" })}
      >
        <Input
          placeholder="Teacher Username"
          value={teacherModal.username}
          onChange={(e) => setTeacherModal({ ...teacherModal, username: e.target.value })}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Teacher Email"
          value={teacherModal.email}
          onChange={(e) => setTeacherModal({ ...teacherModal, email: e.target.value })}
        />
        <p style={{ marginTop: 8, fontSize: 12, color: "#888" }}>Default password: <strong>default123</strong></p>
      </Modal>
    </div>
  );
};

export default SchoolBoard;
