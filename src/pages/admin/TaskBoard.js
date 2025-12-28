import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Empty, Tag, Table, Button, Space } from "antd";
import api from "../../api/axiosClient";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Fetch tasks from backend
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

  // Filter tasks by selected level
  const filteredTasks = selectedLevel
    ? tasks.filter((task) => task.level === selectedLevel)
    : tasks;

  return (
    <>
      {/* Level Filter Buttons */}
      <Space style={{ marginBottom: 20 }}>
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
          <Col xs={24} key={task.taskId}>
            <Card
              title={task.title}
              style={{
                width: "60%",
                marginBottom: 16,
                border: "1px solid #f0f0f0",
                borderRadius: 6,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
              extra={
                <Tag color={task.active ? "green" : "red"}>
                  {task.active ? "Active" : "Inactive"}
                </Tag>
              }
            >
              <p>
                <strong>Date:</strong> {task.date} &nbsp;
                <strong>Level:</strong> {task.level}
              </p>

              <p>
                <strong>Categories:</strong> {task.categories.join(", ")}
              </p>

              <Table
                dataSource={task.completedStudents}
                columns={[
                  { title: "Name", dataIndex: "username", key: "username" },
                  { title: "Email", dataIndex: "email", key: "email" },
                  { title: "Points", dataIndex: "totalPoints", key: "points" },
                  { title: "Level", dataIndex: "level", key: "level" },
                ]}
                rowKey={(record) => record.email}
                pagination={false}
                locale={{ emptyText: "No students completed this task yet" }}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TaskBoard;
