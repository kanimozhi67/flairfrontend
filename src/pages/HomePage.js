// import React, { useState, useEffect, useRef } from "react";
// import { Button, Select, Modal } from "antd";
// import { useNavigate } from "react-router-dom";
// import { useWindowSize } from "react-use";
// import api from "../api/axiosClient";
// import logo from "../images/fologo.png";
// import educate from "../images/educate.png";
// import Login from "./Login";
// import Signup from "./Signup";
// import SchoolLoginDropdown from "./SchoolLoginDropdown";
// import OnlinePage from "./OnlinePage";
// import HomeSection from "./HomeSection";
// import ContactFooter from "./ContactFooter";
// import {Dropdown } from "antd";
// import {
//   UserOutlined,
//   TeamOutlined,
//   SolutionOutlined,
// } from "@ant-design/icons";



// const { Option } = Select;

// const HomePage = ({ user, setUser }) => {
//   const navigate = useNavigate();
//   const { width } = useWindowSize();
//   const isMobile = width < 768;
//   const isTablet = width >= 768 && width < 1024;

//   const [modalOpen, setModalOpen] = useState(false);
//   const [isLogin, setIsLogin] = useState(true);

//   const onlineRef = useRef(null);
//   const onlineRef2 = useRef(null);
//   const onlineRef3 = useRef(null);

//   const scrollToOnline = () => {
//     onlineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };
//   const scrollToOnline2 = () => {
//     onlineRef2.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };
//   const scrollToOnline3 = () => {
//     onlineRef3.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await api.get("/auth/getMe");
//         setUser(res.data);
//       } catch {
//         console.log("User not logged in");
//       }
//     };
//     fetchUser();
//   }, [setUser]);

//   const floatingIcons = ["🧮", "🔢", "📐", "➗", "✏️", "🎲", "⭐", "🦄"];





//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(95deg, #7b2ff7, #f107a3)",
//         color: "#fff",
//         fontFamily: "sans-serif",
//         position: "relative",
//         zIndex: 0,
//         overflowX: "hidden", // prevent white gap on mobile
//         width: "100%",
//         boxSizing: "border-box",
//       }}
//     >
//       {/* Header */}
//       <div ref={onlineRef3} id="header">
//         <header
//           style={{
//             display: "flex",
//             flexDirection: isMobile ? "column" : "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: isMobile ? "12px 16px" : "20px 50px",
//             gap: isMobile ? 12 : 0,
//             width: "100%",
//             boxSizing: "border-box",
//           }}
//         >
//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               background: "whitesmoke",
//               color: "purple",
//               padding: "6px 12px",
//               borderRadius: 12,
//               fontWeight: "bold",
//               fontSize: isMobile ? 18 : 24,
//             }}
//           >
//             <img src={logo} alt="logo" style={{ width: 40, marginRight: 8 }} />
//             FLAIR OLYMPIAD
//           </div>

//           <div
//             style={{
//               display: "flex",
//               flexWrap: "wrap",
//               gap: 12,
//               justifyContent: "center",
//               fontSize: isMobile ? 14 : 18,
//             }}
//           >
//             <Button type="text" style={{ color: "#fff" ,fontSize:18}} onClick={scrollToOnline}>
//               Online Class
//             </Button>
//             <Button type="text" style={{ color: "#fff",fontSize:18 }} onClick={scrollToOnline2}>
//               Contact
//             </Button>

//             {user ? (
//               <>
//                 {/* <span style={{ fontWeight: 600 }}>{user.username}</span> */}
//                 <img
//                   src={user.avatar || "/default-avatar.png"}
//                   alt="avatar"
//                   style={{ width: 36, height: 36, borderRadius: "50%" }}
//                 />
//                 <Button
//                   size="small"
//                   onClick={() => {
//                     localStorage.removeItem("token");
//                     setUser(null);
//                   }}
//                 >
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Button  style={{fontSize:18} } onClick={() => { setIsLogin(false); setModalOpen(true); }}>Sign Up</Button>
//                 <Button style={{fontSize:18} } type="primary"
//                  onClick={() => { setIsLogin(true); setModalOpen(true); }}>Login</Button>
//                 <SchoolLoginDropdown setUser={setUser} />

