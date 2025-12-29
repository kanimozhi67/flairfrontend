import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spin,
  Empty,
  Tag,
  Table,
  Button,
  Space,
  Grid,
} from "antd";
import api from "../../api/axiosClient";

const { useBreakpoint } = Grid;

const TaskBoard = () => {
  const screens = useBreakpoint();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const fetchTaskBoard = async () => {
    try {
      const res = await api.get("/admin/taskboard");
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskBoard();
  }, []);

  if (loading) return <Spin size="large" />;
  if (!tasks.length) return <Empty description="No tasks available" />;

  const filteredTasks = selectedLevel
    ? tasks.filter((task) => task.level === selectedLevel)
    : tasks;

  return (
    <>
      {/* Filters */}
      <Space
        wrap
        size="middle"
        style={{ marginBottom: 20 }}
      >
        <Button
          type={selectedLevel === "kindergarten" ? "primary" : "default"}
          onClick={() => setSelectedLevel("kindergarten")}
        >
          Kindergarten
        </Button>

        <Button
          type={selectedLevel === "primary" ? "primary" : "default"}
          onClick={() => setSelectedLevel("primary")}
        >
          Primary
        </Button>

        <Button onClick={() => setSelectedLevel(null)}>All</Button>
      </Space>

      <Row gutter={[16, 16]}>
        {filteredTasks.map((task) => (
          <Col
            key={task.taskId}
            xs={24}
            md={24}
            lg={20}
            xl={16}
            xxl={14}
          >
            <Card
              title={task.title}
              style={{
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
              extra={
                <Tag color={task.active ? "green" : "red"}>
                  {task.active ? "Active" : "Inactive"}
                </Tag>
              }
            >
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12}>
                  <strong>Date:</strong> {task.date}
                </Col>
                <Col xs={24} sm={12}>
                  <strong>Level:</strong> {task.level}
                </Col>
              </Row>

              <p style={{ marginTop: 8 }}>
                <strong>Categories:</strong>{" "}
                {task.categories.join(", ")}
              </p>

              <Table
                dataSource={task.completedStudents}
                rowKey="email"
                size={screens.md ? "middle" : "small"}
                pagination={{
                  pageSize: screens.md ? 5 : 3,
                  showSizeChanger: false,
                }}
                scroll={{ x: "max-content" }}
                locale={{ emptyText: "No students completed this task yet" }}
                columns={[
                  { title: "Name", dataIndex: "username" },
                  { title: "Email", dataIndex: "email" },
                  { title: "Points", dataIndex: "totalPoints" },
                  { title: "Level", dataIndex: "level" },
                ]}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TaskBoard;
