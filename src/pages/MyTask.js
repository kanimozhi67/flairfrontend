import { useEffect, useState } from "react";
import { Card, Spin, Row, Col, Empty, Button, message } from "antd";
import { Link } from "react-router-dom";
import api from "../api/axiosClient";
import { categoryRouteMap } from "../utils/categoryRouteMap";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch today's tasks
  const fetchTasks = async () => {
    try {
      const res = await api.get("/users/todaytask");
      setTasks(res.data);
    } catch (err) {
      message.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <Spin size="large" />;
  if (!tasks.length) return <Empty description="No tasks available" />;

  return (
    <Row gutter={[16, 16]}>
      {tasks.map((task) => (
        <Col xs={24} md={12} lg={8} key={task.userTaskId}>
          <Card
            title={task.title}
            extra={
              <span style={{ color: "green", fontWeight: "bold" }}>
                Active
              </span>
            }
          >
            {task.categories.map((cat) =>
              cat.levels.map((lvl) => {
                const route = categoryRouteMap[cat.name];

                return (
                  <div
                    key={`${cat.name}-${lvl.selectedLevel}`}
                    style={{ marginBottom: 12 }}
                  >
                    <p>
                      <strong>Category:</strong> {cat.name}
                    </p>
                    <p>
                      <strong>Level:</strong> {lvl.selectedLevel}
                    </p>

                    {route ? (
                      <Link
                        to={`${route}?selectedLevel=${lvl.selectedLevel}&userTaskId=${task.userTaskId}&category=${encodeURIComponent(
                          cat.name
                        )}`}
                      >
                        <Button type="primary" size="small">
                          Start Task
                        </Button>
                      </Link>
                    ) : (
                      <p style={{ color: "red" }}>
                        Route not found for this category
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MyTask;