//               </>
//             )}
//           </div>
//         </header>
//       </div>

//       {/* Floating Icons */}
//       {floatingIcons.map((icon, idx) => {
//         const size = Math.random() * 60 + 40;
//         const left = Math.random() * 100;
//         const duration = Math.random() * 5 + 2;
//         return (
//           <div
//             key={idx}
//             style={{
//               position: "absolute",
//               top: `${Math.random() * 80}%`,
//               left: `${left}%`,
//               fontSize: size,
//               opacity: 0.8,
//               animation: `floatAnim${idx} ${duration}s ease-in-out infinite alternate`,
//               zIndex: 0,
//             }}
//           >
//             {icon}
//           </div>
//         );
//       })}

//       {/* Hero Section */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: isMobile || isTablet ? "column" : "row",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: isMobile ? 20 : 30,
//           padding: isMobile ? "40px 16px" : "80px 40px",
//           maxWidth: "100%",
//           position: "relative",
//           zIndex: 2,
//           margin: "0 auto",
//           boxSizing: "border-box",
//         }}
//       >
//         <img
//           src={educate}
//           alt="educate"
//           style={{
//             width: isMobile ? "80%" : isTablet ? 220 : 260,
//             maxWidth: "100%",
//             height: "auto",
//             marginBottom: isMobile ? 20 : 0,
//           }}
//         />

//         <div style={{ textAlign: "center", marginBottom: isMobile ? 20 : 0 }}>
//           {["👶✨", "🎓"].map((emoji, i) => (
//             <div
//               key={i}
//               style={{
//                 fontSize: isMobile ? 60 : 100,
//                 lineHeight: 1,
//                 marginBottom: 10,
//               }}
//             >
//               {emoji}
//             </div>
//           ))}
//         </div>

//         <div
//           style={{
//             background: "#fff",
//             color: "#000",
//             borderRadius: 20,
//             padding: isMobile ? "20px" : "40px 30px",
//             width: "100%",
//             maxWidth: 400,
//             boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//             zIndex: 2,
//           }}
//         >
//           <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: "bold" }}>Join FLAIR OLYMPIAD</h2>
//           <p style={{ fontSize: isMobile ? 12 : 16, marginBottom: 20 }}>
//             Enter your details to get started:
//           </p>

//           <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//             <input placeholder="Name" style={inputStyle} />
//             <input placeholder="Email" style={inputStyle} />
//             <input placeholder="Mobile No" style={inputStyle} />

//             <Select placeholder="Grade">
//               {["KG1","KG2","Grade1","Grade2","Grade3","Grade4","Grade5","Grade6","Grade7","Grade8","Grade9","Grade10","Grade11","Grade12"].map((item, i) => <Option key={i}>{item}</Option>)}
//             </Select>

//             <Select placeholder="Country">
//               {["US", "UAE", "India","Other"].map((city) => <Option key={city}>{city}</Option>)}
//             </Select>

//             <Button type="primary" style={{ borderRadius: 10 }}>Submit</Button>
//           </form>
//         </div>
//       </div>

//       {/* Home Section */}
//       <div
//         style={{
//           border: "2px solid white",
//           borderRadius: "clamp(10px, 2vw, 20px)",
//           margin: isMobile? 0:"30px auto",
//           padding: "20px",
//           maxWidth: isMobile?"100%":"90%",
//           width: "100%",
//           boxSizing: "border-box",
//           zIndex: 5,
//         }}
//       >
//         <HomeSection />
//       </div>

