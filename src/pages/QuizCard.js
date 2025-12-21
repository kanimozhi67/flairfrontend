import React, { useState, useEffect, useMemo, useRef } from "react";
import { Card, Button, InputNumber, Spin } from "antd";
import Timer from "./Timer";
// For category - addition and subtraction
const QuizCard = ({
  level,
  selectedLevel,
  category,
  questions,
  answers,
  setAnswers,
  submitQuiz,
  submitted,
  results,
  loading,
  fetchQuiz,
  firstInputRef,
  titleStyle,
  numberStyle,
  buttonStyle,
  playAgainButtonStyle,
  speakLine,
}) => {
  const width = window.innerWidth;
 const [timeLeft, setTimeLeft] = useState(20);
  // Dynamic styles based on screen width
  const cardWidth = width <= 480 ? 320 : width <= 768 ? 500 : 600;
  const titleFontSize = width <= 480 ? 17 : width <= 768 ? 30 : 35;
  const questionFontSize = width <= 480 ? 28 : width <= 768 ? 32 : 36;
  const inputFontSize = width <= 480 ? 24 : width <= 768 ? 30 : 36;
  const inputWidth = width <= 480 ? 80 : width <= 768 ? 100 : 120;
  const buttonFontSize = width <= 480 ? 20 : width <= 768 ? 22 : 24;
  const buttonPadding =
    width <= 480 ? "8px 0" : width <= 768 ? "10px 0" : "12px 0";

  const allAnswered = useMemo(
    () => questions.every((q) => typeof answers[q.id] === "number"),
    [answers, questions]
  );
 

  const renderedQuestions = useMemo(
    () =>
      questions.map((q, idx) => {
        const isCorrect = submitted ? results[q.id] : null;
 return (
          <div
            key={q.id}
            style={{
              marginBottom: 25,
              backgroundColor: "greenyellow",
              padding: 10,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: questionFontSize,
                fontWeight: "bold",
                color:
                  submitted && isCorrect === true
                    ? "green"
                    : submitted && isCorrect === false
                    ? "red"
                    : "black",
                marginRight: 10,
              }}
            >
              {q.a} {q.operator} {q.b} =
            </span>
            <InputNumber
              ref={idx === 0 ? firstInputRef : null}
              style={{
                fontSize: inputFontSize,
                width: inputWidth,
                borderRadius: 12,
                border:
                  !submitted && answers[q.id] == null
                    ? "2px solid red"
                    : "2px solid #ccc",
                textAlign: "center",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              value={answers[q.id]}
              onChange={(val) =>
                setAnswers((prev) => ({ ...prev, [q.id]: val ?? null }))
              }
              disabled={loading || submitted}
            />
          </div>
        );
      }),
    [
      questions,
      answers,
      results,
      submitted,
      loading,
      questionFontSize,
      inputFontSize,
      inputWidth,
      firstInputRef,
    ]
  );

  return (
    <Card
      title={
        <div
          style={{
            fontSize: titleFontSize,
            fontWeight: "bold",
            color: "#ff6b00",
            textShadow: "2px 2px #fff",
          }}
        >
          {(category ==="multiplication") ?  "🧠 Multiplication 🎉" :
         "🧠Addition & Subtraction 🎉 " }
         
          
        </div>
      }
      style={{
        marginTop: 10,
        width: cardWidth,
        textAlign: "center",
     //   backgroundColor: "#fff9c4",
     
        borderRadius: 20,
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        padding: 30,
        position: "relative",
        
      }}
    >
      {loading ? (
        <Spin size="large" />
      ) : questions.length > 0 ? (
        renderedQuestions
      ) : (
        <p style={{ fontSize: 20 }}>No questions available.</p>
      )}

      <Button
        type="primary"
        block
        size="large"
        onClick={submitQuiz}
        disabled={!allAnswered || loading || submitted || !timeLeft}
        style={{
          fontSize: buttonFontSize,
          marginTop: 20,
          borderRadius: 12,
          padding: buttonPadding,
        }}
      >
        Submit Quiz
      </Button>

      {submitted && (
        <Button
          onClick={fetchQuiz}
          block
          size="large"
          style={{
            marginTop: 20,
            fontSize: buttonFontSize,
            borderRadius: 12,
            padding: buttonPadding,
            background: "linear-gradient(135deg, #ff9d2f, #ff6126)",
            color: "white",
            fontWeight: "bold",
            border: "none",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          🔄 New Game
        </Button>
      )}
    </Card>
  );
};

export default QuizCard;
