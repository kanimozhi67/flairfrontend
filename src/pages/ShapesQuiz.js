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
    const [aiExplanations, setAiExplanations] = useState({});
    const [loadingExplanation, setLoadingExplanation] = useState(false);

  /* ------------------ Fetch Questions ------------------ */
  const fetchQuestions = async () => {
    try {
      const endpoint =
      level==="primary" ? (
        selectedLevel === 1
          ? "quiz/shapep1"
          : selectedLevel === 2
          ? "quiz/shapep2"
          : "quiz/shapep3"
      ) : (
        selectedLevel === 1
          ? "quiz/shape"
          : selectedLevel === 2
          ? "quiz/shape2"
          : "quiz/shape3")
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
  // const handleOptionClick = async (option) => {
  //   if (isAnswered) return;
  //   setIsAnswered(true);

  //   try {
  //     const res = await api.post("quiz/checkshape", {
  //       userId: user._id,
  //       answer: { id: currentQuestion.id, selectedOption: option },
  //     });

  //     if (res.data.isCorrect) {
  //       setScore((prev) => prev + 1);
  //       setFeedback("✅ Correct! 🎉");
  //     } else {
  //       setFeedback(`❌ .   Correct Answer: ${res.data.correctAnswer}`);
  //     }

  //     setTimeout(() => {
  //       if (currentIndex + 1 < questions.length) setCurrentIndex((prev) => prev + 1);
  //       else setShowResult(true);
  //     }, 1500);
  //      const explanations = {};

  // for (const item of [...answers, { id: current.id, question: current.question, answer: selected }]) {
  //   const correct = response.data.correctAnswers?.[item.id];

  //   if (String(item.answer) !== String(correct)) {
  //     const explainRes = await api.post("/quiz/explain2", {
  //       question: item.question,
  //       correctAnswer: correct,
  //       userAnswer: item.answer
  //     });

  //     explanations[item.id] = explainRes.data.explanation;
  //   }
  // }

  // setAiExplanations(explanations);
  //   } catch (err) {
  //     console.error("Error submitting answer:", err);
  //   }
  // };
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
      setFeedback(`❌ Correct Answer: ${res.data.correctAnswer}`);

      if(level==="primary") {
      // 🔥 AI explanation ONLY for wrong answer
    const explainRes = await api.post("/quiz/explain3", {
  question: `Give edges, vertices, and cornersof all 2d and 3d shapes `,
 
});


      setAiExplanations((prev) => ({
        ...prev,
        [currentQuestion.id]: explainRes.data.explanation,
      }));
    }}

    setTimeout(() => {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setIsAnswered(false);
      } else {
        setShowResult(true);
      }
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
{Object.keys(aiExplanations).length > 0 && (
  <div style={{ marginTop: 20, textAlign: "left" }}>
    <hr />
    <h3>🤖 Explanations</h3>

    {Object.entries(aiExplanations).map(([questionId, explanation]) => (
      <div key={questionId} style={{ marginBottom: "1rem" }}>
        <pre style={{ whiteSpace: "pre-wrap" }}>{explanation}</pre>
      </div>
    ))}
  </div>
)}


       <hr />
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
        <h2 style={{ textAlign: "center", fontSize: "clamp(1.4rem, 2.2vw, 1.7rem)" }}>
          { level==="primary" ? (selectedLevel === 1 ? " 🧠  How many faces are there? 🎉" 
          : " 🧠 How many edges and vertices are there? 🎉")
          : (selectedLevel === 1 ? " 🧠 Identify the Shape 🎉" : " 🧠 How many edges are there? 🎉")
          }
        </h2>
        <hr />

        <div
          style={{
            textAlign: "center",
            marginTop: "1rem",
            borderRadius: "1rem",
            background: "#32dd96ff",
            boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
            fontWeight: "bold",
            fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
           // padding: "0.2rem",
          }}
        >
          {feedback || (
            <p style={{ textAlign: "center",
            marginTop: "1rem",
            borderRadius: "1rem",
            background: "#ebf1efff",
            boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
            fontWeight: "bold",
            fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)",
          //  padding: "0.2rem",
            }}>
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
                  fontSize: "clamp(1.2rem, 1.7vw, 1.4rem)",
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