//       {/* Online Section */}
//       <div ref={onlineRef} id="online" style={{ paddingTop: 100 }}>
//         <OnlinePage />
//       </div>

//       {/* Contact Footer */}
//       <div ref={onlineRef2} id="contact">
//         <ContactFooter scrollToOnline3={scrollToOnline3} />
//       </div>

//       {/* Auth Modal */}
//       <Modal open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} centered width={380}>
//         <div style={{ textAlign: "center", marginBottom: 18 }}>
//           <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#7b2ff7" }}>
//             {isLogin ? "Welcome Back" : "Create Account"}
//           </h2>
//           <p style={{ color: "#666", marginTop: 4 }}>
//             {isLogin ? "Login to continue" : "Sign up to get started"}
//           </p>
//         </div>

//         {isLogin ? (
//           <Login onSuccess={() => setModalOpen(false)} setUser={setUser} />
//         ) : (
//           <Signup onSuccess={() => setModalOpen(false)} setUser={setUser} />
//         )}

//         <div style={{ textAlign: "center", marginTop: 15 }}>
//           {isLogin ? (
//             <Button type="link" onClick={() => setIsLogin(false)}>
//               Don't have an account? Sign Up
//             </Button>
//           ) : (
//             <Button type="link" onClick={() => setIsLogin(true)}>
//               Already have an account? Login
//             </Button>
//           )}
//         </div>
//       </Modal>

//       {/* Floating animations */}
//       <style>
//         {floatingIcons.map(
//           (_, i) => `
//           @keyframes floatAnim${i} {
//             0% { transform: translateY(0px) rotate(0deg); }
//             100% { transform: translateY(-30px) rotate(360deg); }
//           }
//         `
//         )}
//       </style>
//     </div>
//   );
// };

// const inputStyle = {
//   padding: 10,
//   fontSize: 16,
//   borderRadius: 8,
//   border: "1px solid #ccc",
//   width: "100%", // make inputs full width
//   boxSizing: "border-box",
// };

// export default HomePage;
import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Dropdown , Select} from "antd";
import { useNavigate } from "react-router-dom";
import { useWindowSize } from "react-use";
import { UserOutlined, SolutionOutlined, TeamOutlined } from "@ant-design/icons";

import api from "../api/axiosClient";
import logo from "../images/fologo.png";
import educate from "../images/educate.png";
import mathBg from "../images/math-bg.png";
import avat from "../images/rabbitAvatar.png"
import Login from "./Login";
import Signup from "./Signup";
import SchoolLoginDropdown from "./SchoolLoginDropdown";
import OnlinePage from "./OnlinePage";
import HomeSection from "./HomeSection";
import ContactFooter from "./ContactFooter";

 const { Option } = Select;
