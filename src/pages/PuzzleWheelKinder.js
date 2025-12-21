import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button, Grid } from "antd";
import api from "../api/axiosClient";

const { Title } = Typography;
const COLORS = ["#ff7a00", "#7ac943", "#22a6b3", "#6c3483", "#e53935"];

const { useBreakpoint } = Grid;

export default function PuzzleWheelKinder({ addPointsToBackend, setResults }) {
  const screens = useBreakpoint();
  const mobile = !screens.md; // true on mobile, false on desktop

  const [data, setData] = useState([]);
  const [meta, setMeta] = useState(null);
  const [options, setOptions] = useState([]);
  const [userAnswer, setUserAnswer] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  /* ------------------- LOWER LEVEL: COMPUTE MISSING VALUE ------------------- */
  const computeMissingValue = (qArray) => {
    const idx = qArray.findIndex(v => v === null);
    const left = qArray[idx - 1];
    const right = qArray[idx + 1];

    // Missing in the middle
    if (left != null && right != null) {
      return (left + right) / 2;
    }

    // Missing at the end
    if (left != null) {
      const diff = left - qArray[idx - 2];
      return left + diff;
    }

    // Missing at the start
    if (right != null) {
      const diff = qArray[idx + 2] - right;
      return right - diff;
    }

    return null;
  };

  /* ------------------- OPTIONS ------------------- */
  const makeOptionsForMissing = (qArray) => {
    const correct = computeMissingValue(qArray);
    const distractors = qArray.filter(v => v !== null).slice(0, 3);
    return [...new Set([correct, ...distractors])]
      .sort(() => Math.random() - 0.5);
  };

  /* ------------------- FETCH QUESTION ------------------- */
  const fetchQuestion = async () => {
    try {
      const res = await api.get("quiz/mathlevel3");
      const qObj = res.data.questions?.[0];
      if (!qObj) throw new Error("No questions returned");

      setData(
        qObj.q.map((v, i) => ({
          value: v === null ? "❔" : v,
          color: COLORS[i % COLORS.length]
        }))
      );

      setMeta({ id: qObj.id, qArray: qObj.q });
      setOptions(makeOptionsForMissing(qObj.q));

      setUserAnswer(null);
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

  /* ------------------- SUBMIT ------------------- */
  const submitQuiz = async (answer) => {
    if (!meta || submitted) return;

    try {
      const res = await api.post("quiz/checkmathlevel3", {
        userId: "demoUser",
        answers: [{ id: meta.id, answer }]
      });

      addPointsToBackend(res.data.score);

      const correct = res.data.results?.[meta.id];
      if (!correct) {
        setError("No result returned");
        return;
      }

      setCorrectAnswers(correct);
      setSubmitted(true);
      setResults(res.data.results);
    } catch (err) {
      console.error(err);
      setError("Failed to submit quiz");
      setSubmitted(true);
    }
  };

  /* ------------------- HANDLE OPTION CLICK ------------------- */
  const handleSelect = (value) => {
    if (submitted) return;
    setUserAnswer(value);
    submitQuiz(value);
  };

  /* ------------------- ANSWER STYLE ------------------- */
  const getAnswerStyle = (user, correct) => ({
    color: Number(user) === Number(correct) ? "green" : "red",
    fontWeight: "bold"
  });

  /* ------------------- RENDER ------------------- */
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!meta) return <div>Loading…</div>;

  const size = 220;
  const strokeWidth = 45;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const sliceLength = circumference / data.length;
  const sliceAngle = 360 / data.length;

  return (
    <Card
      style={{
        borderRadius: 20,
        background: "linear-gradient(135deg,#a9b1f3,#8a1043)",
        boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
        padding: 20,
        paddingTop:0,
        maxWidth: 800,
        margin: "auto"
      }}
    >
     <Title
  level={mobile ? 2 : 1}
  style={{ textAlign: "center", fontWeight: "bold" }}
>
  🧠 Skip Counting 🎉
  <br />
  <hr />
</Title>
      <Row gutter={32}>
        {/* WHEEL */}
        <Col>
          <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
            {data.map((item, i) => {
              const angle = (i * sliceAngle + sliceAngle / 2) * Math.PI / 180;
              const x = center + radius * Math.cos(angle);
              const y = center + radius * Math.sin(angle);

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
                    fill="#fff"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
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
            {/* <Col flex="auto"> */}
            {!submitted &&
              <Title
                level={3}
                style={{
                  color: "#080808ff",
                 // fontFamily: "'Comic Sans MS', cursive, sans-serif",
                  textAlign: "center",
                  marginBottom: 20,
                 
                }}
              >
              What is the missing value?
              </Title> }

        {/* OPTIONS & REVIEW */}
        <Col flex="auto">
          {!submitted && (
            <Row gutter={[12, 12]}>
              {options.map((o, i) => (
                <Col span={12} key={i}>
                  <Button
                    block
                    onClick={() => handleSelect(o)}
                    style={{
                      background: "#FFB347",
                      color: "#fff",
                      fontWeight: "bold",
                      fontSize: 18,
                      borderRadius: 12,
                      height: 50
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
                background: "#f0fbff",
                borderRadius: 16,
                padding: 16,
                fontSize:20
              }}
            >
              <strong>📋 Review</strong>
              <hr />
              <div>
                <span style={getAnswerStyle(userAnswer, correctAnswers.correctAnswer)}>
                  {userAnswer === correctAnswers.correctAnswer ? "✅" : "❌"} {userAnswer}
                </span>
                {userAnswer !== correctAnswers.correctAnswer && (
                  <span style={{ marginLeft: 8 }}>
                    👉 Correct: {correctAnswers.correctAnswer}
                  </span>
                )}
              </div>
            </div>
          )}

          <div style={{ marginTop: 20, textAlign: "center" }}>
            <Button
              onClick={fetchQuestion}
              style={{
                background: "#622ae4",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: 12,
                height: 45,
                fontSize:18
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
