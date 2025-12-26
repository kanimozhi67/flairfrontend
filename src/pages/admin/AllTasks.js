import { useEffect, useState } from "react";
import {
  Card,
  Tag,
  Spin,
  Row,
  Col,
  Empty,
  Switch,
  message,
} from "antd";
import api from "../../api/axiosClient";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/admin/gettask");
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

  if (loading) {
    return <Spin size="large" />;
  }

  if (!tasks.length) {
    return <Empty description="No tasks created yet" />;
  }

  return (
    <Row gutter={[16, 16]}>
      {tasks.map((task) => (
        <Col xs={24} md={12} lg={8} key={task._id}>
          <Card
            title={task.title}
            bordered
            extra={
              <Tag color={task.active ? "green" : "red"}>
                {task.active ? "Active" : "Inactive"}
              </Tag>
            }
          >
            <p>
              <strong>Date:</strong> {task.date}
            </p>

            {task.description && (
              <p>
                <strong>Description:</strong> {task.description}
              </p>
            )}

            <p>
              <strong>Categories:</strong>
            </p>

            {task.categories.map((cat, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <Tag color="blue">{cat.name}</Tag>

                {cat.levels.map((lvl, i) => (
                  <Tag key={i} color="purple">
                    {lvl.level} - Level {lvl.selectedLevel}
                  </Tag>
                ))}
              </div>
            ))}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AllTasks;
