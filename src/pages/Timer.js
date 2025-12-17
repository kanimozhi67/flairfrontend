import React, { useEffect, useState, useRef } from "react";
import { Card, Row, Col, Button, message, Spin, Space } from "antd";
import { ReloadOutlined, UndoOutlined } from "@ant-design/icons";
import api from "../api/axiosClient";



const Logics = ({ selectedLevel, user , addPointsToBackend}) => {
    const shapes = selectedLevel === 1 ? ["🟪","⭐", "💛", "💎", "⭕", "🟢"] :
    selectedLevel === 2 ?  ["❤️", "💛", "💚", "💙", "💜", "🖤", "🤍"] : [  "⬅️",  "➡️",  "⬆️",   "⬇️",  "🔄" ];
    ;
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
        if(selectedLevel === 1){
      const res1 = await api.get("/quiz/logic");
      const res2 = await api.get("/quiz/logic");
      const res3 = await api.get("/quiz/logic");
      setQuestions([res1.data, res2.data, res3.data]);
    
        }  else if(selectedLevel === 2){
      const res1 = await api.get("/quiz/logiclevel2");
      const res2 = await api.get("/quiz/logiclevel2");
      const res3 = await api.get("/quiz/logiclevel2");
      setQuestions([res1.data, res2.data, res3.data]);
        }else {
      const res1 = await api.get("/quiz/logiclevel3");
      const res2 = await api.get("/quiz/logiclevel3");
      const res3 = await api.get("/quiz/logiclevel3");
      setQuestions([res1.data, res2.data, res3.data]);
        }

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
    setTimeLeft(20);
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

  const handleDragStart = (e, shape) => {
    e.dataTransfer.setData("shape", shape);
  };

  const handleDrop = (e, index) => {
    if (disabled) return;
    const shape = e.dataTransfer.getData("shape");
    const currentAnswers = userAnswersList[currentIndex] || {};
    setUserAnswersList((prev) => {
      const newList = [...prev];
      newList[currentIndex] = { ...currentAnswers, [index]: shape };
      return newList;
    });
  };

  const allowDrop = (e) => e.preventDefault();

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
      if (!correctAns) return; // skip if correct answers not loaded yet
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
    // Live score update before submission if results available
    if (Object.keys(results).length > 0) {
      setScore(calculateScore(userAnswersList, results));
    }
  }, [userAnswersList, results]);

  if (!questions.length) return <Spin />;

  const currentQuestion = questions[currentIndex];

  // **After submission or live score display**
  if (showResults || Object.keys(results).length > 0) {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Score: {score} / {questions.length}</h2>
        {questions.map((question, qIdx) => (
          <Card
            key={question.id}
            title={`Logic Puzzle ${qIdx + 1}/3`}
            style={{ marginBottom: 16 }}
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
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    style={{ textAlign: "center" }}
                  >
                    {item === "❓" ? (
                      <div
                        style={{
                          width: "80%",
                          paddingTop: "80%",
                          border: "2px dashed #999",
                          position: "relative",
                          fontSize: "calc(20px + 1vw)",
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
                      <span style={{ fontSize: "calc(24px + 1vw)" }}>{item}</span>
                    )}
                  </Col>
                );
              })}
            </Row>
          </Card>
        ))}
        <Space style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
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
      title={`Logic Puzzle ${currentIndex + 1}/3 - Time left: ${timeLeft}s`}
      extra={
        <Space>
          <Button icon={<UndoOutlined />} onClick={resetQuiz}>
            Reset
          </Button>
        </Space>
      }
    >
      <Row gutter={[12, 12]} justify="center" wrap>
        {currentQuestion.pattern.map((item, index) => {
          const userAns = (userAnswersList[currentIndex] || {})[index] || "";

          return (
            <Col
              key={index}
              xs={6}
              sm={4}
              md={3}
              lg={2}
              style={{ textAlign: "center" }}
            >
              {item === "❓" ? (
                <div
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={allowDrop}
                  style={{
                    width: "80%",
                    paddingTop: "80%",
                    border: "2px dashed #999",
                    position: "relative",
                    fontSize: "calc(20px + 1vw)",
                    cursor: disabled ? "not-allowed" : "pointer",
                    opacity: disabled ? 0.6 : 1,
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
                <span style={{ fontSize: "calc(24px + 1vw)" }}>{item}</span>
              )}
            </Col>
          );
        })}
      </Row>

      <Row gutter={[12, 12]} justify="center" wrap style={{ marginTop: 24 }}>
        {shapes.map((shape) => (
          <Col key={shape} xs={6} sm={4} md={3} lg={2} style={{ textAlign: "center" }}>
            <div
              draggable={!disabled}
              onDragStart={(e) => handleDragStart(e, shape)}
              style={{
                width: "80%",
                paddingTop: "80%",
                position: "relative",
                border: "1px solid #ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "calc(24px + 1vw)",
                margin: "auto",
                cursor: disabled ? "not-allowed" : "grab",
                backgroundColor: "#f5f5f5",
                opacity: disabled ? 0.6 : 1,
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
                {shape}
              </span>
            </div>
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
