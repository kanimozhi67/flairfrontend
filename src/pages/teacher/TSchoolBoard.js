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
  Tabs,
} from "antd";
import api from "../../api/axiosClient";

const { useBreakpoint } = Grid;
const { Search } = Input;
const { TabPane } = Tabs;

const TSchoolBoard = ({user}) => {
  const screens = useBreakpoint();

  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [schoolSearch, setSchoolSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState({});
  const [studentSearch, setStudentSearch] = useState({});
  const [paginationState, setPaginationState] = useState({});
  const [newSchool, setNewSchool] = useState("");

  const [studentModal, setStudentModal] = useState({
    visible: false,
    schoolId: null,
    username: "",
    rollNo: "",
    className: "",
    section: "",
    level: "",
    password:"",
  });

  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);

  const [editableTeacherValues, setEditableTeacherValues] = useState({});
  const [editableStudentValues, setEditableStudentValues] = useState({});

  // Fetch schools
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


  // Add Student
  const handleAddStudent = async () => {
    const { schoolId, username, rollNo,  level ,password} = studentModal;
    if (!username || !rollNo  ||!level ||!password)
      return message.warning("Please fill all fields");

    try {
      await api.post("/auth/studentSignup", {
        schoolId,
        username,
        rollNo,
        className:user.className,
        section :user.section,
        level,
      //  password: "default123",
        password,
      });
      message.success("Student added!");
      setStudentModal({ visible: false, schoolId: null, username: "", rollNo: "", className: "", section: "", level: "" });
      fetchSchools();
    } catch {
      message.error("Failed to add student");
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await api.delete(`/admin/student/${id}`);
      message.success("Student deleted!");
      fetchSchools();
    } catch {
      message.error("Failed to delete student");
    }
  };

  const handleSaveStudent = async (id) => {
    try {
      await api.put(`/admin/studentedit/${id}`, editableStudentValues[id]);
      message.success("Student updated!");
      setEditingStudent(null);
      fetchSchools();
    } catch {
      message.error("Failed to update student");
    }
  };

  // CSV export
  const exportCSV = (data, columns, filename) => {
    const header = columns.map((col) => col.title).join(",");
    const rows = data
      .map((row) =>
        columns.map((col) => `"${(row[col.dataIndex] || "").toString().replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const csvContent = [header, rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Spin size="large" />;
  if (!schools.length) return <Empty description="No schools found" />;

  const filteredSchools = schools.filter((school) =>
   school._id.includes(user.school)
  
  );
 

  return (
    <div>
      

      <Row gutter={[16, 16]}>
        {filteredSchools.map((school) => {
          const searchTeacher = teacherSearch[school._id] || "";
          const searchStudent = studentSearch[school._id] || "";
 
  const filteredStudent = school.students?.filter((student) =>
   student.className.includes(user.className) && student.section.includes(user.section)
  
  );
          const filteredStudents =
           // school.students?.filter((s) =>
           filteredStudent?.filter((s) =>
              [s.username, s.rollNo, s.className, s.section, s.level].join(" ").toLowerCase().includes(searchStudent.toLowerCase())
            ) || [];
        
          const studentColumns = [
            { title: "Username", dataIndex: "username" },
            { title: "Roll No", dataIndex: "rollNo" },
            { title: "Class", dataIndex: "className" },
            { title: "Section", dataIndex: "section" },
            // { title: "Level", dataIndex: "level" },
          ];

          return (
            <Col xs={24} key={school._id}>
              <Card
                title={school.name}
                
              >
                <Tabs defaultActiveKey="teacher">
                  {/* School Admin Tab */}

{/* Students Tab */}
<TabPane tab="Students" key="students">
  <Space style={{ marginBottom: 12 }}>
    <Search
      placeholder="Search students"
      allowClear
      onChange={(e) =>
        setStudentSearch((prev) => ({ ...prev, [school._id]: e.target.value }))
      }
    />
    <Button
      type="dashed"
      onClick={() => setStudentModal({ ...studentModal, visible: true, schoolId: school._id })}
    >
      Add Student
    </Button>
    <Button
      type="default"
      onClick={() => exportCSV(filteredStudents, studentColumns, `${school.name}_students.csv`)}
    >
      Download CSV
    </Button>
  </Space>

  <Table
    dataSource={filteredStudents}
    rowKey="_id"
    size={screens.md ? "middle" : "small"}
    scroll={{ x: "max-content" }}
    pagination={{
      current: paginationState[school._id]?.studentCurrent || 1,
      pageSize: paginationState[school._id]?.studentPageSize || 5,
      showSizeChanger: true,
      pageSizeOptions: ["5", "10", "20"],
      onChange: (current, pageSize) =>
        setPaginationState((prev) => ({
          ...prev,
          [school._id]: { ...prev[school._id], studentCurrent: current, studentPageSize: pageSize },
        })),
    }}
    columns={[
      {
        title: "Username",
        dataIndex: "username",
        render: (_, record) =>
          editingStudent === record._id ? (
            <Input
              value={editableStudentValues[record._id]?.username}
              onChange={(e) =>
                setEditableStudentValues((prev) => ({
                  ...prev,
                  [record._id]: { ...prev[record._id], username: e.target.value },
                }))
              }
            />
          ) : (
            record.username
          ),
      },
      {
        title: "Roll No",
        dataIndex: "rollNo",
        render: (_, record) =>
          editingStudent === record._id ? (
            <Input
              value={editableStudentValues[record._id]?.rollNo}
              onChange={(e) =>
                setEditableStudentValues((prev) => ({
                  ...prev,
                  [record._id]: { ...prev[record._id], rollNo: e.target.value },
                }))
              }
            />
          ) : (
            record.rollNo
          ),
      },
   
      {
        title: "Class",
        dataIndex: "className",
        render: (_, record) =>
          editingStudent === record._id ? (
            <Input
              value={editableStudentValues[record._id]?.className}
              onChange={(e) =>
                setEditableStudentValues((prev) => ({
                  ...prev,
                  [record._id]: { ...prev[record._id], className: e.target.value },
                }))
              }
            />
          ) : (
            record.className
          ),
      },
      {
        title: "Section",
        dataIndex: "section",
        render: (_, record) =>
          editingStudent === record._id ? (
            <Input
              value={editableStudentValues[record._id]?.section}
              onChange={(e) =>
                setEditableStudentValues((prev) => ({
                  ...prev,
                  [record._id]: { ...prev[record._id], section: e.target.value },
                }))
              }
            />
          ) : (
            record.section
          ),
      },
      // {
      //   title: "Level",
      //   dataIndex: "level",
      //   render: (_, record) =>
      //     editingStudent === record._id ? (
      //       <Input
      //         value={editableStudentValues[record._id]?.level}
      //         onChange={(e) =>
      //           setEditableStudentValues((prev) => ({
      //             ...prev,
      //             [record._id]: { ...prev[record._id], level: e.target.value },
      //           }))
      //         }
      //       />
      //     ) : (
      //       record.level
      //     ),
      // },
      {
        title: "Action",
        render: (_, record) =>
          editingStudent === record._id ? (
            <Space>
              <Button size="small" type="primary" onClick={() => handleSaveStudent(record._id)}>
                Save
              </Button>
              <Button size="small" onClick={() => setEditingStudent(null)}>
                Cancel
              </Button>
            </Space>
          ) : (
            <Space>
              <Button
                size="small"
                type="link"
                onClick={() => {
                  setEditingStudent(record._id);
                  setEditableStudentValues((prev) => ({ ...prev, [record._id]: { ...record } }));
                }}
              >
                Edit
              </Button>
              <Button size="small" danger onClick={() => handleDeleteStudent(record._id)}>
                Delete
              </Button>
            </Space>
          ),
      },
    ]}
  />
</TabPane>

       
                </Tabs>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Modals */}
      

      {/* Student Modal */}
      <Modal
        title="Add Student"
        open={studentModal.visible}
        onOk={handleAddStudent}
        onCancel={() =>
          setStudentModal({
            visible: false,
            schoolId: null,
            username: "",
          //  email: "",
            rollNo: "",
            className: "",
            section: "",
            level: "",
          })
        }
        width={screens.md ? 520 : "100%"}
      >
        {[
          { key: "username", placeholder: "Username" },
        { key: "password", placeholder: "Password" },
          { key: "rollNo", placeholder: "Roll Number" },
          // { key: "className", placeholder: "Class" },
          // { key: "section", placeholder: "Section" },
          { key: "level", placeholder: "Level (kindergarten/primary)" },
        ].map((field) => (
          <Input
            key={field.key}
            placeholder={field.placeholder}
            value={studentModal[field.key]}
            onChange={(e) =>
              setStudentModal({ ...studentModal, [field.key]: e.target.value })
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

export default TSchoolBoard;
