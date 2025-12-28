import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Empty,
  Table,
  Button,
  Modal,
  Input,
  message,
  Space,
  Grid,
} from "antd";
import api from "../../api/axiosClient";

const { useBreakpoint } = Grid;
const { Search } = Input;

const SchoolBoard = () => {
  const screens = useBreakpoint();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const [schoolSearch, setSchoolSearch] = useState("");

  const [teacherSearch, setTeacherSearch] = useState({});
  const [paginationState, setPaginationState] = useState({});

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

  const fetchSchools = async () => {
    try {
      const res = await api.get("/admin/schools");
      setSchools(res.data);
    } catch {
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

  const handleDeleteTeacher = async (id) => {
    try {
      await api.delete(`/admin/teacher/${id}`);
      message.success("Teacher deleted!");
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete teacher");
    }
  };

  const handleSaveTeacher = async (id) => {
    try {
      await api.put(`/admin/teacheredit/${id}`, editableValues[id]);
      message.success("Teacher updated!");
      setEditingTeacher(null);
      fetchSchools();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to update teacher");
    }
  };

  if (loading) return <Spin size="large" />;
  if (!schools.length) return <Empty description="No schools found" />;

  // 🔍 Filter schools
  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  return (
    <div>
      {/* School Search + Add */}
      <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
        <Col xs={24} md={8}>
          <Search
            placeholder="Search schools"
            allowClear
            onChange={(e) => setSchoolSearch(e.target.value)}
          />
        </Col>
        <Col xs={24} md={10}>
          <Input
            placeholder="New School Name"
            value={newSchool}
            onChange={(e) => setNewSchool(e.target.value)}
          />
        </Col>
        <Col xs={24} md={6}>
          <Button type="primary" block onClick={handleAddSchool}>
            Add School
          </Button>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {filteredSchools.map((school) => {
          const searchValue = teacherSearch[school._id] || "";

          const filteredTeachers = school.teachers.filter((t) =>
            [t.username, t.email, t.className, t.section]
              .join(" ")
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          );

          return (
          <Row gutter={[16, 16]}>
            <Col
    xs={24}     // Mobile: full width
    sm={24}     // Small tablets: full width
    md={24}     // Tablets: full width
    lg={24}     // Laptops: wider cards
    xl={24}     // Desktops: balanced
    xxl={24}    // Large screens: very wide cards
   key={school._id}>
              <Card
                title={school.name}
                extra={
                  <Button danger size="small" onClick={() => handleDeleteSchool(school._id)}>
                    Delete
                  </Button>
                }
              >
                {/* Teacher Search */}
                <Search
                  placeholder="Search teachers"
                  allowClear
                  style={{ marginBottom: 12 }}
                  onChange={(e) =>
                    setTeacherSearch((prev) => ({
                      ...prev,
                      [school._id]: e.target.value,
                    }))
                  }
                />

                <Button
                  type="dashed"
                  block={!screens.sm}
                  style={{ marginBottom: 12 }}
                  onClick={() =>
                    setTeacherModal({ ...teacherModal, visible: true, schoolId: school._id })
                  }
                >
                  Add Teacher
                </Button>

                <Table
                  dataSource={filteredTeachers}
                  rowKey="_id"
                  size={screens.md ? "middle" : "small"}
                  scroll={{ x: "max-content" }}
                  pagination={{
                    current: paginationState[school._id]?.current || 1,
                    pageSize: paginationState[school._id]?.pageSize || 5,
                    showSizeChanger: true,
                    pageSizeOptions: ["5", "10", "20"],
                    onChange: (current, pageSize) =>
                      setPaginationState((prev) => ({
                        ...prev,
                        [school._id]: { current, pageSize },
                      })),
                  }}
                  columns={[
                    { title: "Username", dataIndex: "username" },
                    { title: "Email", dataIndex: "email" },
                    { title: "Class", dataIndex: "className" },
                    { title: "Section", dataIndex: "section" },
                    {
                      title: "Action",
                      render: (_, record) =>
                        editingTeacher === record._id ? (
                          <Space>
                            <Button
                              size="small"
                              type="primary"
                              onClick={() => handleSaveTeacher(record._id)}
                            >
                              Save
                            </Button>
                            <Button size="small" onClick={() => setEditingTeacher(null)}>
                              Cancel
                            </Button>
                          </Space>
                        ) : (
                          <Space>
                            <Button size="small" type="link" onClick={() => setEditingTeacher(record._id)}>
                              Edit
                            </Button>
                            <Button
                              size="small"
                              danger
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
            </Col></Row>
          );
        })}
      </Row>

      {/* Add Teacher Modal */}
      <Modal
        title="Add Teacher"
        open={teacherModal.visible}
        onOk={() => {}}
        onCancel={() => setTeacherModal({ visible: false })}
        width={screens.md ? 520 : "100%"}
      >
        {["username", "email", "className", "section"].map((field) => (
          <Input
            key={field}
            placeholder={field}
            value={teacherModal[field]}
            onChange={(e) =>
              setTeacherModal({ ...teacherModal, [field]: e.target.value })
            }
            style={{ marginBottom: 8 }}
          />
        ))}
        <p style={{ fontSize: 12, color: "#888" }}>
          Default password: <strong>default123</strong>
        </p>
      </Modal>
    </div>
  );
};

export default SchoolBoard;
