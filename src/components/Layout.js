

import React, { useEffect, useState } from "react"; 
import { Layout as AntLayout, Avatar, Menu, Dropdown, Button ,Badge} from "antd";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { MenuOutlined } from "@ant-design/icons";
import api from "../api/axiosClient";
import avat from "../images/rabbitAvatar.png";

const { Header, Sider, Content } = AntLayout;

const Layout = ({ user, setUser,todayTaskCount }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [todayScore, setTodayScore] = useState(0);
  const [initializing, setInitializing] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
//const todayTaskCount=3;
  const TaskBadge = ({ count, isMobile }) => (
  <Badge
    count={count}
    size="small"
    offset={isMobile ? [8, -2] : [4, -4]}
  >
    <span style={{ fontSize: isMobile ? 16 : 18 }}></span>
  </Badge>
);

  const menuItems = [
    { key: "home", label: "🏠 Home", path: "/categories" },
    ...(user?.role === "Admin"
      ? [{ key: "admin", label: "🛠 Admin Panel", path: "/admin" }]
      : user?.role === "SchoolAdmin" 
      ? [{ key: "schooladmin", label: "🛠 School Admin Panel", path: "/schooladmin" }]
      : user?.role === "Teacher" 
      ? [{ key: "teacher", label: "🛠 Teacher Panel", path: "/teacher" }]
       :[
        // { key: "task", label: "🎯 Today's Task", path: "/task" },
{
  key: "task",
  label: (
    <span style={{ display: "flex",marginLeft:30,
     alignItems: "center", gap: 8 
     }}>
    🎯 Today's Task<TaskBadge count={todayTaskCount} isMobile={false} />
    
    </span>
  ),
  path: "/task",
},


         { key: "mystickers", label: "👝 My Stickers", path: "/mystickers" },
      ]),
    { key: "dashboard", label: "🏆 Dashboard", path: "/quiz/progress" },
   
    { key: "getMe", label: "👶 My Profile", path: "/profile" },
  ];

  const menuItems2 = [
    { key: "home", label: "🏠 ", path: "/categories" },
    ...(user?.role === "Admin"
      ? [{ key: "admin", label: "🛠", path: "/admin" }]
      : user?.role === "SchoolAdmin" 
      ? [{ key: "schooladmin", label: "🛠S", path: "/schooladmin" }]
      : [
        
       
      //  { key: "task", label: "🎯 ", path: "/task" },
{
  key: "task",
  label: (
    <span style={{ display: "flex",
     alignItems: "center", gap: 8 
     }}>
    🎯<TaskBadge count={todayTaskCount} isMobile={true} />
    
    </span>
  ),
  path: "/task",
},
 { key: "mystickers", label: "👝 ", path: "/mystickers" },

      ]),
    { key: "dashboard", label: "🏆 ", path: "/quiz/progress" },
   
    { key: "getMe", label: "👶 ", path: "/profile" },
  ];

  const noSidebarRoutes = ["/login", "/signup", "/"];
  const showSidebar =
    user &&
    !noSidebarRoutes.includes(location.pathname) &&
    !location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setCollapsed(windowWidth < 768), [windowWidth]);

  useEffect(() => {
    const restoreUser = async () => {
        const token = localStorage.getItem("token");

    if (!token) return; // ⛔ stop auto-login
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
        setTodayScore(res.data?.todayPoints || 0);
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
      {/* Main header */}
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
            position: "relative", // allows absolute positioning for the back button
          }}
        >
          <div  style={{ display: "flex",
           justifyContent: "center",
            alignItems: "center" }}>
 <button
  onClick={() => navigate("/")}
  style={{
    
    textDecoration: "none",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
    color: "inherit",
  }}
>
  🎓 FLAIR OLYMPIAD ✨
</button></div>
<div  style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
 <button
  onClick={() => navigate("/")}
  style={{
     position: "absolute",
      right: 1, // distance from right edge
    textDecoration: "none",
   // background: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: 24,
    fontWeight: 700,
    color: "inherit",
  }}
>
  🔙
</button>
</div>
        </Header>
      </motion.div>

      {/* Mobile header */}
      {windowWidth < 768 && showSidebar && user && (
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "6px 12px",
            background: "#200202ff",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: 12, overflowX: "auto" }}>
            {windowWidth < 360 ? (
              <Dropdown overlay={mobileMenu} placement="bottomLeft" trigger={["click"]}>
                <Button type="primary" icon={<MenuOutlined />} />
              </Dropdown>
            ) : (
              menuItems2.map((item) => (
                <div
                  key={item.key}
                  style={{ cursor: "pointer", fontSize: 24, whiteSpace: "nowrap" }}
                  onClick={() => {
                    const path = findItemPath(menuItems2, item.key);
                    if (path) navigate(path);
                  }}
                >
                  {item.label}
                </div>
              ))
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              justifyContent: "space-between",
            }}
          >
            <div style={{ textAlign: "right", fontSize: 16, color: "white" }}>
              <div>
                {user?.username
                  ? user.username.length <= 7
                    ? user.username
                    : `${user.username.slice(0, 7)}..`
                  : "Guest"}
                ⭐ {todayScore}
              </div>
            </div>
            <Avatar
              size={windowWidth < 360 ? 32 : 40}
              src={user?.avatar ? avat  : avat}
            />
          </div>
        </Header>
      )}

      <AntLayout style={{ flex: 1, display: "flex", minHeight: 0 }}>
        {/* Desktop sidebar */}
        {windowWidth >= 768 && showSidebar && user && (
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
              size={collapsed ? 90 : 120}
              src={user?.avatar ?  avat : avat}
              style={{ width: "30%" }}
            />
            <h2 style={{ fontSize: collapsed ? 16 : 22, marginBottom: 10 }}>
              {user?.username || "Guest"}
            </h2>
            <p style={{ fontSize: collapsed ? 14 : 18, fontWeight: "bold" }}>
              ⭐ {todayScore}
            </p>

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

        <Content style={{ flex: 1, minHeight: 0, overflow: "auto", padding: 16 }}>
          <Outlet context={{ user, setUser }} />
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
