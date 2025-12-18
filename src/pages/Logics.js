import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Button, message, Spin, Space } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import api from "../api/axiosClient";

const Logics = ({ selectedLevel, user, addPointsToBackend }) => {
  const shapes =
    selectedLevel === 1
      ? ["🟪", "⭐", "💛", "💎", "⭕", "🟢"]
      : selectedLevel === 2
      ? ["❤️", "💛", "💚", "💙", "💜", "🖤", "🤍"]
      : ["⬅️", "➡️", "⬆️", "⬇️", "🔄"];

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswersList, setUserAnswersList] = useState([]);
  const [timeLeft, setTimeLeft] = useState(20);
  const timerRef = useRef(null);
  const [disabled, setDisabled] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  const fetchQuestions = async () => {
    setDisabled(false);
    setShowResults(false);
    setUserAnswersList([]);
    setResults([]);
    setScore(0);
    setCurrentIndex(0);

    try {
      const endpoint =
        selectedLevel === 1
          ? "/quiz/logic"
          : selectedLevel === 2
          ? "/quiz/logiclevel2"
          : "/quiz/logiclevel3";

      const res1 = await api.get(endpoint);
      const res2 = await api.get(endpoint);
      const res3 = await api.get(endpoint);

      setQuestions([res1.data, res2.data, res3.data]);
      startTimer();
    } catch (err) {
      message.error("Failed to load questions.");
    }
  };

  useEffect(() => {
    fetchQuestions();
    return () => clearInterval(timerRef.current);
  }, [selectedLevel]);

  const startTimer = () => {
    clearInterval(timerRef.current);
    setTimeLeft(50);
    setDisabled(false);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setDisabled(true);
          message.warning("Time's up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const nextQuestion = () => {
    clearInterval(timerRef.current);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      startTimer();
    }
  };

  const calculateScore = (answers, correctAnswers) => {
    let s = 0;
    questions.forEach((q, idx) => {
      const userAns = answers[idx] || {};
      const correctAns = correctAnswers?.[q.id];
      if (!correctAns) return;
      const isCorrect = Object.keys(correctAns).every(
        (key) => userAns[key] === correctAns[key]
      );
      if (isCorrect) s += 1;
    });
    addPointsToBackend(s);
    return s;
  };

  const submitQuiz = async () => {
    clearInterval(timerRef.current);
    setDisabled(true);

    const payload = {
      userId: user?._id,
      answers: questions.map((q, idx) => ({
        id: q.id,
        answer: userAnswersList[idx] || {},
      })),
    };

    try {
      const res = await api.post("/quiz/checklogic", payload);
      setResults(res.data.correctAnswers);
      setScore(calculateScore(userAnswersList, res.data.correctAnswers));
      setShowResults(true);
    } catch (err) {
      message.error("Failed to submit quiz.");
    }
  };

  const resetQuiz = () => fetchQuestions();
  const newGame = () => fetchQuestions();

  useEffect(() => {
    if (Object.keys(results).length > 0) {
      setScore(calculateScore(userAnswersList, results));
    }
  }, [userAnswersList, results]);

  const currentQuestion = questions[currentIndex];

  const handleSelectAnswer = (shape) => {
    if (disabled) return;

    const currentAnswers = userAnswersList[currentIndex] || {};
    const firstEmptyIndex = currentQuestion.pattern.findIndex(
      (item, idx) => item === "❓" && !currentAnswers[idx]
    );
    if (firstEmptyIndex === -1) return;

    setUserAnswersList((prev) => {
      const newList = [...prev];
      newList[currentIndex] = { ...currentAnswers, [firstEmptyIndex]: shape };
      return newList;
    });
  };

  const handleResetCell = (index) => {
    if (disabled) return;
    const currentAnswers = userAnswersList[currentIndex] || {};
    setUserAnswersList((prev) => {
      const newList = [...prev];
      newList[currentIndex] = { ...currentAnswers, [index]: undefined };
      return newList;
    });
  };

  if (!questions.length) return <Spin />;

  if (showResults || Object.keys(results).length > 0) {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>
          Score: {score} / {questions.length}
        </h2>
        {questions.map((question, qIdx) => (
          <Card
            key={question.id}
            title={`Logic Puzzle ${qIdx + 1}/3`}
            style={{
              marginBottom: 16,
              width: "95%",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Row gutter={[12, 12]} justify="center" wrap>
              {question.pattern.map((item, index) => {
                const userAns = (userAnswersList[qIdx] || {})[index] || "";
                const correctEmoji = results[question.id]?.[index];
                let backgroundColor = "transparent";
                if (correctEmoji) {
                  if (userAns === correctEmoji) backgroundColor = "#b6fcb6";
                  else if (userAns !== "") backgroundColor = "#fcb6b6";
                }

                return (
                  <Col
                    key={index}
                    xs={8}
                    sm={6}
                    md={4}
                    lg={3}
                    style={{ textAlign: "center" }}
                  >
                    {item === "❓" ? (
                      <div
                        style={{
                          width: "100%",
                          paddingTop: "100%",
                          border: "2px dashed #999",
                          position: "relative",
                          fontSize: "clamp(18px, 3vw, 24px)",
                          backgroundColor,
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {userAns}
                        </span>
                      </div>
                    ) : (
                      <span style={{ fontSize: "clamp(20px, 4vw, 28px)" }}>
                        {item}
                      </span>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Card>
        ))}
        <Space
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 16,
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <Button icon={<UndoOutlined />} onClick={resetQuiz}>
            Reset
          </Button>
          <Button type="primary" onClick={newGame}>
            New Game
          </Button>
        </Space>
      </div>
    );
  }

  return (
    <Card
      style={{
        width: "95%",
        maxWidth: 600,
        margin: "20px auto",
        padding: "16px",
      }}
    >
      <h2 style={{ fontSize: "clamp(18px, 3vw, 24px)" }}>
        ⭐ Logic Puzzle {currentIndex + 1}/3 &nbsp;&nbsp; Time left:{" "}
        <span style={{ color: "orange" }}>{timeLeft}s</span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          icon={<UndoOutlined />}
          onClick={resetQuiz}
          style={{ color: "blue", fontSize: "clamp(14px, 2vw, 20px)" }}
        >
          Reset
        </Button>
      </h2>
      <hr />

      <Row gutter={[12, 12]} justify="center" wrap>
        {currentQuestion.pattern.map((item, index) => {
          const userAns = (userAnswersList[currentIndex] || {})[index] || "";
          return (
            <Col
              key={index}
              xs={8}
              sm={6}
              md={4}
              lg={3}
              style={{ textAlign: "center" }}
            >
              {item === "❓" ? (
                <div
                  onClick={() => handleResetCell(index)}
                  style={{
                    width: "100%",
                    paddingTop: "100%",
                    border: "2px dashed #999",
                    position: "relative",
                    fontSize: "clamp(18px, 3vw, 24px)",
                    cursor: "pointer",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {userAns}
                  </span>
                </div>
              ) : (
                <span style={{ fontSize: "clamp(20px, 4vw, 28px)" }}>
                  {item}
                </span>
              )}
            </Col>
          );
        })}
      </Row>

      <h3 style={{ marginTop: 24, fontSize: "clamp(16px, 2.5vw, 20px)" }}>
        Choose an answer:
      </h3>
      <Row gutter={[12, 12]} justify="center" wrap>
        {shapes.map((shape) => (
          <Col
            key={shape}
            xs={8}
            sm={6}
            md={4}
            lg={3}
            style={{ textAlign: "center" }}
          >
            <Button
              style={{ fontSize: "clamp(20px, 3vw, 26px)", width: "100%" }}
              onClick={() => handleSelectAnswer(shape)}
              disabled={disabled}
            >
              {shape}
            </Button>
          </Col>
        ))}
      </Row>

      <Row justify="center" style={{ marginTop: 24 }}>
        {currentIndex < questions.length - 1 ? (
          <Button type="primary" onClick={nextQuestion}>
            Next
          </Button>
        ) : (
          <Button type="primary" onClick={submitQuiz}>
            Submit
          </Button>
        )}
      </Row>
    </Card>
  );
};

export default Logics;
