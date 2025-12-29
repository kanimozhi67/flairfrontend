// // import { Layout, Menu, Button, Drawer } from "antd";
// // import {
// //   PlusOutlined,
// //   UnorderedListOutlined,
// //   MenuOutlined,
// // } from "@ant-design/icons";
// // import { useState } from "react";
// // import CreateTask from "./CreateTask";
// // import AllTasks from "./AllTasks";
// // import TaskBoard from "./TaskBoard";
// // import SchoolBoard from "./SchoolBoard";

// // const { Header, Sider, Content } = Layout;

// // const AdminDashboard = () => {
// //   const [active, setActive] = useState("create");
// //   const [drawerOpen, setDrawerOpen] = useState(false);

// //   const menuItems = [
// //     { key: "create", icon: <PlusOutlined />, label: "Create Task" },
// //     { key: "tasks", icon: <UnorderedListOutlined />, label: "All Tasks" },
// //     { key: "board", icon: <UnorderedListOutlined />, label: "Task Board" },
// //     { key: "schools", icon: <UnorderedListOutlined />, label: "Schools" },
// //   ];

// //   const renderContent = () => {
// //     switch (active) {
// //       case "create":
// //         return <CreateTask />;
// //       case "tasks":
// //         return <AllTasks />;
// //       case "board":
// //         return <TaskBoard />;
// //       case "schools":
// //         return <SchoolBoard />;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <Layout style={{ minHeight: "100vh" }}>
// //       {/* Desktop Sidebar */}
// //       <Sider
// //         breakpoint="lg"
// //         collapsedWidth="0"
// //         style={{ display: "none", }}
// //         className="desktop-sider"
// //       >
// //         <div style={{ color: "#fff", padding: 16, fontSize: 18 }}>
// //           Admin Panel
// //         </div>
// //         <Menu
// //           theme="dark"
// //           mode="inline"
// //           selectedKeys={[active]}
// //           onClick={(e) => setActive(e.key)}
// //           items={menuItems}
// //         />
// //       </Sider>

// //       <Layout>
// //         <Header
// //           style={{
// //             background: "#fff",
// //             padding: "0 16px",
// //             display: "flex",
// //             alignItems: "center",
// //             justifyContent: "space-between",
// //           }}
// //         >
// //           {/* Mobile Menu Button */}
// //           <Button
// //             icon={<MenuOutlined />}
// //             type="text"
// //             onClick={() => setDrawerOpen(true)}
// //             style={{ fontSize: 20 }}
// //           />

// //           <span style={{ fontWeight: "bold", fontSize: 18 }}>
// //             Admin Dashboard
// //           </span>
// //         </Header>

// //         <Content
// //           style={{
// //             margin: 16,
// //             padding: 16,
// //             background: "#fff",
// //             borderRadius: 8,
// //           }}
// //         >
// //           {renderContent()}
// //         </Content>
// //       </Layout>

// //       {/* Mobile Drawer */}
// //       <Drawer
// //         title="Admin Panel"
// //         placement="left"
// //         open={drawerOpen}
// //         onClose={() => setDrawerOpen(false)}
// //         bodyStyle={{ padding: 0 }}
// //       >
// //         <Menu
// //           mode="inline"
// //           selectedKeys={[active]}
// //           onClick={(e) => {
// //             setActive(e.key);
// //             setDrawerOpen(false);
// //           }}
// //           items={menuItems}
// //         />
// //       </Drawer>
// //     </Layout>
// //   );
// // };

// // export default AdminDashboard;

// import React, { useState, useEffect, useRef } from "react";
// import { Button, Modal, Dropdown } from "antd";
// import { useWindowSize } from "react-use";
// import {
//   UserOutlined,
//   SolutionOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";

// import api from "../api/axiosClient";
// import mathBg from "../images/math-bg.png";

// import Login from "./Login";
// import Signup from "./Signup";
// import OnlinePage from "./OnlinePage";
// import HomeSection from "./HomeSection";
// import ContactFooter from "./ContactFooter";

// const HomePage = ({ user, setUser }) => {
//   const { width } = useWindowSize();
//   const isMobile = width < 768;

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   const onlineRef = useRef(null);
//   const contactRef = useRef(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/auth/getMe");
//         setUser(res.data);
//       } catch {}
//     };
//     fetchUser();
//   }, [setUser]);

