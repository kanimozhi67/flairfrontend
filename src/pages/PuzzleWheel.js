import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button } from "antd";
import api from "../api/axiosClient";

const { Title } = Typography;
const COLORS = ["#ff7a00", "#7ac943", "#22a6b3", "#6c3483", "#e53935"];

export default function PuzzleWheel({ addPointsToBackend, setResults }) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [step, setStep] = useState(1);
  const [options, setOptions] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);
  const [userMul, setUserMul] = useState(null);
  const [userSkip, setUserSkip] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // ------------------- COMPUTE MISSING VALUE -------------------
  const computeMissingValue = (qArray, mul, skip) => {
    const missingIndex = qArray.findIndex(v => v === null);
    const prev = qArray[missingIndex - 1];
    const next = qArray[missingIndex + 1];
    let missingMultiplier = 0;

    if (prev !== undefined) {
      missingMultiplier = prev / mul + skip;
    } else if (next !== undefined) {
      missingMultiplier = next / mul - skip;
    }

    return missingMultiplier * mul;
  };

  // ------------------- OPTIONS GENERATORS -------------------
  const makeOptionsForMissing = (qArray, mul, skip) => {
    const correct = computeMissingValue(qArray, mul, skip);
    const distractors = qArray.filter(v => v !== null).slice(0, 3);
    const optionsSet = new Set([correct, ...distractors]);
    return [...optionsSet].sort(() => Math.random() - 0.5);
  };

  const makeOptionsForMul = (mul) => {
    return [mul, mul - 1 > 0 ? mul - 1 : mul + 1, mul + 1, mul + 2].sort(
      () => Math.random() - 0.5
    );
  };

  const makeOptionsForSkip = (skip) => {
    return [skip, skip - 1 > 0 ? skip - 1 : skip + 1, skip + 1, skip + 2].sort(
      () => Math.random() - 0.5
    );
  };

  // ------------------- FETCH QUESTION -------------------
  const fetchQuestion = async () => {
    try {
      const res = await api.get("quiz/mulplevel3");
      const qObj = res.data.questions?.[0];
      if (!qObj) throw new Error("No questions returned");

      setData(
        qObj.q.map((v, i) => ({
          value: v === null ? "❔" : v,
          color: COLORS[i % COLORS.length]
        }))
      );

      setMeta({
        id: qObj.id,
        qArray: qObj.q,
        mul: qObj.mul,
        skip: qObj.skip
      });

      setOptions(makeOptionsForMissing(qObj.q, qObj.mul, qObj.skip));
      setStep(1);
      setUserAnswer(null);
      setUserMul(null);
      setUserSkip(null);
      setCorrectAnswers(null);
      setSubmitted(false);
      setError(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  // ------------------- SUBMIT -------------------
  const submitQuiz = async (answer, mul, skip) => {
    if (!meta || submitted) return;

    try {
      const res = await api.post("quiz/checkmulplevel3", {
        userId: "demoUser", // or pass actual user ID
        answers: [
          {
            id: meta.id,
            answer,
            mul,
            skip
          }
        ]
      });

      console.log("Server response:", res.data);

      addPointsToBackend(res.data.score);

      const correct = res.data.results?.[meta.id];
      if (!correct) {
        console.error("No results returned from server", res.data);
        setError("Could not retrieve correct answers");
        setSubmitted(true);
        return;
      }

      setCorrectAnswers(correct);
      setSubmitted(true);
      setResults(res.data.results);

    } catch (err) {
      console.error("Submit error:", err.response?.data || err.message);
      setError("Failed to submit quiz.");
      setSubmitted(true);
    }
  };

  // ------------------- HANDLE OPTION CLICK -------------------
  const selections = { answer: userAnswer, mul: userMul, skip: userSkip };

  const handleSelect = (value) => {
    if (!meta || submitted) return;
    const numericValue = Number(value);

    if (step === 1) {
      selections.answer = numericValue;
      setUserAnswer(numericValue);
      setOptions(makeOptionsForMul(meta.mul));
      setStep(2);
    } else if (step === 2) {
      selections.mul = numericValue;
      setUserMul(numericValue);
      setOptions(makeOptionsForSkip(meta.skip));
      setStep(3);
    } else if (step === 3) {
      selections.skip = numericValue;
      setUserSkip(numericValue);
      setStep(4);
      submitQuiz(selections.answer, selections.mul, selections.skip);
    }
  };

  // ------------------- HELPER TO HIGHLIGHT ANSWERS -------------------
  const getAnswerStyle = (user, correct) => {
    if (!submitted) return {};
    return Number(user) === Number(correct)
      ? { color: "green", fontWeight: "bold" }
      : { color: "red", fontWeight: "bold" };
  };

  // ------------------- RENDER -------------------
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!meta) return <div>Loading question…</div>;
  if (data.length === 0) return <div>Preparing wheel…</div>;

  const size = 220;
  const strokeWidth = 45;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const sliceLength = circumference / data.length;
  const sliceAngle = 360 / data.length;

  const questionText =
    step === 1
      ? "What comes next?"
      : step === 2
      ? "What is the multiplicand?"
      : step === 3
      ? "What is the skip-step count?"
      : "Quiz Completed! ";

  return (
 
    <Card
  style={{
    borderRadius: 20,
    background:  "linear-gradient(135deg, #a9b1f3ff, #8a1043ff)", // fun gradient
    boxShadow: "0 8px 20px rgba(100, 7, 46, 0.25)",
    padding: 20,
    margin: "-10px auto",
    maxWidth: 800
  }}
>
  <Title
    level={1}
    style={{
      color: "#0e0101ff",
      textShadow: "2px 2px #7e7063ff",
      textAlign: "center",
      fontWeight:"bold",
    margin: "-15px auto",
    //  fontFamily: "'Comic Sans MS', cursive, sans-serif"
    }}
  >
    🧠 Skip Counting 🎉 <br></br><hr></hr>
  </Title>

  <Row gutter={32}>
    {/* Wheel Column */}
    <Col>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        {data.map((item, i) => {
          const mid = i * sliceAngle + sliceAngle / 2;
          const rad = (mid * Math.PI) / 180;
          const x = center + radius * Math.cos(rad);
          const y = center + radius * Math.sin(rad);

          return (
            <g key={i}>
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${sliceLength} ${circumference}`}
                strokeDashoffset={-i * sliceLength}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontWeight="bold"
                fontSize="16"
                fill="#fff"
                transform={`rotate(90 ${x} ${y})`}
              >
                {item.value}
              </text>
            </g>
          );
        })}
      </svg>
    </Col>

    {/* Questions Column */}
    <Col flex="auto">
      <Title
        level={3}
        style={{
          color: "#080808ff",
         // fontFamily: "'Comic Sans MS', cursive, sans-serif",
          textAlign: "center",
          marginBottom: 20
        }}
      >
        {questionText}
      </Title>

      {step < 4 && (
        <Row gutter={[12, 12]}>
          {options.map((o, i) => (
            <Col span={12} key={i}>
              <Button
                block
                onClick={() => handleSelect(o)}
                disabled={submitted}
                style={{
                  backgroundColor: "#FFB347",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 18,
                  borderRadius: 12,
                  height: 50,
                  boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
                }}
              >
                {o}
              </Button>
            </Col>
          ))}
        </Row>
      )}

 
      {submitted && correctAnswers && (
  <div
    style={{
      marginTop: 20,
      backgroundColor: "#f0fbff",
      borderRadius: 16,
      padding: 16,
      fontSize: 18,
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
    }}
  >
    <div style={{ fontWeight: "bold", marginBottom: 10 }}>
      📋 Let’s Review!
    </div>

    <hr style={{ marginBottom: 12 }} />

    {/* 1. Missing Value */}
    <div style={{ marginBottom: 10 }}>
      <strong>1️⃣ Missing value:</strong>{" "}
      <span style={getAnswerStyle(userAnswer, correctAnswers.correctAnswer)}>
        {Number(userAnswer) === Number(correctAnswers.correctAnswer)
          ? "✅ "
          : "❌ "}
        {userAnswer}
      </span>
      {Number(userAnswer) !== Number(correctAnswers.correctAnswer) && (
        <span style={{ marginLeft: 8, color: "#2ecc71", fontWeight: "bold" }}>
          👉 Correct: {correctAnswers.correctAnswer}
        </span>
      )}
    </div>

    {/* 2. Multiplicand */}
    <div style={{ marginBottom: 10 }}>
      <strong>2️⃣ Multiplicand:</strong>{" "}
      <span style={getAnswerStyle(userMul, correctAnswers.correctMul)}>
        {Number(userMul) === Number(correctAnswers.correctMul)
          ? "✅ "
          : "❌ "}
        {userMul}
      </span>
      {Number(userMul) !== Number(correctAnswers.correctMul) && (
        <span style={{ marginLeft: 8, color: "#2ecc71", fontWeight: "bold" }}>
          👉 Correct: {correctAnswers.correctMul}
        </span>
      )}
    </div>

    {/* 3. Skip-step */}
    <div>
      <strong>3️⃣ Skip-step:</strong>{" "}
      <span style={getAnswerStyle(userSkip, correctAnswers.correctSkip)}>
        {Number(userSkip) === Number(correctAnswers.correctSkip)
          ? "✅ "
          : "❌ "}
        {userSkip}
      </span>
      {Number(userSkip) !== Number(correctAnswers.correctSkip) && (
        <span style={{ marginLeft: 8, color: "#2ecc71", fontWeight: "bold" }}>
          👉 Correct: {correctAnswers.correctSkip}
        </span>
      )}
    </div>
  </div>
)}


      <div style={{ marginTop: 20, textAlign: "center" }}>
        <Button
          onClick={fetchQuestion}
          style={{
            backgroundColor: "#622ae4ff",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 18,
            borderRadius: 12,
            height: 50,
            boxShadow: "0 4px 6px rgba(0,0,0,0.2)"
          }}
        >
          New Game
        </Button>
      </div>
    </Col>
  </Row>
</Card>

  );
}
