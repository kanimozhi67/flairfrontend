// import { useEffect, useState } from "react";
// import {
//   Card,
//   Row,
//   Col,
//   Spin,
//   Empty,
//   Table,
//   Button,
//   Modal,
//   Input,
//   message,
//   Space,
//   Grid,
//   Tabs,
// } from "antd";
// import api from "./../api/axiosClient";

// const { useBreakpoint } = Grid;
// const { Search } = Input;
// const { TabPane } = Tabs;

// const SchoolBoard = () => {
//   const screens = useBreakpoint();

//   const [schools, setSchools] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [schoolSearch, setSchoolSearch] = useState("");

//   const [teacherSearch, setTeacherSearch] = useState({});
//   const [studentSearch, setStudentSearch] = useState({});
//   const [paginationState, setPaginationState] = useState({});

//   const [newSchool, setNewSchool] = useState("");
//   const [schoolAdminModal, setSchoolAdminModal] = useState({
//     visible: false,
//     schoolId: null,
//     username: "",
//     email: "",
//     password: "",
  
//   });
//   const [teacherModal, setTeacherModal] = useState({
//     visible: false,
//     schoolId: null,
//     username: "",
//     email: "",
//     className: "",
//     section: "",
//   });
//   const [studentModal, setStudentModal] = useState({
//     visible: false,
//     schoolId: null,
//     username: "",
//    // email: "",
//     rollNo: "",
//     className: "",
//     section: "",
//     level: "",
//   });

//   const [editingTeacher, setEditingTeacher] = useState(null);
//   const [editingStudent, setEditingStudent] = useState(null);

//   const [editableTeacherValues, setEditableTeacherValues] = useState({});
//   const [editableStudentValues, setEditableStudentValues] = useState({});

//   const fetchSchools = async () => {
//     try {
//       const res = await api.get("/admin/schools");
//       setSchools(res.data);
//     } catch {
//       message.error("Failed to fetch schools");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSchools();
//   }, []);
// const schoolAdmins = schools.flatMap((school) =>
//   school.teachers?.filter((t) => t.role === "SchoolAdmin") || []
// );

//   const handleAddSchool = async () => {
//     if (!newSchool) return;
//     try {
//       await api.post("/admin/school", { name: newSchool });
//       message.success("School added!");
//       setNewSchool("");
//       fetchSchools();
//     } catch {
//       message.error("Failed to add school");
//     }
//   };

//   const handleDeleteSchool = async (id) => {
//     try {
//       await api.delete(`/admin/school/${id}`);
//       message.success("School deleted!");
//       fetchSchools();
//     } catch {
//       message.error("Failed to delete school");
//     }
//   };

//   const handleAddTeacher = async () => {
//     const { schoolId, username, email, className, section } = teacherModal;
//     if (!username || !email || !className || !section) return;

//     try {
//       await api.post("/admin/teacher", {
//         schoolId,
//         username,
//         email,
//         password: "default123",
//         className,
//         section,
//       });
//       message.success("Teacher added!");
//       setTeacherModal({
//         visible: false,
//         schoolId: null,
//         username: "",
//         email: "",
//         className: "",
//         section: "",
//       });
//       fetchSchools();
//     } catch {
//       message.error("Failed to add teacher");
//     }
//   };

//   const handleDeleteTeacher = async (id) => {
//     try {
//       await api.delete(`/admin/teacher/${id}`);
//       message.success("Teacher deleted!");
//       fetchSchools();
//     } catch {
//       message.error("Failed to delete teacher");
//     }
//   };
//   const handleAddSchoolAdmin = async () => {
//     const { schoolId, username, email,password } = schoolAdminModal;
//     if (!username || !email || !password) return;

//     try {
//       await api.post("/admin/schoolAdmin", {
//         schoolId,
//         username,
//         email,
//         password,
       
//       });
//       message.success("School Admin added!");
//       setSchoolAdminModal({
//         visible: false,
//         schoolId: null,
//         username: "",
//         email: "",
//        password: "",
//       });
//       fetchSchools();
//     } catch {
//       message.error("Failed to add schoolAdmin");
//     }
//   };

  
//   // const handleSaveSchoolAdmin = async (id) => {
//   //   try {
//   //     await api.put(`/admin/teacheredit/${id}`, editableTeacherValues[id]);
//   //     message.success("Teacher updated!");
//   //     setEditingTeacher(null);
//   //     fetchSchools();
//   //   } catch {
//   //     message.error("Failed to update teacher");
//   //   }
//   // };
//   const handleSaveTeacher = async (id) => {
//     try {
//       await api.put(`/admin/teacheredit/${id}`, editableTeacherValues[id]);
//       message.success("Teacher updated!");
//       setEditingTeacher(null);
//       fetchSchools();
//     } catch {
//       message.error("Failed to update teacher");
//     }
//   };

