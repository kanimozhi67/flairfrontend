import { Layout, Menu } from "antd";
import { PlusOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { useState } from "react";
import CreateTask from "./CreateTask";
import AllTasks from "./AllTasks";
import TaskBoard from "./TaskBoard";
import SchoolBoard from "./SchoolBoard";

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [active, setActive] = useState("create");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "#fff", padding: 16, fontSize: 18 }}>Admin Panel</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["create"]}
          onClick={(e) => setActive(e.key)}
          items={[
            { key: "create", icon: <PlusOutlined />, label: "Create Task" },
            { key: "tasks", icon: <UnorderedListOutlined />, label: "All Tasks" },
            { key: "board", icon: <UnorderedListOutlined />, label: "Task Board" },
            { key: "schools", icon: <UnorderedListOutlined />, label: "Schools" },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 20, fontWeight: "bold", fontSize: 20 }}>
          Admin Dashboard
        </Header>

        <Content style={{ margin: 16, fontWeight: "bold" }}>
          {active === "create" && <CreateTask />}
          {active === "tasks" && <AllTasks />}
          {active === "board" && <TaskBoard />}
          {active === "schools" && <SchoolBoard />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
