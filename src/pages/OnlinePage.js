import React from "react";
import { Row, Col, Card, Button, Typography, Tag } from "antd";
import HomePage from "./HomePage";
import gift from "../images/gift.png";
import questimg from "../images/questions.png";
import olymp from "../images/olym.png";
import appc from "../images/appc.png";
import { useNavigate } from "react-router-dom";


const { Title, Paragraph } = Typography;

const OnlinePage = () => {
  const navigate=useNavigate();
  const sectionStyle = (color1, color2) => ({
    background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
    padding: "60px 20px",
    borderRadius: "30px",
    marginBottom: "40px",
    color: "#fff",
  });

  const cardStyle = {
    borderRadius: 20,
   // boxShadow: "0 12px 25px rgba(0,0,0,0.2)",
  //  background: "rgba(255,255,255,0.9)",
    transition: "transform 0.3s",
  };

  return (
    <div>
      
   
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "10px 20px" }}>
      {/* Heading */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Title level={1} style={{ color: "#fcfbfbff", fontWeight: "bold" }}>
          Holistic Learning Programs <br /> for Every Stage
        </Title>
        <Paragraph style={{ maxWidth: 700, margin: "0 auto", fontSize: 18, color: "#f8e0e0ff" }}>
          Experience interactive lessons, expert guidance, and personalized learning journeys designed
          to unlock your full potential.
        </Paragraph>
      </div>

      {/* KG1 - Grade 3 Section */}
      <div style={sectionStyle("#8954c2ff", "#5990eeff")}>
        <Row align="middle" gutter={[24, 24]}>
          <Col xs={24} md={10}>
            <img
              src={gift}
              alt="KG1-3"
              style={{ width: "100%", borderRadius: 20 }}
            />
          </Col>
          <Col xs={24} md={14}>
            <Tag color="gold" style={{ fontWeight: "bold", marginBottom: 12 }}>
              KG1 - GRADE 3
            </Tag>
            <Title level={3} style={{ color: "#fff" }}>
              FLAIR OLYMPIAD'S Early Learn
            </Title>
            <Paragraph style={{ color: "#f0f0f0", fontSize: 20 }}>
              A fun and engaging early learning program to spark curiosity in young minds.
            </Paragraph>
            {/* <Button type="primary" shape="round">
              Contact Us
            </Button> */}
 <a href="tel:00971563512691" 
 style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20,}}
 >
  📞 Contact Us</a>&nbsp;&nbsp;&nbsp;
   <a href="https://wa.me/00971563512691" target="_blank"
    style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20}}
   >
💬 Chat on WhatsApp
</a>
          </Col>
        </Row>
      </div>

      {/* Grade 4 - 12 Section */}
      <div style={sectionStyle("#f36c0cff", "#f14e9dff")}>
        <Row align="middle" gutter={[24, 24]} justify="end">
          <Col xs={24} md={14}>
            <Tag color="cyan" style={{ fontWeight: "bold", marginBottom: 12 }}>
              GRADE 4 - 12
            </Tag>
            <Title level={3} style={{ color: "#fff" }}>
              FLAIR OLYMPIAD'S
            </Title>
            <Paragraph style={{ color: "#fdfdfd", fontSize: 20 }}>
              A smart learning app that adapts to you—anytime, anywhere, for smarter results.
            </Paragraph>
            {/* <Button type="primary" shape="round">
              Contact Us
            </Button> */}
             <a href="tel:00971563512691" 
 style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20,}}
 >
  📞 Contact Us</a>&nbsp;&nbsp;&nbsp;
   <a href="https://wa.me/00971563512691" target="_blank"
    style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20}}
   >
💬 Chat on WhatsApp
</a>
          </Col>
          <Col xs={24} md={10}>
            <img
              src={questimg}
              alt="Grade 4-12"
              style={{ width: "100%", borderRadius: 20 }}
            />
          </Col>
        </Row>
      </div>

      {/* Olympiad / App Creator Section */}
      <div style={sectionStyle("#6cb8f7ff", "#740743ff")}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={8} style={{ textAlign: "center" ,border:"3px solid wheat" ,padding:30,borderRadius:10 , 
           
          }}>
            <img
              src={olymp}
              alt="Olympiad"
              style={{ width: "100%", borderRadius: 20 }}
            />
            <Paragraph style={{ color: "#fff", marginTop: 12,fontSize:20 }}>
              Step-by-step curriculum for Olympiad aspirants.
            </Paragraph>
            {/* <Button type="primary" block shape="round" style={{fontSize:20,
             backgroundColor:"orange",padding: "5px 1px"}}>
              Explore Olympiad
            </Button> */}
      
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
</Button>

          </Col>

          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <Title level={1} style={{ color: "#f5eaeaff",fontSize:28 , fontWeight:"bold"}}>
              FLAIR OLYMPIAD'S
            </Title>
            <Title level={2} style={{ color: "#faf5f7ff" ,fontSize:20 , fontWeight:"bold"}}>
              ADVANCED LEVEL
            </Title>
          </Col>

          <Col xs={24} md={8} style={{ textAlign: "center",border:"3px solid wheat" ,padding:30,borderRadius:10 , }}>
            <img
              src={appc}
              alt="App Creator"
              style={{ width: "100%", borderRadius: 20 }}
            />
            <Paragraph style={{ color: "#fff", marginTop: 12,fontSize:20 }}>
              Intensive coaching plan for aspiring app creators.
            </Paragraph>
            <Button type="primary" block shape="round" style={{fontSize:20, backgroundColor:"orange",padding: "5px 1px"}}>
              Explore Software Courses
            </Button>
          </Col>
        </Row>
      </div>
    </div>
     </div>
  );
};

export default OnlinePage;