//   const handleAddStudent = async () => {
//     const { schoolId, username, email, rollNo, className, section, level } =
//       studentModal;
//     if (!username ||  !rollNo || !className || !section || !level)
//       return message.warning("Please fill all fields");

//     try {
//       await api.post("/auth/studentSignup",  {
//         schoolId,
//         username,
//        // email,
//         rollNo,
//         className,
//         section,
//         level,
//         password: "default123",
//         //role: "User",
//       });
//       message.success("Student added!");
//       setStudentModal({
//         visible: false,
//         schoolId: null,
//         username: "",
//       //  email: "",
//         rollNo: "",
//         className: "",
//         section: "",
//         level: "",
//       });
//       fetchSchools();
//     } catch {
//       message.error("Failed to add student");
//     }
//   };

//   const handleDeleteStudent = async (id) => {
//     try {
//       await api.delete(`/admin/student/${id}`);
//       message.success("Student deleted!");
//       fetchSchools();
//     } catch {
//       message.error("Failed to delete student");
//     }
//   };

//   const handleSaveStudent = async (id) => {
//     try {
//       await api.put(`/admin/studentedit/${id}`, editableStudentValues[id]);
//       message.success("Student updated!");
//       setEditingStudent(null);
//       fetchSchools();
//     } catch {
//       message.error("Failed to update student");
//     }
//   };

//   // CSV Export Utility
//   const exportCSV = (data, columns, filename) => {
//     const header = columns.map((col) => col.title).join(",");
//     const rows = data
//       .map((row) =>
//         columns
//           .map((col) => {
//             const value = row[col.dataIndex] ?? "";
//             return `"${value.toString().replace(/"/g, '""')}"`;
//           })
//           .join(",")
//       )
//       .join("\n");

//     const csvContent = [header, rows].join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute("download", filename);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   if (loading) return <Spin size="large" />;
//   if (!schools.length) return <Empty description="No schools found" />;

//   const filteredSchools = schools.filter((school) =>
//     school.name.toLowerCase().includes(schoolSearch.toLowerCase())
//   );

//   return (
//     <div>
//       {/* School Search + Add */}
//       <Row gutter={[8, 8]} style={{ marginBottom: 16 }}>
//         <Col xs={24} md={8}>
//           <Search
//             placeholder="Search schools"
//             allowClear
//             onChange={(e) => setSchoolSearch(e.target.value)}
//           />
//         </Col>
//         <Col xs={24} md={10}>
//           <Input
//             placeholder="New School Name"
//             value={newSchool}
//             onChange={(e) => setNewSchool(e.target.value)}
//           />
//         </Col>
//         <Col xs={24} md={6}>
//           <Button type="primary" block onClick={handleAddSchool}>
//             Add School
//           </Button>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         {filteredSchools.map((school) => {
//         //  const searchTeacher = teacherSearch[school._id] || "";
//           const searchStudent = studentSearch[school._id] || "";

//           // const filteredTeachers = school.teachers.filter((t) =>
//           //   [t.username, t.email, t.className, t.section]
//           //     .join(" ")
//           //     .toLowerCase()
//           //     .includes(searchTeacher.toLowerCase())
//           // );
// <Search
//   placeholder="Search teachers"
//   allowClear
//   onChange={(e) =>
//     setTeacherSearch((prev) => ({
//       ...prev,
//       [school._id]: e.target.value,
//     }))
//   }
// />

//           const filteredStudents =
//             school.students?.filter((s) =>
//               [s.username, s.email, s.rollNo, s.className, s.section, s.level]
//                 .join(" ")
//                 .toLowerCase()
//                 .includes(searchStudent.toLowerCase())
//             ) || [];
// const schoolAdminColumns = [
//   { title: "Username", dataIndex: "username" },
//   { title: "Email", dataIndex: "email" },
//   {
//     title: "Action",
//     render: (_, record) => (
//       <Button danger size="small">
//         Delete
//       </Button>
//     ),
//   },
// ];


           
        
//           const teacherColumns = [
//             { title: "Username", dataIndex: "username" },
//             { title: "Email", dataIndex: "email" },
//             { title: "Class", dataIndex: "className" },
//             { title: "Section", dataIndex: "section" },
//           ];

//           const studentColumns = [
//             { title: "Username", dataIndex: "username" },
//            // { title: "Email", dataIndex: "email" },
//             { title: "Roll No", dataIndex: "rollNo" },
//             { title: "Class", dataIndex: "className" },
//             { title: "Section", dataIndex: "section" },
//             { title: "Level", dataIndex: "level" },
//           ];

