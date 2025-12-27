import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import {
  Card,
  Tag,
  Spin,
  Row,
  Col,
  Empty,
  Switch,
  message,
  Button
} from "antd";
import api from "../../api/axiosClient";
  
const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);


const handleDelete = async (taskId) => {
  try {
    await api.delete(`/admin/task/${taskId}`);
    message.success("Task deleted successfully");
    // optionally, refresh task list
    fetchTasks();
  } catch (err) {
    message.error(err.response?.data?.message || "Failed to delete task");
  }
};



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

           {task.categories.map((cat) => (
  <div key={cat._id}>
    <Tag color="blue">{cat.name}</Tag>
    {cat.levels.map((lvl) => (
      <Tag color="purple">
        {lvl.level} - Level {lvl.selectedLevel}
      </Tag>
    ))}
  </div>
))}
<br></br>
<Button type="primary" danger icon={<DeleteOutlined />}
  onClick={() => handleDelete(task._id)} 
 >
  Delete
</Button>

          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default AllTasks;
