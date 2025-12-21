import React, { useState, useEffect } from "react";
import { Button, Typography, Progress } from "antd";
import Confetti from "react-confetti"; // npm install react-confetti
import api from "../api/axiosClient";

const { Text } = Typography;

const QuizWithTimer = ({
  
  questions,
  answers,
  setAnswers,
  setFeedbackMessage,
  setFinalScore,
  setSubmitted,
  addPointsToBackend,
  setResults,
  giftmessage,
  fetchQuiz,
  speakLine,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [optionsList, setOptionsList] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // ---------------------------------------
  // Generate options ONCE when questions load
  // ---------------------------------------
  useEffect(() => {
    if (!questions || questions.length === 0) return;

    const generateOptions = (q) => {
      const correct =
        q.operator === "+"
          ? q.a + q.b
          : q.operator === "-"
          ? q.a - q.b
          : q.operator === "*"
          ? q.a * q.b
          : 0;

      const wrong1 = correct + 1;
      const wrong2 = correct - 1;
      const wrong3 = correct + 2;

      return [correct, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    };

    const built = questions.map((q) => ({
      id: q.id,
      text: `${q.a} ${q.operator} ${q.b} = ?`,
      options: generateOptions(q),
      correct:
        q.operator === "+"
          ? q.a + q.b
          : q.operator === "-"
          ? q.a - q.b
          : q.a * q.b,
    }));

    setOptionsList(built);
  }, [questions]);

  // ---------------------------------------
  // Timer per question
  // ---------------------------------------
  useEffect(() => {
    if (quizCompleted || optionsList.length === 0) return;

    setTimeLeft(30);
    setSelectedOption(null);

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          // Auto-mark unanswered question
          const q = optionsList[currentIndex];
          const updatedAnswers = {
            ...answers,
            [q.id]: answers[q.id] ?? null,
          };
          setAnswers(updatedAnswers);

          // Move to next question or submit if last
          if (currentIndex === questions.length - 1) {
            setQuizCompleted(true);
            submitQuizTimer(updatedAnswers);
            speakLine &&
              speakLine(
                "Great job! You finished all questions. Keep exploring. Your passion will guide you forward."
              );
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
          } else {
            setCurrentIndex((i) => i + 1);
          }

          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, quizCompleted, optionsList, answers]);

  // ---------------------------------------
  // Submit quiz
  // ---------------------------------------
  const submitQuizTimer = async (finalAnswers = answers) => {
    const hasAllKeys = questions.every((q) =>
      finalAnswers.hasOwnProperty(q.id)
    );

    if (!hasAllKeys) {
      setFeedbackMessage("⚠️ Quiz incomplete!");
      return;
    }

    try {
      const res = await api.post("/quiz/check", {
        answers: questions.map((q) => ({
          id: q.id,
          answer: finalAnswers[q.id],
        })),
      });

      const score = res?.data?.score ?? 0;
      setFinalScore(score);
      setSubmitted(true);

      await addPointsToBackend(score);

      const resResults = {};
      questions.forEach((q) => {
        resResults[q.id] =
          Number(finalAnswers[q.id]) === Number(res.data.correctAnswers[q.id]);
      });
      setResults(resResults);
      giftmessage(score);
    } catch (err) {
      console.error("submitQuiz (math) error:", err);
      setFeedbackMessage("❌ Submit failed.");
    }
  };

  // ---------------------------------------
  // Handle answer selection
  // ---------------------------------------
  const handleAnswer = (questionId, value) => {
    setSelectedOption(value);

    const updatedAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(updatedAnswers);

    // Move to next question or submit if last
    if (currentIndex === questions.length - 1) {
      setQuizCompleted(true);
      submitQuizTimer(updatedAnswers);
      speakLine &&
        speakLine(
          "Great job! You finished all questions. Keep exploring. Your passion will guide you forward."
        );
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      setTimeout(() => setCurrentIndex((i) => i + 1), 500);
    }
  };

  // ---------------------------------------
  // Play Again
  // ---------------------------------------
  const handlePlayAgain = () => {
    setAnswers({});
    setCurrentIndex(0);
    setQuizCompleted(false);
    setSelectedOption(null);
    setShowConfetti(false);
    fetchQuiz();
  };

  // ---------------------------------------
  // Loading states
  // ---------------------------------------
  if (!questions || questions.length === 0)
    return <Text>Loading questions...</Text>;
  if (optionsList.length === 0) return <Text>Preparing questions...</Text>;

  // ---------------------------------------
  // Render completed quiz
  // ---------------------------------------
  if (quizCompleted) {
    return (
      <div
        style={{
        
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          background: "linear-gradient(to right, #fff1b8, #ffd6e7)",
          padding: 20,
        }}
      >
        {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
        <div
          style={{
            background: "#fff",
            borderRadius: 25,
            padding: 30,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            maxWidth: 700,
            width: "100%",
            textAlign: "center",
          }}
        >
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#ff6600" }}>
            Quiz Completed! 🎉
          </Text>

          <div style={{ marginTop: 30 }}>
            {optionsList.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = Number(userAnswer) === q.correct;
              return (
                <div
                  key={q.id}
                  style={{
                    marginBottom: 15,
                    padding: 15,
                    borderRadius: 15,
                    backgroundColor: isCorrect ? "#d4f7dc" : "#fddcdc",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    textAlign: "center",
                  }}
                >
                  <Text style={{ fontSize: 22, fontWeight: "bold" }}>
                    {idx + 1}. {q.text}
                  </Text>
                  <br />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: isCorrect ? "green" : "red",
                    }}
                  >
                    Your answer: {userAnswer} {isCorrect ? "✅" : "❌"}
                  </Text>
                  {!isCorrect && (
                    <>
                      <br />
                      <Text
                        style={{ fontSize: 20, color: "blue", fontWeight: 600 }}
                      >
                        Correct answer: {q.correct}
                      </Text>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 30 }}>
            <Button
              type="primary"
              onClick={handlePlayAgain}
              style={{
                fontSize: 20,
                padding: "12px 30px",
                borderRadius: 20,
                background: "linear-gradient(135deg,#ff9d2f,#ff6126)",
                color: "#fff",
                fontWeight: 700,
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              New Game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------
  // Render current question
  // ---------------------------------------
  const currentQ = optionsList[currentIndex];

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: 0,
        background: "linear-gradient(to right, #fff1b8, #ffd6e7)",
        padding: 30,
        borderRadius: 20,
        boxShadow: "0 0 20px rgba(0,0,0,0.2)",
        maxWidth: 600,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Text style={{ fontSize: 26, fontWeight: "bold", color: "#ff6600" }}>
        Question {currentIndex + 1} of {questions.length}
      </Text>

      <div style={{ marginTop: 20, fontSize: 28, fontWeight: "bold" }}>
        {currentQ.text}
      </div>

      <div style={{ marginTop: 25 }}>
        {currentQ.options.map((opt, i) => (
          <Button
            key={i}
            type="default"
            onClick={() => handleAnswer(currentQ.id, opt)}
            style={{
              margin: "8px",
              fontSize: 22,
              padding: "12px 24px",
              borderRadius: 12,
              backgroundColor: selectedOption === opt ? "#ff9d2f" : "#fff",
              color: selectedOption === opt ? "#fff" : "#000",
              boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
              transition: "0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              if (selectedOption !== opt)
                e.target.style.backgroundColor = "#ffe680";
            }}
            onMouseLeave={(e) => {
              if (selectedOption !== opt)
                e.target.style.backgroundColor =
                  selectedOption === opt ? "#ff9d2f" : "#fff";
            }}
          >
            {opt}
          </Button>
        ))}
      </div>

      <div style={{ marginTop: 25 }}>
        <Progress
          percent={((currentIndex + 1) / questions.length) * 100}
          showInfo={false}
          strokeColor={{ from: "#ff9d2f", to: "#ff6126" }}
          strokeWidth={12}
          style={{ borderRadius: 10 }}
        />
        <Text style={{ fontSize: 24, color: "red" }}>
          Time Left: {timeLeft}s
        </Text>
      </div>
    </div>
  );
};

export default QuizWithTimer;
