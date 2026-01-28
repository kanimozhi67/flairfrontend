
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../images/fologo.png";
import olymp1 from "../images/olympiad1.png";
import olymp2 from "../images/olympiad2.png";
import olymp3 from "../images/olympiad3.png";
import olymp4 from "../images/olympiad4.png";
import olymp5 from "../images/olympiad5.png";
import olymp6 from "../images/olympiad6.png";
import olymp7 from "../images/olympiad7.png";
import olymp8 from "../images/olympiad8.png";
import olymp9 from "../images/olympiad9.png";
import olymp10 from "../images/olympiad10.png";
import olymp11 from "../images/olympiad11.png";
import olymp12 from "../images/olympiad12.png";
import ContactFooter from "./ContactFooter";

const { Title, Text } = Typography;

/* ================= DATA ================= */

const olympiadList2 = [
  { img: olymp8, title: "Flair Robot 🤖", desc: "Explore how things work with AI" },
  { img: olymp2, title: "Go Ahead with Flair 🎯", desc: "Boost thinking skills" },
  { img: olymp3, title: "Logic Olympiad 💡", desc: "Step by step explanation" },
];

const olympiadList = [
  { img: olymp4, title: "Sudoku 🧩", desc: "Boost thinking skills" },
  { img: olymp9, title: "Number Series", desc: "Know numbers better" },
  { img: olymp10, title: "Logical Questions", desc: "Think smart & fast" },
  { img: olymp11, title: "Puzzles", desc: "Sharpen your brain" },
  { img: olymp12, title: "Reasoning", desc: "Fun challenges" },
  { img: olymp5, title: "Handling Currency", desc: "Practical knowledge" },
];

const olympiadList3 = [
  { img: olymp1, title: "Stickers Award", desc: "Win rewards" },
  { img: olymp6, title: "Games & Scores", desc: "Track progress" },
  { img: olymp7, title: "LeaderBoard", desc: "Global ranking" },
];

/* ================= STYLES ================= */

const pageBg = {
  minHeight: "100vh",
  background: "linear-gradient(95deg, #7b2ff7, #f107a3)",
  padding:10
};

const sectionStyle = (c1, c2) => ({
  background: `linear-gradient(135deg,${c1},${c2})`,
  padding: "10px",
  borderRadius: 32,
  margin: "40px auto",
  maxWidth: 550,
});
const sectionStyle2 = (c1, c2) => ({
  background: `linear-gradient(135deg,${c1},${c2})`,
  padding: "10px",
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
  maxHeight: 400,
  objectFit: "contain",
};

/* ================= SLIDERS ================= */

const SliderCard2 = ({ list }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(v => (v + 1) % list.length), 4000);
    return () => clearInterval(t);
  }, [list.length]);

  const item = list[index];

  return (
  
    <Card style={cardStyle}>
      <p style={{fontWeight:"bold",textAlign:"start",
    //  border:"2px solid red",
      borderRadius:5,
        padding:5,
        
        //display:"inline-block"
        }}>{index+1}/{list.length}</p>
      <img src={item.img} alt="" style={imageStyle} />
      <Title level={4}>{item.title}</Title>
      <Text>{item.desc}</Text>
    </Card>
  );
};

// const SliderCard = ({ list }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => setIndex(v => (v + 2) % list.length), 4000);
//     return () => clearInterval(t);
//   }, [list.length]);

//   const first = list[index];
//   const second = list[(index + 1) % list.length];

//   return (
//     <div className="sliderRow">
//       {[first, second].map((item, i) => (
//         <Card key={i} style={{ ...cardStyle, width: "100%" }}>
//           <img src={item.img} alt="" style={imageStyle} />
//           <Title level={4}>{item.title}</Title>
//           <Text>{item.desc}</Text>
//         </Card>
//       ))}
//     </div>
//   );
// };

/* ================= MAIN ================= */

