import { Layout, Menu } from "antd";
import {
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import CreateTask from "./CreateTask";
import AllTasks from "./AllTasks";



const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [active, setActive] = useState("create");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div style={{ color: "#fff", padding: 16, fontSize: 18 }}>
          Admin Panel
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["create"]}
          onClick={(e) => setActive(e.key)}
          items={[
            {
              key: "create",
              icon: <PlusOutlined />,
              label: "Create Task",
            },
            {
              key: "tasks",
              icon: <UnorderedListOutlined />,
              label: "All Tasks",
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 20 ,fontWeight:"bold" , fontSize:20}}>
          Admin Dashboard
        </Header>

        <Content style={{ margin: 16 ,fontWeight:"bold"  }}>
          {active === "create" && <CreateTask />}
           {active === "tasks" && <AllTasks />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
