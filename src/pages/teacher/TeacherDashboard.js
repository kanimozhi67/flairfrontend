import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, Grid } from "antd";
import { PlusOutlined, MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import TSchoolBoard from "./TSchoolBoard";
import TCreateTask from "./TCreateTask";
import TAllTask from "./TAllTask";
import TTaskBoard from "./TTaskBoard";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const TeacherDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("create");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  const menuItems = [
    { key: "create", icon: <PlusOutlined />, label: "Create Task" },
    { key: "tasks", icon: <span>📚</span>, label: "All Tasks" },
    { key: "board", icon: <span>📝</span>, label: "Task Board" },
    { key: "students", icon: <span>🏫</span>, label: "Students" },
    { key: "back", icon: <span>🔙</span>, label: "Back" },
  ];

  const renderContent = () => {
    switch (active) {
      case "create":
        return <TCreateTask user={user} />;
      case "tasks":
        return <TAllTask user={user}/>;
      case "board":
        return <TTaskBoard user={user}/>;
      case "students":
        return <TSchoolBoard user={user} />;
      default:
        return null;
    }
  };

  const handleMenuClick = (e) => {
    if (e.key === "back") {
      navigate("/categories");
    } else {
      setActive(e.key);
      setDrawerOpen(false); // Close drawer on mobile
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for Tablet & Desktop */}
      {!isMobile && (
        <Sider
          collapsible
          collapsed={isTablet}
          width={220}
          style={{ position: "sticky", top: 0, height: "100vh", overflow: "auto" }}
        >
          <div style={{ color: "#fff", padding: 16, fontSize: 18, fontWeight: "bold" }}>
            Admin Panel
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[active]}
            onClick={handleMenuClick}
            items={menuItems}
          />
        </Sider>
      )}

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          {/* Mobile Menu */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setDrawerOpen(true)}
              style={{ fontSize: 20 }}
            />
          )}

          <span style={{ fontSize: screens.lg ? 20 : 16, fontWeight: "bold" }}>
            School Admin Dashboard
          </span>
        </Header>

        <Content
          style={{
            margin: screens.lg ? 24 : 12,
            padding: screens.lg ? 24 : 16,
            background: "#fff",
            borderRadius: 8,
            minHeight: "calc(100vh - 64px)",
          }}
        >
          {renderContent()}
        </Content>
      </Layout>

      {/* Mobile Drawer */}
      <Drawer
        title="Admin Panel"
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[active]}
          onClick={handleMenuClick}
          items={menuItems}
        />
      </Drawer>
    </Layout>
  );
};

export default TeacherDashboard;
