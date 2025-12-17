import React, { useEffect, useState } from "react";
import { Card, Progress, message } from "antd";
import api from "../api/axiosClient";

const Dashboard = ({ setUser }) => {
  const [points, setPoints] = useState(0);

  const loadProgress = async () => {
    try {
      const res = await api.get("/quiz/progress/today");
      setPoints(res.data.points);
    } catch (err) {
      message.error("Failed to load progress");
    }
  };

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFEEA9, #FFC9C9)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div style={{ width: 420 }}>
        {/* Custom Styled Header (NO headStyle) */}
        <div
          style={{
            background: "linear-gradient(135deg, #FF9D2F, #FF6B6B)",
            color: "white",
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            padding: 10,
          marginTop:-60,
            borderRadius: "20px 20px 0 0",
            boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
          }}
        >
          🏫📚 Daily School Progress 🖍️✨
        </div>

        <Card
          style={{
            borderRadius: "0 0 20px 20px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
          }}
          bodyStyle={{ paddingTop: 10, paddingBottom: 30 }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>
              ⭐ Today's Points ⭐
            </p>

            <Progress
              type="circle"
              percent={Math.min((points / 100) * 100, 100)}
              format={() => (
                <span style={{ fontSize: 28, fontWeight: "bold", color: "#FF6B00" }}>
                  {points}
                </span>
              )}
              width={160}
              strokeWidth={10}
              strokeColor={{
                "0%": "#FF9D2F",
                "100%": "#FF6B6B",
              }}
            />

            <p style={{ marginTop: 20, fontSize: 22, opacity: 0.8 }}>
              Keep learning and earn more rewards 🎒✨
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
