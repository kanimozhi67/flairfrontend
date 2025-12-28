import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Empty, Table, Button, Modal, Input, message, Space } from "antd";
import api from "../../api/axiosClient";

const SchoolBoard = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newSchool, setNewSchool] = useState("");
  const [teacherModal, setTeacherModal] = useState({
    visible: false,
    schoolId: null,
    username: "",
    email: "",
    className: "",
    section: "",
  });

  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editableValues, setEditableValues] = useState({});

  // Fetch schools
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

  // Add school
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

  // Delete school
  const handleDeleteSchool = async (schoolId) => {
    try {
      await api.delete(`/admin/school/${schoolId}`);
      message.success("School deleted!");
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete school");
    }
  };

  // Add teacher
  const handleAddTeacher = async () => {
    const { schoolId, username, email, className, section } = teacherModal;
    if (!username || !email || !className || !section) return;

    try {
      await api.post("/admin/teacher", {
        schoolId,
        username,
        email,
        password: "default123",
        className,
        section,
      });
      message.success("Teacher added!");
      setTeacherModal({
        visible: false,
        schoolId: null,
        username: "",
        email: "",
        className: "",
        section: "",
      });
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to add teacher");
    }
  };



// Delete teacher
 const handleDeleteTeacher = async (teacherId) => { 
try { await api.delete(`/admin/teacher/${teacherId}`);
 message.success("Teacher deleted!");
 fetchSchools(); 
} catch (err) {
 message.error(err.response?.data?.message || "Failed to delete teacher"); } }; 


  // Save teacher edits
  const handleSaveTeacher = async (teacherId) => {
    const updatedData = editableValues[teacherId];
    if (!updatedData) return;

    try {
      await api.put(`/admin/teacheredit/${teacherId}`, updatedData);
      message.success("Teacher updated!");
      setEditingTeacher(null);
      setEditableValues((prev) => {
        const copy = { ...prev };
        delete copy[teacherId];
        return copy;
      });
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update teacher");
    }
  };

  if (loading) return <Spin size="large" />;
  if (!schools.length) return <Empty description="No schools found" />;

  return (
    <div>
      {/* Add School */}
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="New School Name"
          value={newSchool}
          onChange={(e) => setNewSchool(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleAddSchool}>
          Add School
        </Button>
      </Space>

      <Row gutter={[16, 16]}>
        {schools.map((school) => (
          <Col xs={24} md={12} key={school._id}>
            <Card
              title={school.name}
              style={{ marginBottom: 16 ,width:900}}
              extra={
                <Button danger onClick={() => handleDeleteSchool(school._id)}>
                  Delete
                </Button>
              }
            >
              <Button
                type="dashed"
                style={{ marginBottom: 8 }}
                onClick={() =>
                  setTeacherModal({ ...teacherModal, visible: true, schoolId: school._id })
                }
              >
                Add Teacher
              </Button>

              <Table
                dataSource={school.teachers}
                rowKey={(record) => record._id}
                pagination={false}
                locale={{ emptyText: "No teachers added yet" }}
                columns={[
                  {
                    title: "Username",
                    dataIndex: "username",
                    key: "username",
                    render: (text, record) =>
                      editingTeacher === record._id ? (
                        <Input
                          value={editableValues[record._id]?.username ?? text}
                          onChange={(e) =>
                            setEditableValues((prev) => ({
                              ...prev,
                              [record._id]: {
                                ...prev[record._id],
                                username: e.target.value,
                                email: prev[record._id]?.email ?? record.email,
                                className: prev[record._id]?.className ?? record.className,
                                section: prev[record._id]?.section ?? record.section,
                              },
                            }))
                          }
                        />
                      ) : (
                        text
                      ),
                  },
                  {
                    title: "Email",
                    dataIndex: "email",
                    key: "email",
                    render: (text, record) =>
                      editingTeacher === record._id ? (
                        <Input
                          value={editableValues[record._id]?.email ?? text}
                          onChange={(e) =>
                            setEditableValues((prev) => ({
                              ...prev,
                              [record._id]: {
                                ...prev[record._id],
                                email: e.target.value,
                                username: prev[record._id]?.username ?? record.username,
                                className: prev[record._id]?.className ?? record.className,
                                section: prev[record._id]?.section ?? record.section,
                              },
                            }))
                          }
                        />
                      ) : (
                        text
                      ),
                  },
                  {
                    title: "Class",
                    dataIndex: "className",
                    key: "className",
                    render: (text, record) =>
                      editingTeacher === record._id ? (
                        <Input
                          value={editableValues[record._id]?.className ?? text}
                          onChange={(e) =>
                            setEditableValues((prev) => ({
                              ...prev,
                              [record._id]: {
                                ...prev[record._id],
                                className: e.target.value,
                                username: prev[record._id]?.username ?? record.username,
                                email: prev[record._id]?.email ?? record.email,
                                section: prev[record._id]?.section ?? record.section,
                              },
                            }))
                          }
                        />
                      ) : (
                        text
                      ),
                  },
                  {
                    title: "Section",
                    dataIndex: "section",
                    key: "section",
                    render: (text, record) =>
                      editingTeacher === record._id ? (
                        <Input
                          value={editableValues[record._id]?.section ?? text}
                          onChange={(e) =>
                            setEditableValues((prev) => ({
                              ...prev,
                              [record._id]: {
                                ...prev[record._id],
                                section: e.target.value,
                                username: prev[record._id]?.username ?? record.username,
                                email: prev[record._id]?.email ?? record.email,
                                className: prev[record._id]?.className ?? record.className,
                              },
                            }))
                          }
                        />
                      ) : (
                        text
                      ),
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (_, record) =>
                      editingTeacher === record._id ? (
                        <Space>
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => handleSaveTeacher(record._id)}
                          >
                            Save
                          </Button>
                          <Button
                            size="small"
                            onClick={() => {
                              setEditingTeacher(null);
                              setEditableValues((prev) => {
                                const copy = { ...prev };
                                delete copy[record._id];
                                return copy;
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </Space>
                      ) : (
                        <Space>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => setEditingTeacher(record._id)}
                          >
                            Edit
                          </Button>
                          <Button
                            danger
                            size="small"
                            onClick={() => handleDeleteTeacher(record._id)}
                          >
                            Delete
                          </Button>
                        </Space>
                      ),
                  },
                ]}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add Teacher Modal */}
      <Modal
        title="Add Teacher"
        open={teacherModal.visible}
        onOk={handleAddTeacher}
        onCancel={() =>
          setTeacherModal({
            visible: false,
            schoolId: null,
            username: "",
            email: "",
            className: "",
            section: "",
          })
        }
      >
        <Input
          placeholder="Username"
          value={teacherModal.username}
          onChange={(e) => setTeacherModal({ ...teacherModal, username: e.target.value })}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Email"
          value={teacherModal.email}
          onChange={(e) => setTeacherModal({ ...teacherModal, email: e.target.value })}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Class"
          value={teacherModal.className}
          onChange={(e) => setTeacherModal({ ...teacherModal, className: e.target.value })}
          style={{ marginBottom: 8 }}
        />
        <Input
          placeholder="Section"
          value={teacherModal.section}
          onChange={(e) => setTeacherModal({ ...teacherModal, section: e.target.value })}
          style={{ marginBottom: 8 }}
        />
        <p style={{ marginTop: 8, fontSize: 12, color: "#888" }}>
          Default password: <strong>default123</strong>
        </p>
      </Modal>
    </div>
  );
};

export default SchoolBoard;
