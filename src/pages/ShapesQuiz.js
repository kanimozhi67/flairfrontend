import React, { useState, useEffect, useRef } from "react";
import api from "../api/axiosClient";
import { Card } from "antd";

export default function ShapesQuiz({ level, selectedLevel, user, addPointsToBackend }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const scoreSentRef = useRef(false);

  /* ------------------ Fetch Questions ------------------ */
  const fetchQuestions = async () => {
    try {
      const endpoint =
        selectedLevel === 1
          ? "quiz/shape"
          : selectedLevel === 2
          ? "quiz/shape2"
          : "quiz/shape3";
      const res = await api.get(endpoint);
      setQuestions(res.data.questions);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  /* ------------------ Start New Game ------------------ */
  const startNewGame = async () => {
    scoreSentRef.current = false;
    setShowResult(false);
    setCurrentIndex(0);
    setScore(0);
    setFeedback("");
    setIsAnswered(false);
    await fetchQuestions();
  };

  /* ------------------ Reset per Question ------------------ */
  useEffect(() => {
    setFeedback("");
    setIsAnswered(false);
  }, [currentIndex]);

  /* ------------------ Send Final Score ONCE ------------------ */
  useEffect(() => {
    if (showResult && !scoreSentRef.current) {
      scoreSentRef.current = true;
      addPointsToBackend(score);
      console.log("Final score sent:", score);
    }
  }, [showResult, score, addPointsToBackend]);

  /* ------------------ Loading ------------------ */
  if (questions.length === 0) return <p>Loading quiz...</p>;

  const currentQuestion = questions[currentIndex];

  /* ------------------ Handle Answer ------------------ */
  const handleOptionClick = async (option) => {
    if (isAnswered) return;
    setIsAnswered(true);

    try {
      const res = await api.post("quiz/checkshape", {
        userId: user._id,
        answer: { id: currentQuestion.id, selectedOption: option },
      });

      if (res.data.isCorrect) {
        setScore((prev) => prev + 1);
        setFeedback("✅ Correct! 🎉");
      } else {
        setFeedback(`❌ Wrong. Correct Answer: ${res.data.correctAnswer}`);
      }

      setTimeout(() => {
        if (currentIndex + 1 < questions.length) setCurrentIndex((prev) => prev + 1);
        else setShowResult(true);
      }, 1500);
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  /* ------------------ Result Screen ------------------ */
  if (showResult) {
    return (
      <div
        style={{
          textAlign: "center",
          margin: "2rem",
          borderRadius: "1.5rem",
          fontSize: "clamp(1rem, 2vw, 1.5rem)",
          background: "linear-gradient(135deg,#a9b1f3,#8a1043)",
          boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
          padding: "2rem",
          maxWidth: "90vw",
          marginInline: "auto",
        }}
      >
        <h2 style={{ color: "greenyellow" }}> 🎉 Quiz Completed!</h2>
        <hr />
        <p>
          Your Score: <strong style={{ color: "yellow" }}>{score} ⭐</strong>
        </p>
        <button
          style={{
            marginTop: 20,
            borderRadius: 12,
            background: "linear-gradient(135deg, #ff9d2f, #ff6126)",
            color: "white",
            fontWeight: "bold",
            border: "none",
            padding: "12px 24px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            cursor: "pointer",
            fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
          }}
          onClick={startNewGame}
        >
          New Game
        </button>
      </div>
    );
  }

  /* ------------------ Quiz UI ------------------ */
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
      <Card
        style={{
          borderRadius: "1.5rem",
          background: "linear-gradient(135deg,#a9b1f3,#8a1043)",
          boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
          padding: "1rem",
          maxWidth: "95vw",
          width: "600px",
        }}
      >
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.2rem, 2vw, 1.5rem)" }}>
          {selectedLevel === 1 ? " 🧠 Identify the Shape 🎉" : " 🧠 How many edges are there? 🎉"}
        </h2>
        <hr />

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            borderRadius: "1rem",
            background: "white",
            boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
            fontWeight: "bold",
            fontSize: "clamp(0.9rem, 1.2vw, 1.2rem)",
            padding: "0.2rem",
          }}
        >
          {feedback || (
            <p>
              Question {currentIndex + 1} of {questions.length}
            </p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "clamp(4rem, 20vw, 10rem)",
              flex: "1 1 150px",
              textAlign: "center",
            }}
          >
            {currentQuestion.emoji}
          </div>

          <div
            style={{
              flex: "1 1 200px",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              width: "100%",
              maxWidth: "300px",
            }}
          >
            {currentQuestion.options.map((option) => (
              <button
                key={option}
                disabled={isAnswered}
                style={{
                  padding: "0.8rem",
                  fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
                  borderRadius: 12,
                  cursor: isAnswered ? "not-allowed" : "pointer",
                  backgroundColor: "#f0f0f0",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
