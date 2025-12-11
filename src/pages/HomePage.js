import React, { useState, useEffect } from "react";
import { Button, Select, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosClient"; // axios instance with token interceptor
import logo from "../images/fologo.png";
import educate from "../images/educate.png";
import Login from "./Login";
import Signup from "./Signup";

const { Option } = Select;

const HomePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);


  // Fetch current user on page load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/getMe");
       
        setUser(res.data);
      } catch (err) {
        console.log("User not logged in");
      }
    };
    fetchUser();
  }, [setUser]);

  // Floating icons
  const floatingIcons = [
    "🧮",
    "🔢",
    "📐",
    "➗",
    "✏️",
    "🎲",
    "🟢",
    "🔴",
    "⭐",
    "🦄",
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg, #7b2ff7, #f107a3)",
        position: "relative",
        color: "#fff",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 50px",
          boxSizing: "border-box",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            backgroundColor: "whitesmoke",
            color: "purple",
            display: "flex",
            alignItems: "center",
            padding: "5px 10px",
            borderRadius: 12,
          }}
        >
          <img
            src={logo}
            alt="FO Logo"
            style={{ width: 50, marginRight: 10 }}
          />
          FLAIR OLYMPIAD
        </div>

        <div
          style={{
            display: "flex",
            gap: 20,
            fontSize: 20,
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            style={{ color: "#fff", fontSize: 18 }}
            onClick={() => navigate("/online-class")}
          >
            Online Class
          </Button>
          <Button
            type="text"
            style={{ color: "#fff", fontSize: 18 }}
            onClick={() => navigate("/contact")}
          >
            Contact
          </Button>

          {user ? (
            // Show username/avatar and logout if logged in
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontWeight: "bold", fontSize: 18 }}>
              {(user)?.username}
              </div>
              
               <img src={user?.avatar || "/default-avatar.png"}
                alt="avatar"
                style={{ width: 40, height: 40, borderRadius: "50%" }}
              />
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  setUser(null);
                }}
              >
                Logout
              </Button>
            </div>
          ) : (
            // Show Login/Sign Up buttons if not logged in
            <>
              <Button
                type="default"
                size="large"
                onClick={() => {
                  setIsLogin(false);
                  setModalOpen(true);
                }}
              >
                Sign Up
              </Button>
              <Button
                type="primary"
                size="large"
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

      {/* Floating emojis */}
      {floatingIcons.map((icon, idx) => {
        const size = Math.random() * 60 + 30;
        const left = Math.random() * 100;
        const duration = Math.random() * 5 + 5;
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
              zIndex: 1,
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
          justifyContent: "center",
          alignItems: "center",
          width: "80%",
          maxWidth: "1200px",
          gap: 50,
          margin: "0 auto",
          paddingTop: "100px",
          zIndex: 5,
          position: "relative",
        }}
      >
        {/* Illustration */}
        <img src={educate} alt="educate yourself" style={{ width: 250 }} />

        {/* Emoji / fun illustration */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          {["👧✨", "🎓"].map((emoji, i) => (
            <div key={i} style={{ fontSize: 100, textAlign: "center" }}>
              {emoji}
            </div>
          ))}
        </div>

        {/* Form Section */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            borderRadius: 20,
            padding: "40px 30px",
            color: "#000",
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
            Join FLAIR OLYMPIAD
          </h2>
          <p style={{ fontSize: 16, marginBottom: 20 }}>
            Enter your details to get started:
          </p>

          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 15,
            }}
          >
            <input
              type="text"
              placeholder="Name"
              style={{
                padding: 10,
                fontSize: 16,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              style={{
                padding: 10,
                fontSize: 16,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <input
              type="tel"
              placeholder="Mobile No"
              style={{
                padding: 10,
                fontSize: 16,
                borderRadius: 8,
                border: "1px solid #ccc",
              }}
            />
            <Select placeholder="Grade" style={{ width: "100%" }}>
              {[...Array(12).keys()].map((g) => (
                <Option key={g + 1} value={g + 1}>
                  {g + 1}
                </Option>
              ))}
            </Select>
            <Select placeholder="City" style={{ width: "100%" }}>
              {["Abu Dhabi", "Dubai", "Sharjah"].map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              style={{ fontSize: 16, padding: "10px 0", borderRadius: 10 }}
            >
              Submit
            </Button>
          </form>
        </div>
      </div>

      {/* Floating animation keyframes */}
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
          .join("\n")}
      </style>

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
    </div>
  );
};

export default HomePage;
