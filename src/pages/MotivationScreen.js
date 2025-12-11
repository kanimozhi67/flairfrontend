import React, { useState, useEffect, useMemo, useRef } from "react";
import { Card, Button, InputNumber, Spin, Modal, message } from "antd";
import { useWindowSize } from "react-use";




const MotivationScreen = ({ message, onStart }) => {
  const { width, height } = useWindowSize();
  const [showStartButton, setShowStartButton] = useState(false);

 useEffect(() => {
  let utterance;

  const speakMotivation = () => {
    utterance = new SpeechSynthesisUtterance(`You are ${message}! You can do it! Let's solve this quiz together! Click start quiz.`);
    utterance.pitch = 1.5;
    utterance.rate = 1.2;

    const voices = window.speechSynthesis.getVoices();
    // pick a suitable voice or fallback
    utterance.voice = voices.find(v => v.name.toLowerCase().includes("zira") || v.name.toLowerCase().includes("child")) || voices[0];

    window.speechSynthesis.speak(utterance);
  };

  // ensure voices are loaded
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      speakMotivation();
    };
  } else {
    speakMotivation();
  }

  const timer = setTimeout(() => setShowStartButton(true), 6000);

  return () => {
    clearTimeout(timer);
    // stop any ongoing speech when component unmounts
    if (utterance) window.speechSynthesis.cancel();
  };
}, [message]);


  return (
    <div style={{
      margin: -10, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", minHeight: "100vh",
      background: "linear-gradient(135deg, #a2d5f2, #07689f)", color: "#fff", textAlign: "center", position: "relative"
    }}>
      <div style={{ fontSize: 120 }}>⛄</div>
      <h1 style={{ fontSize: 48, fontWeight: "bold", margin: 20 }}>You are {message}!</h1>
      <p style={{ fontSize: 28, marginBottom: 40 }}>You can do it! Let's solve this quiz together! 🎉</p>
      {showStartButton && <Button type="primary" size="large" style={{ fontSize: 28, padding: "20px 40px", borderRadius: 20 }} onClick={onStart}>
        Start Quiz
      </Button>}
    </div>
  );
};
export default MotivationScreen