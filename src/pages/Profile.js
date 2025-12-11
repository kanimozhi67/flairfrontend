import React, { useEffect, useState } from "react"; 
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, message, Card, Tag } from "antd";

const Profile = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null);
  const [todayScore, setTodayScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
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

  // Fetch today's score
  useEffect(() => {
    const fetchTodayScore = async () => {
      try {
        const res = await api.get("/quiz/progress/today");
        setTodayScore(res.data.points);
      } catch (err) {
        console.error("Failed loading daily score");
      }
    };
    fetchTodayScore();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    message.success("Logged out successfully!");
    navigate("/profile");
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading profile...</p>;

  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        background: "linear-gradient(135deg, #ffd194, #6a11cb)", 
        padding: 20 
      }}
    >
      <Card
        style={{
          maxWidth: 700,
          width: "100%",
          borderRadius: 20,
          textAlign: "center",
          background: "rgba(255, 255, 255, 0.95)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          fontSize: 50
        }}
      >
        <Avatar
          size={140}
          src={user.avatar ? `http://localhost:5000${user.avatar}` : "/default-avatar.png"}
          style={{ marginBottom: 20, border: "4px solid #ff9d2f" }}
        />
        <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 5 }}>{user.username}</h1>
        <p style={{ fontSize: 25, color: "#555", marginBottom: 15 }}>Email: {user.email}</p>
        <p style={{ fontSize: 25, marginBottom: 15 }}>Today's Score: <span style={{ color: "#ff4e2fff", fontWeight: "bold" }}>{todayScore} ⭐</span></p>
        <p style={{ fontSize: 25, marginBottom: 20 }}>
          Your Stickers:{" "}
          {user.sticker.length > 0 ? 
            user.sticker.map((item, idx) => (
              <Tag key={idx} color="orange" style={{ fontSize: 20, margin: 3 , border: "10x solid gold"}}>
                {item}
              </Tag>
            )) : <span>No stickers yet 🎁</span>
          }
        </p>

        <Button 
          type="primary" 
          onClick={handleLogout}
          style={{
            background: "linear-gradient(135deg, #ff9d2f, #ff6126)",
            border: "none",
            borderRadius: 12,
            padding: "25px 30px",
            fontSize: 20,
            fontWeight: "bold",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
          }}
        >
          Logout
        </Button>
      </Card>
    </div>
  );
};

export default Profile;
