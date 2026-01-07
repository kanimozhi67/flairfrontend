import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Card,
  Tag,
  Spin,
  Row,
  Col,
  Empty,
  message,
  Button,
  Space,
  Grid,
} from "antd";
import api from "../../api/axiosClient";

const { useBreakpoint } = Grid;

const TAllTasks = ({user}) => {
  const screens = useBreakpoint();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/admin/sgettask");
     // setTasks(res.data);
     console.log("taskdata",res.data)
 const filteredByClass = res.data.filter((task) =>
  task.className?.toLowerCase().includes(user.className.toLowerCase()) &&
  task.section?.toLowerCase().includes(user.section.toLowerCase())
);

setTasks(filteredByClass);

    } catch {
      message.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

 
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await api.delete(`/admin/task/${taskId}`);
      message.success("Task deleted successfully");
      fetchTasks();
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to delete task");
    }
  };

  if (loading) return <Spin size="large" />;
  if (!tasks.length) return <Empty description="No tasks created yet" />;

  const kindergartenCount = tasks.filter(t => t.level === "kindergarten").length;
  const primaryCount = tasks.filter(t => t.level === "primary").length;

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
          Kindergarten ({kindergartenCount})
        </Button>

        <Button
          type={selectedLevel === "primary" ? "primary" : "default"}
          onClick={() => setSelectedLevel("primary")}
        >
          Primary ({primaryCount})
        </Button>

        <Button onClick={() => setSelectedLevel(null)}>
          All ({tasks.length})
        </Button>
      </Space>

      <Row gutter={[16, 16]}>
        {filteredTasks.map((task) => (
          <Col
            key={task._id}
            xs={24}
            sm={24}
            md={12}
            lg={8}
            xl={6}
          >
            <Card
              title={task.title}
              extra={
                <Tag color={task.active ? "green" : "red"}>
                  {task.active ? "Active" : "Inactive"}
                </Tag>
              }
              style={{
                height: "100%",
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <p>
                <strong>Date:</strong> {task.date}
              </p>

              {task.description && (
                <p>
                  <strong>Description:</strong> {task.description}
                </p>
              )}

              <p><strong>Categories:</strong></p>

              {task.categories.map((cat) => (
                <div key={cat._id} style={{ marginBottom: 6 }}>
                  <Tag color="blue">{cat.name}</Tag>
                  {cat.levels.map((lvl, idx) => (
                    <Tag color="purple" key={idx}>
                      {lvl.level} – Level {lvl.selectedLevel}
                    </Tag>
                  ))}
                </div>
              ))}

              <Button
                danger
                type="primary"
                block={!screens.md}
                icon={<DeleteOutlined />}
                style={{ marginTop: 12 }}
                onClick={() => handleDelete(task._id)}
              >
                Delete Task
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default TAllTasks;