export default function OlympiadExplore() {
  const navigate = useNavigate();
  const onlineRef3 = useRef(null);
 const scrollToOnline3 = () => {
    onlineRef3.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div style={pageBg}>
      <div ref={onlineRef3} className="headerBar">
        <div 
       // className="logoBox"
        
        style={{
              display: "flex",
             // alignItems: "center",
              background: "whitesmoke",
              color: "purple",
              padding: "6px 12px",
              borderRadius: 12,
              fontWeight: "bold",
              fontSize: 24,
            }}  
        >
          <img src={logo} alt="logo" style={{ width: 40, marginRight: 8 }} />
        <Button style={{textDecoration:"none",border:"none",fontSize: 20,
        color: "purple",background:"transparent",padding:0,}}
        onClick={()=>navigate("/")}
        > FLAIR OLYMPIAD </Button> 
        </div>

        <div
        // className="actions"
         >
                  <Button
  onClick={() => navigate("/exploresoft")}
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
  🚀 Explore Software Courses
</Button> &nbsp;
          <a href="tel:00971563512691" 
          style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20,textDecoration:"none"}}
          > 📞
           {/* Contact Us */}
           </a> &nbsp;
        
          <Button type="primary" onClick={() => navigate("/")} 
         
         style={{color:"white",background:"transparent",border:"none",borderRadius:30,padding:8,}}>
          ⬅️ Back to Home
        </Button>
          
        </div>
      </div>
<hr></hr ><h2 style={{textAlign:"center"}}>Olympiad Courses </h2>
      <div style={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
        <Text style={{ color: "#fff", fontSize: 16 }}>
          Olympiads strengthen basics and build confidence.
        </Text>
       <br></br>
     

          <Text style={{ fontSize: 16, color: "#fffcfc" }}>
            Our{" "}
            <strong style={{ color: "#f5dd09" }}>AI-powered learning bots</strong>{" "}
            act like friendly tutors 🤖. They explain mistakes patiently and guide
            kids step-by-step until concepts become crystal clear.
        </Text>
      </div>
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
  <span>Book Your Class Now</span>

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
 <div
        style={{
          border: "2px solid white",
          borderRadius: "clamp(10px, 2vw, 20px)",
       //   margin: isMobile? 0:"30px auto",
          margin: "10px",padding:10,
        //  maxWidth: isMobile?"100%":"90%",
        //  width: "100%",
          boxSizing: "border-box",
          zIndex: 5,
        }}
      >
      <div style={sectionStyle("#8b5cf6", "#60a5fa")}>
        <Title style={{ color: "#fff" }} level={3}> 🚀 Smart AI Bot for Guidance</Title>
        <SliderCard2 list={olympiadList2} />
      </div>
    <Text style={{   display: "block",
          maxWidth: 900,
          margin: "0 auto",
          fontSize: 16,
          color: "#fffcfc",
          textAlign: "center",}}>
           🌈 Flair Olympiad help children strengthen their basics in Mathematics.<br></br>They improve
          thinking, problem-solving, and confidence from an early age.
        </Text>
      
  <br />
      <div style={sectionStyle("#fb923c", "#f472b6")}>
        <Title style={{ color: "#fff" }} level={3}>  🚀 Challenging Puzzles ,Fun Math and Riddles</Title>
        <SliderCard2 list={olympiadList} />
      </div>
       <Text
        style={{
          display: "block",
          maxWidth: 900,
          margin: "0 auto",
          fontSize: 16,
          color: "#fffcfc",
          textAlign: "center",
        }}
      >
        <strong style={{ color: "#d4d4ce" }}>Flair Olympiad</strong> focuses on
        concept clarity instead of memorization. Kids build strong fundamentals
        and gain confidence to face competitive exams happily 😊
      </Text>
      <div style={sectionStyle2("#6cb8f7", "#740743")}>
        <Title style={{ color: "#fff" }} level={3}> 🚀 Clear Insights into Accuracy & Speed</Title>
        <SliderCard2 list={olympiadList3} />
      </div>
</div>
      <ContactFooter 
         scrollToOnline3={scrollToOnline3}
      />

      {/* RESPONSIVE CSS */}
      <style>{`
        .sliderRow{
          display:flex;
          gap:20px;
        }

        .headerBar{
          display:flex;
          justify-content:space-between;
          padding:10px;
         padding-top:20px;
         padding-bottom:5px;
         
          flex-wrap:wrap;
        }

        .logoBox{
          display:flex;
          align-items:center;
          background:whitesmoke;
          color:purple
          padding:6px 19px;
          border-radius:12px;
          font-weight:bold;
          font-size:24;
        }

        .logoBox img{
          width:40px;
          margin-right:8px;
        }

        .actions{
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        }

        @media(max-width:768px){
          .sliderRow{
            flex-direction:column;
          }

          .headerBar{
            justify-content:center;
            text-align:center;
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
