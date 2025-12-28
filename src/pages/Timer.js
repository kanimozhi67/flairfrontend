// import { Layout, Menu, Button, Drawer } from "antd";
// import {
//   PlusOutlined,
//   UnorderedListOutlined,
//   MenuOutlined,
// } from "@ant-design/icons";
// import { useState } from "react";
// import CreateTask from "./CreateTask";
// import AllTasks from "./AllTasks";
// import TaskBoard from "./TaskBoard";
// import SchoolBoard from "./SchoolBoard";

// const { Header, Sider, Content } = Layout;

// const AdminDashboard = () => {
//   const [active, setActive] = useState("create");
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const menuItems = [
//     { key: "create", icon: <PlusOutlined />, label: "Create Task" },
//     { key: "tasks", icon: <UnorderedListOutlined />, label: "All Tasks" },
//     { key: "board", icon: <UnorderedListOutlined />, label: "Task Board" },
//     { key: "schools", icon: <UnorderedListOutlined />, label: "Schools" },
//   ];

//   const renderContent = () => {
//     switch (active) {
//       case "create":
//         return <CreateTask />;
//       case "tasks":
//         return <AllTasks />;
//       case "board":
//         return <TaskBoard />;
//       case "schools":
//         return <SchoolBoard />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       {/* Desktop Sidebar */}
//       <Sider
//         breakpoint="lg"
//         collapsedWidth="0"
//         style={{ display: "none", }}
//         className="desktop-sider"
//       >
//         <div style={{ color: "#fff", padding: 16, fontSize: 18 }}>
//           Admin Panel
//         </div>
//         <Menu
//           theme="dark"
//           mode="inline"
//           selectedKeys={[active]}
//           onClick={(e) => setActive(e.key)}
//           items={menuItems}
//         />
//       </Sider>

//       <Layout>
//         <Header
//           style={{
//             background: "#fff",
//             padding: "0 16px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Mobile Menu Button */}
//           <Button
//             icon={<MenuOutlined />}
//             type="text"
//             onClick={() => setDrawerOpen(true)}
//             style={{ fontSize: 20 }}
//           />

//           <span style={{ fontWeight: "bold", fontSize: 18 }}>
//             Admin Dashboard
//           </span>
//         </Header>

//         <Content
//           style={{
//             margin: 16,
//             padding: 16,
//             background: "#fff",
//             borderRadius: 8,
//           }}
//         >
//           {renderContent()}
//         </Content>
//       </Layout>

//       {/* Mobile Drawer */}
//       <Drawer
//         title="Admin Panel"
//         placement="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//         bodyStyle={{ padding: 0 }}
//       >
//         <Menu
//           mode="inline"
//           selectedKeys={[active]}
//           onClick={(e) => {
//             setActive(e.key);
//             setDrawerOpen(false);
//           }}
//           items={menuItems}
//         />
//       </Drawer>
//     </Layout>
//   );
// };

// export default AdminDashboard;
