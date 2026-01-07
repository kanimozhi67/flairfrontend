import {
  Layout,
  Menu,
  Button,
  Drawer,
  Grid,
} from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import CreateTask from "./CreateTask";
import AllTasks from "./AllTasks";
import TaskBoard from "./TaskBoard";
import SchoolBoard from "./SchoolBoard";
import { Navigate, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const AdminDashboard = () => {
  const navigate= useNavigate();
  const [active, setActive] = useState("create");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();

  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;

  const menuItems = [
    { key: "create", icon: <PlusOutlined />, label: "Create Task" },
    { key: "tasks", icon: "📚  ", label: "All Tasks" },
    { key: "board", icon: "📝 ", label: "Task Board" },
    { key: "schools", icon: "🏫 ", label: "Schools" },
    { key: "back", icon: "🔙 ", label: "back" },
  ];

  const renderContent = () => {
    switch (active) {
      case "create":
        return <CreateTask />;
      case "tasks":
        return <AllTasks />;
      case "board":
        return <TaskBoard />;
      case "schools":
        return <SchoolBoard />;
      case "back":
        return navigate("/categories");
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar for Tablet & Desktop */}
      {!isMobile && (
        <Sider
          collapsible
           collapsed={collapsed}
  onCollapse={(value) => setCollapsed(value)}
          // collapsed={isTablet}
          width={220}
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          <div style={{ color: "#fff", padding: 16, fontSize: 18 }}>
            Admin Panel
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[active]}
            onClick={(e) => setActive(e.key)}
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
            Admin Dashboard
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
  style={{ width: 300 }} // sets drawer width
  className="custom-drawer"
>
  <div style={{ padding: 0 }}> 
        <Menu
          mode="inline"
          selectedKeys={[active]}
          onClick={(e) => {
            setActive(e.key);
            setDrawerOpen(false);
          }}
          items={menuItems}
        />
        </div>
      </Drawer>
    </Layout>
  );
};

export default AdminDashboard;
