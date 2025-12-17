import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient";

const categories = [
  { id: 1, name: "Addition & Subtraction", path: "/quiz/math" },
  { id: 2, name: "Sorting", path: "/quiz/sorting" },
  { id: 3, name: "Multiplication", path: "/quiz/multiplication" },
  { id: 4, name: "Logical Questions", path: "/quiz/logic" },
  { id: 5, name: "Sudoku", path: "/quiz/sudoku" },
  { id: 6, name: "Puzzles", path: "/quiz/puzzles" },
];

const QuizCategories = ({ setUser }) => {
  const navigate = useNavigate();
  const [level, setLevel] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/getMe");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        padding: 10,
      }}
    >
      <Card
        title={
          <div
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#ff6b00",
              textAlign: "center",
              padding: 10,
            }}
          >
            🧠 {level ? "Select Quiz Category" : "Choose Level"}
          </div>
        }
        style={{
          width: "100%",
          maxWidth: 850, // responsive max width
          textAlign: "center",
          borderRadius: 20,
          padding: 0,
        }}
      >
        {/* STEP 1 — Choose Level */}
        {!level && (
          <Row gutter={[16, 16]} justify="center">
            {["kindergarten", "primary"].map((lvl) => (
              <Col key={lvl} xs={24} sm={12}>
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{
                    height: 100,
                    borderRadius: 15,
                    background: "#ffbf00",
                    color: "#4d3300",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                  }}
                  onClick={() => setLevel(lvl)}
                >
                  {lvl === "kindergarten" ? "Kindergarten" : "Primary Level"}
                </Button>
              </Col>
            ))}
          </Row>
        )}

        {/* STEP 2 — Show Quiz Options */}
        {level && (
          <>
            <Button
              onClick={() => setLevel(null)}
              style={{
                marginBottom: 20,
                fontSize: 16,
                borderRadius: 10,
              }}
            >
              ⬅ Back
            </Button>

            <Row gutter={[16, 16]} justify="center">
              {categories.map((cat) => (
                <Col key={cat.id} xs={24} sm={12} md={8}>
                  <Button
                    type="primary"
                    block
                    size="large"
                    style={{
                      fontSize: "1rem",
                      height: 100,
                      borderRadius: 15,
                      background: "#ffbf00",
                      color: "#4d3300",
                      fontWeight: "bold",
                    }}
                    onClick={() =>
                      navigate(`${cat.path}?level=${level}`)
                    }
                  >
                    {cat.name}
                  </Button>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Card>
    </div>
  );
};

export default QuizCategories;

