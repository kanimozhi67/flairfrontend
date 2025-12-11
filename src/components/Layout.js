import React, { useEffect, useState } from "react";
import { Layout as AntLayout, Avatar, Menu, Dropdown, Button } from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { MenuOutlined } from "@ant-design/icons";
import api from "../api/axiosClient";

const { Header, Sider, Content } = AntLayout;

const Layout = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [todayScore, setTodayScore] = useState(0);
  const [initializing, setInitializing] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const menuItems = [
    { key: "home", label: "🏠 Home", path: "/categories" },
    { key: "dashboard", label: "📈 Dashboard", path: "/quiz/progress" },
    { key: "getMe", label: "👶 My Profile", path: "/auth/getMe" },
  ];

  const noSidebarRoutes = ["/login", "/signup", "/"];
  const showSidebar = user && !noSidebarRoutes.includes(location.pathname);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setCollapsed(windowWidth < 768), [windowWidth]);

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await api.get("/auth/getMe");
        setUser(res.data);
      } catch {
        console.log("User not logged in");
      } finally {
        setInitializing(false);
      }
    };
    if (!user) restoreUser();
    else setInitializing(false);
  }, [user, setUser]);

  useEffect(() => {
    if (!user) return;
    const fetchTodayScore = async () => {
      
      try {
        const res = await api.get("/quiz/progress/today");
        setTodayScore(res.data.points);
      } catch {
        console.error("Failed to load today's progress");
      } 
    };
    fetchTodayScore();
    window.addEventListener("scoreUpdated", fetchTodayScore);
    return () => window.removeEventListener("scoreUpdated", fetchTodayScore);
  }, [user]);

  if (initializing)
    return <div style={{ padding: 50, textAlign: "center" }}>Loading...</div>;

  const findItemPath = (items, key) => {
    for (const item of items) {
      if (item.key === key && item.path) return item.path;
    }
    return null;
  };

  // Dropdown menu for very small screens
  const mobileMenu = (
    <Menu
      items={menuItems.map((item) => ({
        ...item,
        onClick: () => {
          const path = findItemPath(menuItems, item.key);
          if (path) navigate(path);
        },
      }))}
    />
  );

  return (
    <AntLayout style={{ minHeight: "100vh", background: "#FFF6E9" }}>
      {/* Main header (app title only) */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <Header
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "10px 16px",
            background: "linear-gradient(135deg, #9B59B6, #6D3FAF)",
            color: "#fff",
            fontWeight: 900,
            fontSize: windowWidth < 360 ? 18 : 24,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          }}
        >
          🎓 FLAIR OLYMPIAD ✨
        </Header>
      </motion.div>

      {/* Secondary header for mobile/tablet */}
      {windowWidth < 768 && showSidebar && (
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 12px",
            background: "#fff5e6",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          {/* Menu items or hamburger */}
          <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
            {windowWidth < 360 ? (
              <Dropdown overlay={mobileMenu} placement="bottomLeft" trigger={["click"]}>
                <Button type="primary" icon={<MenuOutlined />} />
              </Dropdown>
            ) : (
              menuItems.map((item) => (
                <div
                  key={item.key}
                  style={{ cursor: "pointer", fontSize: 14, whiteSpace: "nowrap" }}
                  onClick={() => {
                    const path = findItemPath(menuItems, item.key);
                    if (path) navigate(path);
                  }}
                >
                  {item.label}
                </div>
              ))
            )}
          </div>

          {/* Avatar + score */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ textAlign: "right", fontSize: 12 }}>
           //   <div>{user.username}</div>
           //   <div>⭐ {todayScore}</div>
            </div>
            <Avatar
              size={windowWidth < 360 ? 32 : 40}
              src={user.avatar ? `http://localhost:5000${user.avatar}` : "/default-avatar.png"}
            />
          </div>
        </Header>
      )}

      <AntLayout style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Sidebar for desktop */}
        {windowWidth >= 768 && showSidebar && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={250}
            style={{
              background: "#fff5e6",
              paddingTop: 20,
              textAlign: "center",
              boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
              height: "100%",
              overflow: "visible",
            }}
          >
            <Avatar
              size={collapsed ? 100 : 180}
              src={user.avatar ? `http://localhost:5000${user.avatar}` : "/default-avatar.png"}
              style={{ width: "70%", marginBottom: 20 }}
            />
            <h2 style={{ fontSize: collapsed ? 16 : 22, marginBottom: 10 }}>{user?.username}</h2>
            <p style={{ fontSize: collapsed ? 14 : 18, fontWeight: "bold" }}>⭐ {todayScore}</p>

            <Menu
              mode="inline"
              inlineCollapsed={collapsed}
              style={{
                marginTop: 30,
                borderRight: 0,
                fontSize: 18,
                fontWeight: 500,
                backgroundColor: "beige",
                border: "1px solid gray",
                height: "calc(100% - 250px)",
                overflowY: "auto",
              }}
              items={menuItems}
              onClick={({ key }) => {
                const path = findItemPath(menuItems, key);
                if (path) navigate(path);
              }}
              
            />
          </Sider>
        )}

        {/* Content */}
        <Content style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 16 }}>
          <Outlet context={{ user, setUser }} />
          
        </Content>
      </AntLayout>
    </AntLayout>
    
  );
};


