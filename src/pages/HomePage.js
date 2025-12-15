
import React, { useState, useEffect } from "react";
import { Button, Select, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import api from "../api/axiosClient";
import logo from "../images/fologo.png";
import educate from "../images/educate.png";
import Login from "./Login";
import Signup from "./Signup";

const { Option } = Select;

const HomePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/getMe");
        setUser(res.data);
      } catch {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, [setUser]);

  const floatingIcons = ["🧮", "🔢", "📐", "➗", "✏️", "🎲", "⭐", "🦄"];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #7b2ff7, #f107a3)",
        color: "#fff",
        overflow: "hidden",
        fontFamily: "sans-serif",
         position: "relative",   // 👈 REQUIRED
    zIndex: 0,          
      }}
    >
      {/* Header */}
      <header
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: isMobile ? "12px 16px" : "20px 50px",
          gap: isMobile ? 12 : 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "whitesmoke",
            color: "purple",
            padding: "6px 12px",
            borderRadius: 12,
            fontWeight: "bold",
            fontSize: isMobile ? 18 : 24,
          }}
        >
          <img src={logo} alt="logo" style={{ width: 40, marginRight: 8 }} />
          FLAIR OLYMPIAD
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            fontSize: 20,
            justifyContent: "center",
             fontSize: isMobile ? 12 : 18,
          }}
        >
          <Button
            type="text"
            style={{ color: "#fff" , fontSize: 18}}
            onClick={() => navigate("/online-class")}
          >
            Online Class
          </Button>
          <Button
            type="text"
            style={{ color: "#fff" , fontSize: 18}}
            onClick={() => navigate("/contact")}
          >
            Contact
          </Button>

          {user ? (
            <>
              <span style={{ fontWeight: 600 }}>{user.username}</span>
              <img
                src={user.avatar || "/default-avatar.png"}
                alt="avatar"
                style={{ width: 36, height: 36, borderRadius: "50%" }}
              />
              <Button
                size="small"
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
               style={{  fontSize: 18}}
                onClick={() => {
                  setIsLogin(false);
                  setModalOpen(true);
                }}
              >
                Sign Up
              </Button>
              <Button
                type="primary"
                style={{  fontSize: 18}}
                onClick={() => {
                  setIsLogin(true);
                  setModalOpen(true);
                }}
              >
                Login
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Floating Icons */}
    {floatingIcons.map((icon, idx) => {
        const size = Math.random() * 60 + 40;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 2;
        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              top: `${Math.random() * 80}%`,
              left: `${left}%`,
              fontSize: size,
              opacity: 0.8,
              animation: `floatAnim${idx} ${duration}s ease-in-out infinite alternate`,
              zIndex: 0,               // 👈 behind content
   // pointerEvents: "none",    // 👈 CRITICAL (no input blocking)
   // userSelect: "none",
            }}
          >
            {icon}
          </div>
        );

})}

      {/* Hero Section */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobile || isTablet ? "column" : "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 30,
          padding: isMobile ? "40px 16px" : "80px 40px",
          maxWidth: 1200,
            position: "relative",  // 👈 REQUIRED
    zIndex: 2,  
          margin: "0 auto",
        }}
      >
        <img
          src={educate}
          alt="educate"
          style={{
            width: isMobile ? 160 : isTablet ? 220 : 260,
          }}
        />

        {/* <div style={{ fontSize: isMobile ? 60 : 100 }}>👶✨ 🎓</div> */}
    {["👶✨", "🎓"].map((emoji, i) => (
            <div key={i} style={{ fontSize: 100, textAlign: "center" }}>
              {emoji}
            </div>
          ))}
      

        <div
          style={{
            background: "#fff",
            color: "#000",
            borderRadius: 20,
            marginTop:-70,
            padding: isMobile ? "20px 20px" : "40px 30px",
            width: "100%",
          maxWidth: 400,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ fontSize: isMobile ? 22 : 28 ,fontWeight: "bold"}}>Join FLAIR OLYMPIAD</h2>
  <p style={{ fontSize: isMobile ? 12 : 16 , marginBottom: 20 }}>
            Enter your details to get started:
         </p>

          <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input placeholder="Name" style={inputStyle} />
            <input placeholder="Email" style={inputStyle} />
            <input placeholder="Mobile No" style={inputStyle} />

            <Select placeholder="Grade">
              {[...Array(12)].map((_, i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>

            <Select placeholder="City">
              {["Abu Dhabi", "Dubai", "Sharjah"].map((city) => (
                <Option key={city}>{city}</Option>
              ))}
            </Select>

            <Button type="primary" style={{ borderRadius: 10 }}>
              Submit
            </Button>
          </form>
        </div>
      </div>

      {/* Auth Modal */}
    
      {/* Modal for Login/SignUp */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        width={380}
      >
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 700,
              color: "#7b2ff7",
            }}
          >
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p style={{ color: "#666", marginTop: 4 }}>
            {isLogin ? "Login to continue" : "Sign up to get started"}
          </p>
        </div>

        {isLogin ? (
          <Login onSuccess={() => setModalOpen(false)} setUser={setUser} />
        ) : (
          <Signup onSuccess={() => setModalOpen(false)} setUser={setUser} />
        )}

        <div style={{ textAlign: "center", marginTop: 15 }}>
          {isLogin ? (
            <Button type="link" onClick={() => setIsLogin(false)}>
              Don't have an account? Sign Up
            </Button>
          ) : (
            <Button type="link" onClick={() => setIsLogin(true)}>
              Already have an account? Login
            </Button>
          )}
        </div>
      </Modal>

      {/* Floating animations */}
      <style>
        {floatingIcons
          .map(
            (_, i) => `
          @keyframes floatAnim${i} {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-30px) rotate(360deg); }

          }
        `
          )
          .join("")}
      </style>
    </div>
  );
};

const inputStyle = {
  padding: 10,
  fontSize: 16,
  borderRadius: 8,
  border: "1px solid #ccc",
};

export default HomePage;
