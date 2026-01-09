import { useEffect, useState } from "react";
import { Card, Spin, Row, Col, Empty, Button, message } from "antd";
import { Link } from "react-router-dom";
import api from "../api/axiosClient";
import { categoryRouteMap } from "../utils/categoryRouteMap";

const MyTask = ({user}) => {
 // console.log("user in MyTask" , user);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch today's tasks
  const fetchTasks = async () => {
    try {
      if(user.role === "Student")
      {
        const res = await api.get("/users/todaytaskstudent");
      setTasks(res.data);
        }
      
        else{
      const res = await api.get("/users/todaytask");
      setTasks(res.data);
        }
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
    <div style={{  minHeight: "100vh", 
       // display: "flex", 
        background: "linear-gradient(135deg, #ffd194, #6a11cb)", 
        padding: 20 }}>
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
                    style={{ marginBottom: 12,textAlign:"center" ,}}
                  >
                  

                    {route ? (
                      <Link
                        to={`${route}?selectedLevel=${lvl.selectedLevel}&userTaskId=${task.userTaskId}&category=${encodeURIComponent(
                          cat.name
                        )}`}
                      >
                        <Button  style={{textAlign:"center", background: "#ffbf00",
                    color: "#4d3300",padding:10,fontSize:20,
                      borderRadius:15,width:180}} type="primary" size="small">
                          <p style={{textAlign:"center", background: "#ffbf00",
                    color: "#4d3300",padding:10,fontSize:20,
                      borderRadius:15,width:280}}>
                     <strong>  {cat.name}<br></br>
                    
                     Level: {lvl.selectedLevel}</strong>
                    </p>
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
    </div>
  );
};

export default MyTask;