const HomePage = ({ user, setUser }) => {
  const navigate = useNavigate();
  const { width } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onlineRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/getMe");
        setUser(res.data);
      } catch {}
    };
    fetchUser();
  }, [setUser]);

  /* ================= MOBILE MENU ================= */
  const mobileMenuItems = [
    {
      key: "login",
      label: "Login",
      icon: <UserOutlined />,
      onClick: () => { setIsLogin(true); setModalOpen(true); },
    },
    {
      key: "signup",
      label: "Sign Up",
      icon: <SolutionOutlined />,
      onClick: () => { setIsLogin(false); setModalOpen(true); },
    },
    {
      key: "school",
      label: "School Login",
      icon: <TeamOutlined />,
      onClick: () => { window.location.href = "/school-login"; },
    },
    {
      key: "online",
      label: "Online Class",
      icon: <TeamOutlined />,
      onClick: () => onlineRef.current?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      key: "contact",
      label: "Contact",
      onClick: () => contactRef.current?.scrollIntoView({ behavior: "smooth" }),
    },
  ];

  /* ================= FLOATING ICONS ================= */
  const floatingIcons = ["🧮", "🔢", "📐", "➗", "✏️", "🎲", "⭐"];

  return (
    <div style={{
        minHeight: "100vh",
        background: "linear-gradient(95deg, #7b2ff7, #f107a3)",
        color: "#fff",
        fontFamily: "sans-serif",
        position: "relative",
        zIndex: 0,
        overflowX: "hidden", // prevent white gap on mobile
        width: "100%",
        boxSizing: "border-box",
        }}
         >
          
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
              zIndex: 0,
            }}
          >
            {icon}
          </div>
        );
      })}
      {/* ================= HEADER ================= */}
      {!isMobile && (
    
 <header
          style={{
            display: "flex",
            flexDirection:  "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 50px",
            gap:  0,
            width: "100%",
            boxSizing: "border-box",
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
              fontSize: 24,
            }}
          >
            <img src={logo} alt="logo" style={{ width: 40, marginRight: 8 }} />
            FLAIR OLYMPIAD
          </div>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Button type="text" style={{ color: "#fff", fontSize: 16 }} onClick={() => onlineRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Online Class
            </Button>
            <Button type="text" style={{ color: "#fff", fontSize: 16 }} onClick={() => contactRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Contact
            </Button>
            {user ? (
              <>
                <img src={user.avatar || avat}
                 alt="avatar" 
                 style={{ width: 36, height: 36, borderRadius: "50%" }} />
                <Button size="small" 
                onClick={() => { localStorage.removeItem("token"); 
                setUser(null); }}>Logout</Button>
              </>
            ) : (
              <>
                <Button onClick={() => { setIsLogin(false); setModalOpen(true); }}>Sign Up</Button>
                <Button type="primary" onClick={() => { setIsLogin(true); setModalOpen(true); }}>Login</Button>
                <SchoolLoginDropdown setUser={setUser} />
              </>
            )}
          </div>
        </header>
      )}

      {/* ================= MOBILE HERO ================= */}
      {isMobile && (
        <div
          style={{
            minHeight: "100vh",
            backgroundImage: `url(${mathBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "20px",
            position: "relative",
          }}
        >
          {/* Hamburger */}
          <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
            <Dropdown menu={{ items: mobileMenuItems }} placement="bottomRight" trigger={["click"]}>
              <Button type="text" style={{ fontSize: 24, color: "#fff" }}>☰</Button>
            </Dropdown>
          </div>

          {/* Center Circle */}
          <div style={{ flex: 1, display: "flex", 
          //  alignItems: "center", 
            justifyContent: "center",
            marginTop:40
            }}>
            <div
              style={{
                width: 130,
                height: 130,
                borderRadius: "50%",
                background: "#c40000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 26px rgba(0,0,0,0.6)",
                animation: "pulseGlow 2.8s infinite",
              }}
            >
              <div style={{ color: "#fff", textAlign: "center", fontWeight: 800, fontSize: 18, lineHeight: 1.15 }}>
                Flair<br />Olympiad
              </div>
            </div>
          </div>

<h1
              style={{
                fontSize: 40,
                fontWeight: 900,
                lineHeight: 1.1,
                color: "#f6f8f5ff",
                margin: 0,
                marginBottom:0
              }}
            >
              Shaping
             <br></br>
              Brilliant
              
              Minds
            </h1>

          {/* CTA at Bottom */}
          <div style={{ paddingBottom: 12 ,textAlign:"center"}}>
            <Button
              size="large"
              style={{
                width: "59%",
                background: "#c40000",
                border: "none",
                height: 48,
                borderRadius: 14,
                fontSize: 16,
                fontWeight: 700,
                color: "#fff",
                animation: "ctaBounce 3.2s infinite",
              }}
              onClick={() => { setIsLogin(true); setModalOpen(true); }}
            >
              LOGIN FOR MENTAL FEAST
            </Button>
          </div>
        </div>
      )}

      {/* ================= DESKTOP / TABLET HERO ================= */}
      {!isMobile && (
           
 
        <div
          style={{
            display: "flex",
            flexDirection: isTablet ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: isMobile ? 20 : 30,
            padding: isMobile ? "40px 16px" : "80px 40px",
            maxWidth: "100%",
            position: "relative",
          }}
        >
          <img
            src={educate}
            alt="educate"
            style={{
              width: isMobile ? "80%" : isTablet ? 220 : 260,
              maxWidth: "100%",
              height: "auto",
              marginBottom: isMobile ? 20 : 0,
            }}
          />
    <div style={{ textAlign: "center", marginBottom: isMobile ? 20 : 0 }}>
          {["👶✨", "🎓"].map((emoji, i) => (
            <div
              key={i}
              style={{
                fontSize: isMobile ? 60 : 100,
                lineHeight: 1,
                marginBottom: 10,
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
          <div
            style={{
              background: "#fff",
              color: "#000",
              borderRadius: 20,
              padding: isMobile ? "20px" : "40px 30px",
              width: "100%",
              maxWidth: 400,
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: "bold" }}>Join FLAIR OLYMPIAD</h2>
            <p style={{ fontSize: isMobile ? 12 : 16, marginBottom: 20 }}>Enter your details to get started:</p>
            <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <input placeholder="Name" style={inputStyle} />
              <input placeholder="Email" style={inputStyle} />
              <input placeholder="Mobile No" style={inputStyle} />
                 <Select placeholder="Grade">
              {["KG1","KG2","Grade1","Grade2","Grade3","Grade4","Grade5","Grade6","Grade7","Grade8","Grade9","Grade10","Grade11","Grade12"].map((item, i) => <Option key={i}>{item}</Option>)}
            </Select>

            <Select placeholder="Country">
              {["US", "UAE", "India","Other"].map((city) => <Option key={city}>{city}</Option>)}
            </Select>
              <Button type="primary" style={{ borderRadius: 10 }}>Submit</Button>
            </form>
          </div>
        </div>
      )}

      {/* ================= HOME SECTION / ONLINE / CONTACT ================= */}
        <div
        style={{
          border: "2px solid white",
          borderRadius: "clamp(10px, 2vw, 20px)",
          margin: isMobile? 0:"30px auto",
          padding: "20px",
          maxWidth: isMobile?"100%":"90%",
          width: "100%",
          boxSizing: "border-box",
          zIndex: 5,
        }}
      >
      <HomeSection /></div>
      <div ref={onlineRef}><OnlinePage /></div>
      <div ref={contactRef}><ContactFooter /></div>

      {/* ================= AUTH MODAL ================= */}
       {/* Auth Modal */}
      <Modal open={modalOpen} onCancel={() => setModalOpen(false)} footer={null} centered width={380}>
        <div style={{ textAlign: "center", marginBottom: 18 }}>
          <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#7b2ff7" }}>
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
      {/* ================= ANIMATIONS ================= */}
      <style>
        {`
          @keyframes pulseGlow {
            0% { transform: scale(1); box-shadow: 0 0 0 rgba(196,0,0,0.6);}
            50% { transform: scale(1.05); box-shadow: 0 0 24px rgba(196,0,0,0.9);}
            100% { transform: scale(1); box-shadow: 0 0 0 rgba(196,0,0,0.6);}
          }
          @keyframes ctaBounce {
            0%,100% { transform: translateY(0);}
            50% { transform: translateY(-3px);}
          }
        `}
      </style>
        {/* Floating animations */}
      <style>
        {floatingIcons.map(
          (_, i) => `
          @keyframes floatAnim${i} {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-30px) rotate(360deg); }
          }
        `
        )}
      </style>
    </div>
  );
};

const inputStyle = {
  padding: 10,
  fontSize: 16,
  borderRadius: 8,
  border: "1px solid #ccc",
  width: "100%",
  boxSizing: "border-box",
};

export default HomePage;