//   /* ===== MOBILE MENU (SAFE: NO COMPONENTS INSIDE) ===== */
//   const mobileMenuItems = [
//     {
//       key: "login",
//       label: "Login",
//       icon: <UserOutlined />,
//       onClick: () => {
//         setIsLogin(true);
//         setModalOpen(true);
//       },
//     },
//     {
//       key: "signup",
//       label: "Sign Up",
//       icon: <SolutionOutlined />,
//       onClick: () => {
//         setIsLogin(false);
//         setModalOpen(true);
//       },
//     },
//     {
//       key: "online",
//       label: "Online Class",
//       icon: <TeamOutlined />,
//       onClick: () =>
//         onlineRef.current?.scrollIntoView({ behavior: "smooth" }),
//     },
//     {
//       key: "contact",
//       label: "Contact",
//       onClick: () =>
//         contactRef.current?.scrollIntoView({ behavior: "smooth" }),
//     },
//   ];

//   return (
//     <div style={{ minHeight: "100vh", background: "#000" }}>
//       {/* ================= MOBILE HERO ================= */}
//       {isMobile && (
//         <div
//           style={{
//             minHeight: "100vh",
//             backgroundImage: `url(${mathBg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             position: "relative",
//             padding: "20px",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//           }}
//         >
//           {/* Hamburger */}
//           <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
//             <Dropdown
//               menu={{ items: mobileMenuItems }}
//               placement="bottomRight"
//               trigger={["click"]}
//             >
//               <Button
//                 type="text"
//                 style={{ fontSize: 24, color: "#fff" }}
//               >
//                 ☰
//               </Button>
//             </Dropdown>
//           </div>

//           {/* CENTER AREA */}
//           <div
//             style={{
//               flex: 1,
//               display: "flex",
//              // textAlign:"center"
//              // alignItems: "center",
//               justifyContent: "center",
//               marginTop: 40
//             }}
//           >
//             {/* Red Circle */}
//             <div
//               style={{
//                 width: 130,
//                 height: 130,
//                 borderRadius: "50%",
//                 background: "#c40000",
//                 display: "flex",
//                 alignItems: "center",
//                justifyContent: "center",
//                 boxShadow: "0 8px 26px rgba(0,0,0,0.6)",
//                 animation: "pulseGlow 2.8s infinite",
//               }}
//             >
//               <div
//                 style={{
//                   color: "#fff",
//                   textAlign: "center",
//                   fontWeight: 800,
//                   fontSize: 18,
//                   lineHeight: 1.15,
//                   letterSpacing: 0.4,
//                 }}
//               >
//                 Flair
//                 <br />
//                 Olympiad
//               </div>
//             </div>
//           </div>
//  {/* Headline */}
//             <h1
//               style={{
//                 fontSize: 42,
//                 fontWeight: 900,
//                 lineHeight: 1.1,
//                 color: "#f6f8f5ff",
//                 margin: 0,
//                 marginBottom:0
//               }}
//             >
//               Shaping
             
//               Brilliant
              
//               Minds
//             </h1>
//           {/* CTA */}
//           <div style={{ paddingBottom: 12 ,textAlign:"center"}}>
//             <Button
//               size="large"
//               style={{
//                 width: "59%",
//                 background: "#c40000",
//                 border: "none",
//                 height: 48,
//                 borderRadius: 12,
//                 fontSize: 16,
//                 fontWeight: 700,
//                 color: "#fff",
//                 animation: "ctaBounce 3.2s infinite",
//               }}
//               onClick={() => {
//                 setIsLogin(true);
//                 setModalOpen(true);
//               }}
//             >
//               LOGIN FOR MENTAL FEAST
//             </Button>
//           </div>
//         </div>
//       )}

//       {/* ================= DESKTOP / TABLET ================= */}
//       {!isMobile && (
//         <>
//           <HomeSection />
//           <div ref={onlineRef}>
//             <OnlinePage />
//           </div>
//           <div ref={contactRef}>
//             <ContactFooter />
//           </div>
//         </>
//       )}

//       {/* ================= AUTH MODAL ================= */}
//       <Modal
//         open={modalOpen}
//         footer={null}
//         centered
//         onCancel={() => setModalOpen(false)}
//       >
//         {isLogin ? (
//           <Login onSuccess={() => setModalOpen(false)} setUser={setUser} />
//         ) : (
//           <Signup onSuccess={() => setModalOpen(false)} setUser={setUser} />
//         )}
//       </Modal>

//       {/* ================= ANIMATIONS ================= */}
//       <style>
//         {`
//           @keyframes pulseGlow {
//             0% {
//               transform: scale(1);
//               box-shadow: 0 0 0 rgba(196,0,0,0.6);
//             }
//             50% {
//               transform: scale(1.05);
//               box-shadow: 0 0 24px rgba(196,0,0,0.9);
//             }
//             100% {
//               transform: scale(1);
//               box-shadow: 0 0 0 rgba(196,0,0,0.6);
//             }
//           }

//           @keyframes ctaBounce {
//             0%, 100% { transform: translateY(0); }
//             50% { transform: translateY(-3px); }
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default HomePage;
