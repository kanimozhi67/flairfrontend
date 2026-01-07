import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { message, Tag, Card } from "antd";

const Mystickers = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null);
  const [todayScore, setTodayScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem("token");

    if (!token) return; // ⛔ stop auto-login
      try {
        const res = await api.get("/auth/getMe");
        setLocalUser(res.data);
        if (setUser) setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        message.error("Not authenticated. Redirecting to login.");
        navigate("/");
      }
    };
    fetchUser();
  }, [navigate, setUser]);

  if (loading) {
    return <p style={{ fontSize: 24, textAlign: "center", marginTop: 50 }}>Loading...</p>;
  }

  if (!user) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ffe680, #e9780eff)",
        boxSizing: "border-box",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 800,
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          background: "#fff9f0",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: "bold", marginBottom: 10 }}>
          {user.username}
        </h1>

        <p style={{ fontSize: 20, marginBottom: 10 }}>
         
        </p>

        <h2 style={{ fontSize: 40, margin: "20px 0 10px" }}>👝  {" "}
              <strong><span style={{ color:"red"}}>{user.sticker.length}</span></strong></h2>
        <hr style={{ marginBottom: 20, borderTop: "2px solid #ffb3b3" }} />

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 15,
            justifyContent: "center",
          }}
        >
          {user.sticker && user.sticker.length > 0 ? (
            user.sticker.map((item, idx) => (
              <Tag
                key={idx}
                color="orange"
                style={{
                  fontSize: 24,
                  padding: "8px 16px",
                  border: "2px solid gold",
                  borderRadius: 10,
                  transition: "transform 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {item}
              </Tag>
            ))
          ) : (
            <span style={{ fontSize: 20 }}>No stickers yet 🎁</span>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Mystickers;