//           return (
//             <Col xs={24} key={school._id}>
//               <Card
//                 title={school.name}
//                 extra={
//                   <Button
//                     danger
//                     size="small"
//                     onClick={() => handleDeleteSchool(school._id)}
//                   >
//                     Delete
//                   </Button>
//                 }
//               >
//                 <Tabs defaultActiveKey="schooladmin">
// <TabPane tab="School Admin" key="schooladmin">

//                     <Space style={{ marginBottom: 12 }}>
                     
//                       <Button
//                         type="dashed"
//                         onClick={() =>
//                           setSchoolAdminModal({
//                             ...schoolAdminModal,
//                             visible: true,
//                             schoolId: school._id,
//                           })
//                         }
//                       >
//                         Add School Admin
//                       </Button> </Space>
                      
// <Table
//   dataSource={schoolAdmins}
//   columns={schoolAdminColumns}
//   rowKey="_id"
//   pagination={false}
// />
//   </TabPane></Tabs>
// <Tabs defaultActiveKey="teachers">
// <TabPane tab="Teachers" key="teachers">

//                     <Space style={{ marginBottom: 12 }}>
//                       <Button
//                         type="dashed"
//                         onClick={() =>
//                           setTeacherModal({
//                             ...teacherModal,
//                             visible: true,
//                             schoolId: school._id,
//                           })
//                         }
//                       >
//                         Add Teacher
//                       </Button>
//                       <Button
//                         type="default"
//                         onClick={() =>
//                           exportCSV(
//                             filteredTeachers,
//                             teacherColumns,
//                             `${school.name}_teachers.csv`
//                           )
//                         }
//                       >
//                         Download CSV
//                       </Button>
//                     </Space>

//                     <Table
//                       dataSource={filteredTeachers}
//                       rowKey="_id"
//                       size={screens.md ? "middle" : "small"}
//                       scroll={{ x: "max-content" }}
//                       pagination={{
//                         current:
//                           paginationState[school._id]?.teacherCurrent || 1,
//                         pageSize:
//                           paginationState[school._id]?.teacherPageSize || 5,
//                         showSizeChanger: true,
//                         pageSizeOptions: ["5", "10", "20"],
//                         onChange: (current, pageSize) =>
//                           setPaginationState((prev) => ({
//                             ...prev,
//                             [school._id]: {
//                               ...prev[school._id],
//                               teacherCurrent: current,
//                               teacherPageSize: pageSize,
//                             },
//                           })),
//                       }}
//                       columns={[
//                         ...teacherColumns,
//                         {
//                           title: "Action",
//                           render: (_, record) =>
//                             editingTeacher === record._id ? (
//                               <Space>
//                                 <Button
//                                   size="small"
//                                   type="primary"
//                                   onClick={() => handleSaveTeacher(record._id)}
//                                 >
//                                   Save
//                                 </Button>
//                                 <Button
//                                   size="small"
//                                   onClick={() => setEditingTeacher(null)}
//                                 >
//                                   Cancel
//                                 </Button>
//                               </Space>
//                             ) : (
//                               <Space>
//                                 <Button
//                                   size="small"
//                                   type="link"
//                                   onClick={() =>
//                                     setEditingTeacher(record._id)
//                                   }
//                                 >
//                                   Edit
//                                 </Button>
//                                 <Button
//                                   size="small"
//                                   danger
//                                   onClick={() => handleDeleteTeacher(record._id)}
//                                 >
//                                   Delete
//                                 </Button>
//                               </Space>
//                             ),
//                         },
//                       ]}
//                     />
//                   </TabPane>

//                   {/* Students Tab */}
//                   <TabPane tab="Students" key="students"> 
//                     <Space style={{ marginBottom: 12 }}>
//                       <Search
//                         placeholder="Search students"
//                         allowClear
//                         onChange={(e) =>
//                           setStudentSearch((prev) => ({
//                             ...prev,
//                             [school._id]: e.target.value,
//                           }))
//                         }
//                       />
//                       <Button
//                         type="dashed"
//                         onClick={() =>
//                           setStudentModal({
//                             ...studentModal,
//                             visible: true,
//                             schoolId: school._id,
//                           })
//                         }
//                       >
//                         Add Student
//                       </Button>
//                       <Button
//                         type="default"
//                         onClick={() =>
//                           exportCSV(
//                             filteredStudents,
//                             studentColumns,
//                             `${school.name}_students.csv`
//                           )
//                         }
//                       >
//                         Download CSV
//                       </Button>
//                     </Space>

