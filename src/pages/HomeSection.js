import React, { useEffect, useState } from "react";  
import { Typography } from "antd";
import das from "../images/das.png";

const { Title, Paragraph } = Typography;

const features = [
  { icon: "🔔", title: "Stay on schedule with session reminders" },
  { icon: "📚", title: "Access to all session recordings" },
  { icon: "📊", title: "Clear insights into accuracy & speed" },
  { icon: "👩‍💼", title: "Instant customer care support" },
  { icon: "🤖", title: "Smart AI bot for step-by-step guidance" },
  { icon: "🔢", title: "Fun math challenges" },
];

const HomeSection = () => {
  const [containerSize, setContainerSize] = useState({ width: 500, height: 500 });

  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth - 40, 500); // padding considered
      setContainerSize({ width, height: width });
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const { width, height } = containerSize;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = width / 2.2; // radius slightly smaller to fit icons around
  const centerSize = width / 2; // central dashboard size

  return (
    <div style={{ padding: "60px 20px", textAlign: "center", color: "wheat"  }}>
      <Title level={2} style={{  fontSize: 32}}>Personalized Learning Dashboard</Title>
      <Paragraph style={{ maxWidth: 800, margin: "0 auto 40px", color: "wheat",fontSize:16 }}>
        Empower your learning with a centralized dashboard that helps you track progress, get guidance, and stay motivated.
      </Paragraph>
<br></br><br></br>
      <div
        style={{
          position: "relative",
          width: width,
          height: height,
          margin: "0 auto",
        }}
      >
        {/* Central Dashboard */}
        <div
          style={{
            position: "absolute",
            top: centerY - centerSize / 2,
            left: centerX - centerSize / 2,
            width: centerSize,
            height: centerSize,
            borderRadius: "50%",
            background: "#ffe58f",
            borderColor:" 2px solid wheat",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={das}
            alt="Dashboard"
            style={{ width: centerSize / 1.7, marginBottom: 10 }}
          />
          <Title level={4} style={{ margin: 0, fontSize: centerSize / 15 }}>
            Student Dashboard
          </Title>
        </div>

        {/* Feature Icons in a circle with glowing outlines */}
        {features.map((feature, idx) => {
          const angle = (idx / features.length) * 2 * Math.PI; // angle in radians
          const x = centerX + radius * Math.cos(angle) - 45; // center offset for icon
          const y = centerY + radius * Math.sin(angle) - 35;

          return (
            <div
              key={idx}
              style={{
                position: "absolute",
                top: y,
                left: x,
                width: 100,
                height: 70,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              {/* Circular background with glowing outline */}
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 6,
                  boxShadow: "0 0 15px 3px rgba(255,255,255,0.4)",
                  border: "2px solid rgba(255,255,255,0.6)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                }}
                className="icon-circle"
              >
                <span style={{ fontSize: width / 12 }}>{feature.icon}</span>
              </div>

              <Paragraph style={{ margin: 0, fontSize: width / 25, color: "white" }}>
                {feature.title}
              </Paragraph>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomeSection;
