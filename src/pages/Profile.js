import React, { useEffect, useState } from "react"; 
import api from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, message, Card, Tag } from "antd";
import avat from "../images/rabbitAvatar.png";

const Profile = ({ setUser }) => {
  const navigate = useNavigate();
  const [user, setLocalUser] = useState(null);
  const [todayScore, setTodayScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch user info
  useEffect(() => {
    const fetchUser = async () => {
      try {
          const token = localStorage.getItem("token");

    if (!token) return; // ⛔ stop auto-login
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
          const today = res.data.todayPoints ?? 0;
        setTodayScore(today);
      } catch (err) {
        console.error("Failed loading daily score");
      }
    };
    fetchTodayScore();
  }, []);

  // const handleLogout = async() => {
  //  // await api.post("auth/logout")
  //   localStorage.removeItem("token");
  //   setUser(null);
  //   message.success("Logged out successfully!");
  //   navigate("/profile");
  // };
const handleLogout = async () => {
  try {
    await api.post("/auth/logout"); // clears cookie/session on backend
  } catch (e) {}

  localStorage.removeItem("token");
  localStorage.removeItem("user"); // if still used anywhere
  setUser(null);
  navigate("/login");
};



  if (loading) return <p style={{ textAlign: "center", marginTop: 50 }}>Loading profile...</p>;

  return (
    <div 
      style={{ 
        minHeight: "100vh", 
        
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
          fontSize: 40,
          margin:"0px auto"
        }}
      >
        <Avatar
          size={140}
          src={user.avatar ? avat: avat}
          style={{ marginBottom: 0, border: "4px solid #ff9d2f" }}
        />
        <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 5 }}>{user.username}</h1>
        <p style={{ fontSize: 20, color: "#555", marginBottom: 5 }}>Email: {user.email}</p>
        <p style={{ fontSize: 20, color: "#555", marginBottom: 5 }}>Level: {user.level}</p>
        <p style={{ fontSize: 20, marginBottom: 5 }}>
        Today's Score: <span style={{ color: "#ff4e2fff", fontWeight: "bold" }}>{todayScore} ⭐</span></p>
      
     
       <p style={{ fontSize: 20, marginBottom: 0 }}>
  Your Sticker{user?.sticker?.length !== 1 ? "s" : ""}: <strong>{user?.sticker?.length || 0}</strong>
</p>
 <p style={{ fontSize: 20, color: "#555", marginBottom: 0 }}>Premium :&nbsp;
  <button onClick={()=>navigate("/payment")}
   style={{textDecoration:"none", border:"1px solid #f0a2a2", 
    borderRadius: 12,backgroundColor: "#faeded",cursor:"pointer",

   }}>   
 <span 
 style={{ color: "rgb(20, 163, 15)", fontWeight: "bold" }}> 
  {user.isPremium===false?"Get Premium":"Premium Member"}</span>
 </button>  </p>
     

        <Button 
          type="primary" 
          onClick={handleLogout}
          style={{
            background: "linear-gradient(135deg, #ff9d2f, #ff6126)",
            border: "none",
            borderRadius: 12,
            padding: "20px 30px",
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