//                     <Table
//                       dataSource={filteredStudents}
//                       rowKey="_id"
//                       size={screens.md ? "middle" : "small"}
//                       scroll={{ x: "max-content" }}
//                       pagination={{
//                         current:
//                           paginationState[school._id]?.studentCurrent || 1,
//                         pageSize:
//                           paginationState[school._id]?.studentPageSize || 5,
//                         showSizeChanger: true,
//                         pageSizeOptions: ["5", "10", "20"],
//                         onChange: (current, pageSize) =>
//                           setPaginationState((prev) => ({
//                             ...prev,
//                             [school._id]: {
//                               ...prev[school._id],
//                               studentCurrent: current,
//                               studentPageSize: pageSize,
//                             },
//                           })),
//                       }}
//                       columns={[
//                         ...studentColumns,
//                         {
//                           title: "Action",
//                           render: (_, record) =>
//                             editingStudent === record._id ? (
//                               <Space>
//                                 <Button
//                                   size="small"
//                                   type="primary"
//                                   onClick={() => handleSaveStudent(record._id)}
//                                 >
//                                   Save
//                                 </Button>
//                                 <Button
//                                   size="small"
//                                   onClick={() => setEditingStudent(null)}
//                                 >
//                                   Cancel
//                                 </Button>
//                               </Space>
//                             ) : (
//                               <Space>
//                                 <Button
//                                   size="small"
//                                   type="link"
//                                   onClick={() => setEditingStudent(record._id)}
//                                 >
//                                   Edit
//                                 </Button>
//                                 <Button
//                                   size="small"
//                                   danger
//                                   onClick={() => handleDeleteStudent(record._id)}
//                                 >
//                                   Delete
//                                 </Button>
//                               </Space>
//                             ),
//                         },
//                       ]}
//                     />
//                   </TabPane>
//                 </Tabs>
//               </Card>
//             </Col>
//           );
//         })}
//       </Row>

//       {/* School Admin Modal */}
//       <Modal
//         title="Add School Admin"
//         open={schoolAdminModal.visible}
//         onOk={handleAddSchoolAdmin}
//         onCancel={() =>
//           setSchoolAdminModal({
//             visible: false,
//             schoolId: null,
//             username: "",
//             email: "",
//           password:""
//           })
//         }
//         width={screens.md ? 520 : "100%"}
//       >
//         {["username", "email", "password"].map((field) => (
//           <Input
//             key={field}
//             placeholder={field}
//             value={schoolAdminModal[field]}
//             onChange={(e) =>
//               setSchoolAdminModal({ ...schoolAdminModal, [field]: e.target.value })
//             }
//             style={{ marginBottom: 8 }}
//           />
//         ))}
//         <p style={{ fontSize: 12, color: "#888" }}>
//           Default password: <strong>sadmin123</strong>
//         </p>
//       </Modal>
//       {/* Teacher Modal */}
//       <Modal
//         title="Add Teacher"
//         open={teacherModal.visible}
//         onOk={handleAddTeacher}
//         onCancel={() =>
//           setTeacherModal({
//             visible: false,
//             schoolId: null,
//             username: "",
//             email: "",
//             className: "",
//             section: "",
//           })
//         }
//         width={screens.md ? 520 : "100%"}
//       >
//         {["username", "email", "className", "section"].map((field) => (
//           <Input
//             key={field}
//             placeholder={field}
//             value={teacherModal[field]}
//             onChange={(e) =>
//               setTeacherModal({ ...teacherModal, [field]: e.target.value })
//             }
//             style={{ marginBottom: 8 }}
//           />
//         ))}
//         <p style={{ fontSize: 12, color: "#888" }}>
//           Default password: <strong>default123</strong>
//         </p>
//       </Modal>

//       {/* Student Modal */}
//       <Modal
//         title="Add Student"
//         open={studentModal.visible}
//         onOk={handleAddStudent}
//         onCancel={() =>
//           setStudentModal({
//             visible: false,
//             schoolId: null,
//             username: "",
//           //  email: "",
//             rollNo: "",
//             className: "",
//             section: "",
//             level: "",
//           })
//         }
//         width={screens.md ? 520 : "100%"}
//       >
//         {[
//           { key: "username", placeholder: "Username" },
//        //   { key: "email", placeholder: "Email" },
//           { key: "rollNo", placeholder: "Roll Number" },
//           { key: "className", placeholder: "Class" },
//           { key: "section", placeholder: "Section" },
//           { key: "level", placeholder: "Level (kindergarten/primary)" },
//         ].map((field) => (
//           <Input
//             key={field.key}
//             placeholder={field.placeholder}
//             value={studentModal[field.key]}
//             onChange={(e) =>
//               setStudentModal({ ...studentModal, [field.key]: e.target.value })
//             }
//             style={{ marginBottom: 8 }}
//           />
//         ))}
//         <p style={{ fontSize: 12, color: "#888" }}>
//           Default password: <strong>default123</strong>
//         </p>
//       </Modal>
//     </div>
//   );
// };

// export default SchoolBoard;
