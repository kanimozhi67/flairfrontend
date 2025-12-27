import { useEffect, useState } from "react";
import { Card, Row, Col, Spin, Empty, Tag, Table } from "antd";
import api from "../../api/axiosClient";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <Row gutter={[16, 16]}>
      {tasks.map((task) => (
     

        <Col xs={24} key={task.taskId}>
  <Card
    title={task.title}
    type="default" // or "inner" if you want a slightly different style
    style={{
        width:"60%",
      marginBottom: 16,
      border: "1px solid #f0f0f0", // custom border instead of `bordered`
      borderRadius: 6,              // optional rounded corners
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)" // optional subtle shadow
    }}
    extra={
      <Tag color={task.active ? "green" : "red"}>
        {task.active ? "Active" : "Inactive"}
      </Tag>
    }
  >
   
            <p>
              <strong>Date:</strong> {task.date}
            </p>
            <p>
              <strong>Categories:</strong> {task.categories.join(", ")} 
             
            </p>

            <Table
              dataSource={task.completedStudents}
              columns={[
                { title: "Name", dataIndex: "username", key: "username" },
               // { title: "Email", dataIndex: "email", key: "email" },
                { title: "Points", dataIndex: "totalPoints", key: "points" },
              ]}
              rowKey={(record) => record.email}
              pagination={false}
              locale={{ emptyText: "No students completed this task yet" }}
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TaskBoard;
