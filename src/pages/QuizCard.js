import React, { useState, useEffect, useMemo, useRef } from "react";
import { Card, Button, InputNumber, Spin } from "antd";

// For category - addition and subtraction
const QuizCard = ({
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
              speakLine
}) => {
  const width = window.innerWidth;

  // Dynamic styles based on screen width
  const cardWidth = width <= 480 ? "90%" : width <= 768 ? 500 : 600;
  const titleFontSize = width <= 480 ? 24 : width <= 768 ? 30 : 35;
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
          🧠 Addition & Subtraction 🎉
        </div>
      }
      style={{
        marginTop: 10,
        width: cardWidth,
        textAlign: "center",
        backgroundColor: "#fff9c4",
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
        disabled={!allAnswered || loading || submitted}
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
          🔄 Play Again
        </Button>
      )}
    </Card>
  );
};

export default QuizCard;

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import { Card, Button, InputNumber, Spin, Modal, message } from "antd";

// //for category- addition and subtraction
// const QuizCard = ({
//   questions, answers, setAnswers, submitQuiz, submitted, results, loading, fetchQuiz,firstInputRef
// }) => {

//   const allAnswered = useMemo(
//     () => questions.every(q => typeof answers[q.id] === "number"),
//     [answers, questions]
//   );

//   const renderedQuestions = useMemo(() =>
//     questions.map((q, idx) => {
//       const isCorrect = submitted ? results[q.id] : null;
//       return (
//         <div key={q.id} style={{ marginBottom: 30, backgroundColor: "greenyellow", padding: 10, borderRadius: 10 }}>
//           <span style={{
//             fontSize: 36,
//             fontWeight: "bold",
//             color: submitted && isCorrect === true ? "green" : submitted && isCorrect === false ? "red" : "black"
//           }}>
//             {q.a} {q.operator} {q.b} =
//           </span>
//           <InputNumber
//             ref={idx === 0 ? firstInputRef : null}
//             style={{
//               marginLeft: 20,
//               fontSize: 36,
//               width: 120,
//               borderRadius: 12,
//               border: !submitted && answers[q.id] == null ? "2px solid red" : "2px solid #ccc",
//               textAlign: "center",
//               boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
//             }}
//             value={answers[q.id]}
//             onChange={val => setAnswers(prev => ({ ...prev, [q.id]: val ?? null }))}
//             disabled={loading || submitted}
//           />
//         </div>
//       );
//     }), [questions, answers, results, submitted, loading]
//   );

//   return (
//     <Card title={<div style={{ fontSize: 35, fontWeight: "bold", color: "#ff6b00", textShadow: "2px 2px #fff" }}>🧠 Addition & Subtraction 🎉</div>}
//       style={{ marginTop: 10, width: 600, textAlign: "center", backgroundColor: "#fff9c4", borderRadius: 20, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", padding: 30, position: "relative" }}>
//       {loading ? <Spin size="large" /> : (questions.length > 0 ? renderedQuestions : <p style={{ fontSize: 24 }}>No questions available.</p>)}
//       <Button type="primary" block size="large" onClick={submitQuiz} disabled={!allAnswered || loading || submitted} style={{ fontSize: 24, marginTop: 20, borderRadius: 12 }}>
//         Submit Quiz
//       </Button>
//       {submitted && <Button onClick={fetchQuiz} block size="large" style={{ marginTop: 20, fontSize: 24, borderRadius: 12, padding: "12px 0", background: "linear-gradient(135deg, #ff9d2f, #ff6126)", color: "white", fontWeight: "bold", border: "none", boxShadow: "0 4px 10px rgba(0,0,0,0.15)" }}>
//         🔄 Play Again
//       </Button>}
//     </Card>
//   );
// };
// export default QuizCard
