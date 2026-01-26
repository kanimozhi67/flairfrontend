import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../images/fologo.png";

import soft1 from "../images/software1.png";
import soft2 from "../images/software2.png";
import soft3 from "../images/software3.png";
import soft4 from "../images/software4.png";
import soft5 from "../images/software5.png";
import soft6 from "../images/software6.png";
import soft7 from "../images/software7.png";
import ContactFooter from "./ContactFooter";

const { Title, Text } = Typography;

/* ================= DATA ================= */

const aiTools = [
  { img: soft5, title: "AI Tutor 🤖", desc: "Personal guidance for every child" },
  { img: soft3, title: "Smart Practice", desc: "Adaptive learning paths" },
  { img: soft6, title: "Instant Feedback", desc: "Know mistakes immediately" },
];

const learningApps = [
  { img: soft7, title: "Coding Games", desc: "Learn coding through play" },
  { img: soft4, title: "Logic Builder", desc: "Improve reasoning skills" },
  { img: soft2, title: "Creative Labs", desc: "Explore creativity with tech" },
];

const rewards = [
  { img: soft2, title: "Progress Reports", desc: "Track improvement" },
  { img: soft3, title: "Achievements", desc: "Earn badges" },
  { img: soft1, title: "Leaderboard", desc: "Compete globally" },
];

/* ================= STYLES ================= */

const pageBg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #fb0060, #b71cff)",
  //background: "linear-gradient(135deg, #fb7900, #ff9f1c, #ffd166)",
  padding: 10,
};


const sectionStyle = (c1, c2) => ({
  background: `linear-gradient(135deg,${c1},${c2})`,
  padding: 10,
  borderRadius: 32,
  margin: "40px auto",
  maxWidth: 550,
});

const sectionStyle2 = (c1, c2) => ({
  background: `linear-gradient(135deg,${c1},${c2})`,
  padding: 10,
  borderRadius: 32,
  margin: "40px auto",
  maxWidth: 800,
});

const cardStyle = {
  borderRadius: 24,
  textAlign: "center",
  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
};

const imageStyle = {
  width: "100%",
  maxHeight: 350,
  objectFit: "contain",
};

/* ================= SLIDER ================= */

const SliderCard = ({ list }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(v => (v + 1) % list.length), 3500);
    return () => clearInterval(t);
  }, [list.length]);

  const item = list[index];

  return (
    <Card style={cardStyle}>
      <p style={{ textAlign: "left", fontWeight: "bold" }}>
        {index + 1}/{list.length}
      </p>

      <img src={item.img} alt="" style={imageStyle} />
      <Title level={4}>{item.title}</Title>
      <Text>{item.desc}</Text>
    </Card>
  );
};

/* ================= MAIN ================= */

export default function ExploreSoftware() {
  const navigate = useNavigate();
  const ref = useRef(null);

  const scrollToFooter = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={pageBg}>
      {/* HEADER */}
      <div className="headerBar">
        <div className="logoBox" ref={ref}>
          <img src={logo} alt="" />
          <Button
            onClick={() => navigate("/")}
            style={{ border: "none", background: "transparent", fontSize: 18,padding:5,fontWeight:"bold" ,color:"purple"}}
          >
            FLAIR OLYMPIAD
          </Button>
        </div>

         <div
               // className="actions"
                >
                            <Button
  onClick={() => navigate("/exploreolymp")}
  style={{
    backgroundColor: "#ff9800",
    fontWeight: "bold",
    padding: "8px 18px",
    color: "white",
    fontSize: 20,
    borderRadius: 20,
    border: "none",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "scale(1.05)";
    e.currentTarget.style.backgroundColor = "#fb8c00";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "scale(1)";
    e.currentTarget.style.backgroundColor = "#ff9800";
  }}
>
  🚀 Explore Olympiad
</Button>&nbsp;
                 <a href="tel:00971563512691" 
                 style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,
                    borderRadius:20,textDecoration:"none"}}
                 > 📞
                  {/* Contact Us */}
                  </a> &nbsp;
               
                 <Button type="primary" onClick={() => navigate("/")} 
                
                style={{color:"white",background:"transparent",border:"none",borderRadius:30,padding:8,}}>
                 ⬅️ Back to Home
               </Button>
                 
               </div>
      </div>
<hr></hr>
   <a
  href="https://wa.me/+971563512691"
  target="_blank"
  rel="noreferrer"
  className="whatsapp-float"
>
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
    alt="WhatsApp"
    style={{ width: 26 }}
  />
  <span>Book your Class Now</span>

  <style>
    {`
      .whatsapp-float {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #25D366;
        color: white;
        padding: 10px 16px;
        border-radius: 30px;
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        text-decoration: none;
        box-shadow: 0 6px 12px rgba(0,0,0,.25);
        animation: slideIn .6s ease-out, pulse 1.5s infinite;
        z-index: 9999;
      }

      .whatsapp-float:hover {
        transform: scale(1.05);
      }

      @keyframes slideIn {
        from {
          transform: translateX(100px);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes pulse {
        0% {
          box-shadow: 0 0 0 0 rgba(37,211,102,.7);
        }
        70% {
          box-shadow: 0 0 0 15px rgba(37,211,102,0);
        }
        100% {
          box-shadow: 0 0 0 0;
        }
      }

      }
    `}
  </style>
</a>
<h2 style={{textAlign:"center"}}>Software Courses for Kids</h2>
        <div style={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>
           Explore smart software that makes learning fun and powerful 🚀
        </Text><br></br>
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Our AI tools guide kids step-by-step, build confidence, and strengthen
          fundamentals.
        </Text>
      </div>

     
      <div style={sectionStyle("#f59e0b", "#f59e0b")}>
        <Title style={{ color: "#fff" }} level={3}>🎮 Our students created Apps</Title>
        <SliderCard list={learningApps} />
      </div>
       <div style={sectionStyle("#3b22c5", "#3b82f6")}>
        <Title style={{ color: "#fff" }} level={3}>🤖 AI Guided Learning</Title>
        <SliderCard list={aiTools} />
      </div>


      {/* <div style={sectionStyle2("#8b5cf6", "#ec4899")}>
        <Title style={{ color: "#fff" }} level={3}>🏆 Progress & Rewards</Title>
        <SliderCard list={rewards} />
      </div> */}

      <div ref={ref}>
        <ContactFooter scrollToOnline3={scrollToFooter} />
      </div>

      {/* RESPONSIVE */}
      <style>{`
        .headerBar{
          display:flex;
          justify-content:space-between;
          padding:10px;
          flex-wrap:wrap;
        }

        .logoBox{
          display:flex;
          align-items:center;
          background:white;
          padding:6px 12px;
          border-radius:12px;
        }

        .logoBox img{
          width:40px;
          margin-right:8px;
        }

        .actions{
          display:flex;
          gap:10px;
        }

        .callBtn{
          background:wheat;
          padding:8px;
          border-radius:20px;
          text-decoration:none;
        }

        @media(max-width:768px){
          .headerBar{
            justify-content:center;
            gap:12px;
          }

          .actions{
            justify-content:center;
          }
        }
      `}</style>
    </div>
  );
}