export default Layout;


// import React, { useEffect, useState } from "react";
// import { Layout as AntLayout, Avatar, Menu } from "antd";
// import { useNavigate, useLocation, Outlet } from "react-router-dom";
// import { motion } from "framer-motion";
// import api from "../api/axiosClient";

// const { Header, Sider, Content } = AntLayout;

// const Layout = ({ children, user, setUser }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);
//   const [todayScore, setTodayScore] = useState(0);
//   const [initializing, setInitializing] = useState(true);

//   const menuItems = [
//     { key: "home", label: "🏠 Home", path: "/categories" },
//     { key: "dashboard", label: " 📈 Dashboard", path: "/quiz/progress" },
    
//     { key: "getMe", label: "👶 My Profile", path: "/auth/getMe" },
   
//   ];

//   const noSidebarRoutes = ["/login", "/signup", "/"];
//   useEffect(() => {
//     const restoreUser = async () => {
//       try {
//         const res = await api.get("/auth/getMe");
//         setUser(res.data);
//       } catch (err) {
//         console.log("User not logged in");
//       } finally {
//         setInitializing(false);
//       }
//     };

//     if (!user) restoreUser();
//     else setInitializing(false);
//   }, []);

//   const showSidebar = user && !noSidebarRoutes.includes(location.pathname);

//   // useEffect(() => {
//   //   const fetchTodayScore = async () => {
//   //     try {
//   //       const res = await api.get("/quiz/progress/today");
//   //       setTodayScore(res.data.points);
//   //     } catch (err) {
//   //       console.error("Failed to load today's progress");
//   //     }
//   //   };
//   //   if (user) fetchTodayScore();
//   // }, [user]);
//  useEffect(() => {
//   if (!user) return;

//   const fetchTodayScore = async () => {
//     try {
//       const res = await api.get("/quiz/progress/today");
//       setTodayScore(res.data.points);
//     } catch (err) {
//       console.error("Failed to load today's progress");
//     }
//   };

//   // Fetch immediately when user logs in / refreshes
//   fetchTodayScore();

//   // Update score when quiz is finished
//   window.addEventListener("scoreUpdated", fetchTodayScore);

//   return () => {
//     window.removeEventListener("scoreUpdated", fetchTodayScore);
//   };
// }, [user]);

//   // ✔ Prevent sidebar flicker while restoring user
//   if (initializing) {
//     return <div style={{ padding: 50, textAlign: "center" }}>Loading...</div>;
//   }
//   return (
//    <AntLayout
//   style={{
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #FFF6E9, #FFE0B2)", // New background
//     padding: 0,
//     margin: 0,
//   }}
// >

//       {/* Header with animation */}
//     <motion.div
//   initial={{ y: -80, opacity: 0 }}
//   animate={{ y: 0, opacity: 1 }}
//   transition={{ duration: 0.8, type: "spring" }}
// >
// <Header
//   style={{
//     background: "linear-gradient(135deg, #9B59B6, #6D3FAF)",  //  change color here
//     color: "#fff",
//     fontSize: 30,
//     fontWeight: "900",
//     textAlign: "center",
//     padding: "15px 0",
//     letterSpacing: "1px",
//     borderBottom: "4px solid rgba(255,255,255,0.3)",
//     boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "12px",
//   }}
// >
//   🎓 <span>FLAIR OLYMPIAD</span> ✨
// </Header>

// </motion.div>


//       <AntLayout>
//         {showSidebar && (
//           <Sider
//             collapsible
//             collapsed={collapsed}
//             onCollapse={(val) => setCollapsed(val)}
//             width={250}
//             style={{
//               background: "#fff5e6",
//               paddingTop: 20,
//               textAlign: "center",
//               boxShadow: "2px 0 6px rgba(0,0,0,0.1)",
//             }}
//           >
//               <Avatar
//              size={180}
//              src={user.avatar ? `http://localhost:5000${user.avatar}` : "/default-avatar.png"}
//              style={{ marginBottom: 20 }}
//            />
//             <h2 style={{ fontSize: collapsed ? 16 : 22, marginBottom: 10 }}>
//               {user?.username ?? "Guest"}
//             </h2>
//             <p style={{ fontSize: collapsed ? 14 : 18, fontWeight: "bold" }}>
//               Today’s Score: {todayScore} ⭐
//             </p>

//             <Menu
//               mode="inline"
//               style={{ marginTop: 30, borderRight: 0,  fontSize: 20 , fontWeight:500 , backgroundColor:"beige", border:"1px solid gray"}}
//               items={menuItems}
//               onClick={({ key }) => {
//                 const item = menuItems.find((i) => i.key === key);
//                 if (item) navigate(item.path);
//               }}
//             />
//           </Sider>
//         )}

//         <Content style={{ padding: "20px", minHeight: "100vh" }}>
//           {/* Use Outlet for nested routes */}
//           <Outlet context={{ user, setUser }} />
//         </Content>
//       </AntLayout>
//     </AntLayout>
//   );
// };

// export default Layout;
