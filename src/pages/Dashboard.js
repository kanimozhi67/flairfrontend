import React, { useEffect, useState } from "react";
import { Card, Progress, message } from "antd";
import api from "../api/axiosClient";

const Dashboard = ({ userId }) => {
  const [points, setPoints] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = async () => {
    if (!userId) return;

    setLoading(true);
    setError("");

    try {
      // Today's points
      const resPoints = await api.get("/quiz/progress/today");
      setPoints(resPoints.data.points ?? 0);

      // Leaderboard
      const resLeaderboard = await api.get(
        `/quiz/progress/leaderbd?userId=${userId}`
      );

      const top5 = (resLeaderboard.data.top5 || []).filter(
        (u) => u.userId && u.username !== "Unknown"
      );

      setLeaderboard(top5);
      setCurrentUser(resLeaderboard.data.currentUser || null);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
      message.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  if (!userId || loading) {
    return (
      <p style={{ fontSize: 24, textAlign: "center", marginTop: 50 }}>
        Loading dashboard...
      </p>
    );
  }

  if (error) {
    return (
      <p style={{ fontSize: 20, color: "red", textAlign: "center" }}>
        {error}
      </p>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #FFEEA9, #FFC9C9)",
        padding: 20,
        boxSizing: "border-box",
      }}
    >
      {/* MAIN ROW */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 30,
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* ================= LEFT : TODAY'S PROGRESS ================= */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: 360,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #FF9D2F, #FF6B6B)",
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              padding: 12,
              width: "100%",
              borderRadius: "20px 20px 0 0",
              boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            }}
          >
            🏫 Daily Progress ✨
          </div>

          {/* Card */}
          <Card
            style={{
              width: "100%",
              borderRadius: "0 0 20px 20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: 18, fontWeight: 600 }}>
                ⭐ Today's Points ⭐
              </p>

              <Progress
                type="circle"
                percent={Math.min((points / 100) * 100, 100)}
                format={() => (
                  <span
                    style={{
                      fontSize: 28,
                      fontWeight: "bold",
                      color: "#FF6B00",
                    }}
                  >
                    {points}
                  </span>
                )}
                width={150}
                strokeWidth={10}
                strokeColor={{
                  "0%": "#FF9D2F",
                  "100%": "#FF6B6B",
                }}
              />

              <p style={{ marginTop: 15, fontSize: 16 }}>
                Keep learning 🎒✨
              </p>
            </div>
          </Card>
        </div>

        {/* ================= RIGHT : LEADERBOARD ================= */}
        <div
          style={{
            flex: "1 1 360px",
            maxWidth: 380,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #FF9D2F, #FF6B6B)",
              color: "white",
              fontSize: 30,
              fontWeight: "bold",
              textAlign: "center",
              padding: 12,
              width: "100%",
              borderRadius: "20px 20px 0 0",
              boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
            }}
          >
            🏆 Leaderboard ✨
          </div>

          {/* Card */}
          <Card
            style={{
              width: "100%",
              borderRadius: "0 0 20px 20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
              fontSize: 26
            }}
          >
            {leaderboard.map((user) => {
              const isCurrent =
                String(user.userId) === String(userId);

              return (
                <div
                  key={user.userId}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    marginBottom: 8,
                    borderRadius: 10,
                    backgroundColor: isCurrent ? "#FFFAE6" : "#fff",
                    fontWeight: isCurrent ? "bold" : "normal",
                    boxShadow: isCurrent
                      ? "0 4px 10px rgba(255,107,107,0.2)"
                      : "none",
                  }}
                >
                  <span>
                    {user.rank}. {user.username}
                  </span>
                  <span>⭐ {user.points}</span>
                </div>
              );
            })}

            {/* Current user if outside top 5 */}
            {currentUser &&
              !leaderboard.find(
                (u) => String(u.userId) === String(userId)
              ) && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    borderRadius: 10,
                    backgroundColor: "#FFFAE6",
                    fontWeight: "bold",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>
                    {currentUser.rank}. {currentUser.username}
                  </span>
                  <span>⭐ {currentUser.points}</span>
                </div>
              )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
