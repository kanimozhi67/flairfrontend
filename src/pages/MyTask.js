import { useEffect, useState } from "react";
import { Card, Spin, Row, Col, Empty, Button, message } from "antd";
import { Link } from "react-router-dom";
import api from "../api/axiosClient";
import { categoryRouteMap } from "../utils/categoryRouteMap";

const MyTask = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/users/todaytask`);
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
  if (!tasks.length) return <Empty description="No tasks created yet" />;

  return (
    <Row gutter={[16, 16]}>
      {tasks.map((task) => (
        <Col xs={24} md={12} lg={8} key={task._id}>
          <Card
            title={task.title}
            bordered
            extra={
              <span
                style={{
                  fontWeight: "bold",
                  color: task.active ? "green" : "red",
                }}
              >
                {task.active ? "Active" : "Inactive"}
              </span>
            }
          > 
       
           
            {task.description && (
              <p>
                Description:{" "}
                <strong style={{ color: "red" }}>{task.description}</strong>
              </p>
            )}

            {task.categories.map((cat) => {
              const route = categoryRouteMap[cat.name];

              // Safety check
              if (!route) return null;

              return (
                <div key={cat._id} style={{ marginBottom: 10 }}>
                  <strong>{cat.name}</strong>

                  <div style={{ marginTop: 6 }}>
                    {cat.levels.map((lvl) => (
                      // <Link
                      //   key={lvl._id}
                      //   to={`${route}?level=${lvl.level}&selectedLevel=${lvl.selectedLevel}`}
                      // >
                      <Link
                        key={lvl._id}
                        to={`${route}?level=${lvl.level}&selectedLevel=${lvl.selectedLevel}&taskId=${task._id}`}
                      >
                        <Button
                          type="primary"
                          size="small"
                          disabled={lvl.completed}
                          style={{ marginRight: 8, marginBottom: 6 }}
                        >
                          {lvl.completed ? "Completed ✅" : "Start Task"}
                        </Button>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default MyTask;
