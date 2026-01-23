import React, { useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, Spin } from "antd";
import api from "../api/axiosClient";
import Robo from "../images/robo.png";
import { useWindowSize } from "react-use";

const { Title, Text } = Typography;

const Robot = ({ user }) => {
  const [question, setQuestion] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  const [preTalk, setPreTalk] = useState(false);
const [isSpeaking,setIsSpeaking]= useState(false);
const [showMouth, setShowMouth] = useState(false);
 const { width, height } = useWindowSize();
 const isMobile = width < 767;

 // const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  /* 🎤 SPEAK TEXT (with pre-rotation) */
  const speakText = (text) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // 🎡 rotate left → right before speaking
    setPreTalk(true);

    setTimeout(() => {
      setPreTalk(false);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = isMobile ?  0.90 : 1.05;
      utterance.pitch = 1.8;
      utterance.volume = 2;
   const voices = window.speechSynthesis.getVoices();
      utterance.voice = isMobile ? voices.find((v) => /child/i.test(v.name)) : voices.find((v) => /zira/i.test(v.name));
    //    voices.find((v) => /zira|child/i.test(v.name)) || voices[0];
        
      
      utterance.onboundary = (event) => {
        if (event.name === "word") {
          setMouthOpen(true);
          setTimeout(() => setMouthOpen(false), 100);
        }
      };

     utterance.onstart = () => {
  setIsSpeaking(true);
   setTimeout(() => {
    setShowMouth(true);
  }, 2000); // 2 seconds delay
};

utterance.onend = () => {
  setIsSpeaking(false);
  setMouthOpen(false);
    setShowMouth(false);
};


      window.speechSynthesis.speak(utterance);
    }, 700); // wait for rotation animation
  };

  /* 🎡 Robot enters with spin */
  useEffect(() => {
    setShowRobot(true);
  }, []);

  /* 👋 Greet user once */
  useEffect(() => {
    if (user?.username) {
      speakText(
        `Hi ${user.username}! I am FLAIR, your friendly AI robot. Ask me anything!`
      );
    }
  }, [user?.username]);

  /* 🧹 Cleanup */
  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  /* 🤖 Fetch answer */
  const fetchAns = async () => {
    if (!question.trim()) return;

    setLoadingExplanation(true);
    setAiExplanation("");

    try {
      const res = await api.post("/quiz/explain3", { question });
      setAiExplanation(res.data.explanation);
      speakText(res.data.explanation);
    } catch (err) {
      setAiExplanation("Oops 🤖 I didn’t understand. Try again!");
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <>
      {/* 🎨 STYLES */}
      <style>
        {`
        .robot-container {
          position: relative;
          display: inline-block;
        }

        .robot-img {
          width: clamp(220px, 55vw, 360px);
          height: auto;
        }

        /* 🎡 Page open animation */
        .robot-enter {
          animation: robotSpinIn 1.4s ease-out;
        }

        @keyframes robotSpinIn {
          0% {
            transform: rotate(-180deg) scale(0.4);
            opacity: 0;
          }
          60% {
            transform: rotate(20deg) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: rotate(0deg) scale(1);
          }
        }

        /* 🔄 Before talking rotation */
        .robot-pretalk {
          animation: preTalkRotate 0.7s ease-in-out;
        }

        @keyframes preTalkRotate {
          0%   { transform: rotate(0deg); }
          25%  { transform: rotate(-10deg); }
          50%  { transform: rotate(10deg); }
          75%  { transform: rotate(-6deg); }
          100% { transform: rotate(0deg); }
        }

        /* 👄 Mouth */
        .robot-mouth {
          position: absolute;
          top: 23%;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 6px;
          background: #ff3ea5;
          border-radius: 12px;
          transition: height 0.12s ease;
          opacity: 0.9;
        }

        .mouth-open {
          height: 9px;
          border-radius: 0 0 16px 16px;
        }

        @media (max-width: 480px) {
          .robot-img {
            width: clamp(180px, 60vw, 300px);
          }
          .robot-mouth {
            width: 14px;
            height: 5px;
          }
        }
      `}
      </style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "1rem",
          background: "linear-gradient(135deg, #fa2e2e, #092beb)",
          borderRadius: 24,
        }}
      >
        <Card
          style={{
            width: "100%",
            maxWidth: 520,
            borderRadius: 24,
            background: "transparent",
          }}
        >
          <Title
            level={2}
            style={{
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            <div className="robot-container">
              <img
                src={Robo}
                alt="Flair Robot"
                className={`robot-img
                  ${showRobot ? "robot-enter" : ""}
                  ${preTalk ? "robot-pretalk" : ""}
                `}
              />
           {isSpeaking && showMouth && (
  <div
    className={`robot-mouth ${mouthOpen ? "mouth-open" : ""}`}
  />
)}


            </div>
            <br />
            Flair AI Robot 
          </Title>

          <Text
            style={{
              display: "block",
              textAlign: "center",
              fontSize: "clamp(1rem, 4vw, 1.1rem)",
              marginBottom: 16,
              color: "#f7abab",
            }}
          >
            Ask me your doubts!
          </Text>

          <Form onFinish={fetchAns}>
            <Form.Item>
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="💭 Ask me anything!"
                size="large"
                style={{
                  borderRadius: 18,
                  fontSize: "clamp(1rem, 4vw, 1.2rem)",
                  textAlign: "center",
                  padding: "12px",
                }}
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                htmlType="submit"
                size="large"
                loading={loadingExplanation}
                style={{
                  borderRadius: 22,
                  fontWeight: "bold",
                  fontSize: "clamp(1rem, 4vw, 1.1rem)",
                  background: "linear-gradient(135deg, #34d399, #22c55e)",
                  color: "white",
                  border: "none",
                  padding: "0.6rem 2.5rem",
                }}
              >
                🚀 Ask Robot
              </Button>
            </Form.Item>
          </Form>

          {loadingExplanation && (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              <Spin size="large" />
              <Text block style={{ marginTop: 10 }}>
                🤖 Hmm… let me think!
              </Text>
            </div>
          )}

          {aiExplanation && !loadingExplanation && (
            <div
              style={{
                marginTop: 20,
                padding: 16,
                borderRadius: 16,
                background: "#ecfeff",
                border: "3px dashed #22d3ee",
              }}
            >
              <Text strong style={{ fontSize: "1.1rem" }}>
                🤖 Robot Says:
              </Text>
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "1rem",
                  marginTop: 8,
                  fontFamily: "inherit",
                }}
              >
                {aiExplanation}
              </pre>
            </div>
          )}
        </Card>
      </div>
    </>
  );
};

export default Robot;
