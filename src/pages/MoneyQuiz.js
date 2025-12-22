import { useEffect, useState, useRef } from "react";
import { Card, Input, Button, Typography, Space, message } from "antd";
import api from "../api/axiosClient";

const { Title, Text } = Typography;

const MoneyQuiz = ({ level, addPointsToBackend, setResults }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const inputRef = useRef(null); // <-- ref for input

  // Fetch questions
  const fetchQuestions = async () => {
    setSubmitted(false);
    const res = await api.get("/quiz/money");
    setQuestions(res.data.questions);
    setCurrent(0);
    setAnswers({});
    setSelected("");
    setResult(null);
    setTimeout(() => inputRef.current?.focus(), 100); // autofocus first question
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (!questions.length) return <Card loading />;

  const currentQuestion = questions[current];

  // Next question
  const nextQuestion = () => {
    if (!selected) {
      message.warning("Please enter an answer");
      return;
    }

    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: selected
    }));

    setSelected("");
    setCurrent(prev => prev + 1);

    // autofocus the input for next question
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // Submit quiz
  const submitQuiz = async () => {
    if (!selected) {
      message.warning("Please enter an answer");
      return;
    }

    const finalAnswers = {
      ...answers,
      [currentQuestion.id]: selected
    };

    setLoading(true);
    try {
      const payload = {
        answers: Object.entries(finalAnswers).map(([id, answer]) => ({
          id,
          answer
        }))
      };

      const res = await api.post("/quiz/checkmoney", payload);
      setResult(res.data);
      message.success(`Score: ${res.data.score}`);
      addPointsToBackend(res.data.score);
    } catch (err) {
      message.error("Failed to submit quiz");
      console.error(err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 600,
          borderRadius: 20,
          background: "#FFF8DC",
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        }}
      >
        <Title
          level={3}
          style={{ color: "#FF6347", fontWeight: "bold", fontSize: "1.5rem", textAlign: "center" }}
        >
          Question &nbsp; {current + 1} / {questions.length}
        </Title>
        <hr />
        <Text
          strong
          style={{ display: "block", fontSize: "1.5rem", margin: "20px 0", textAlign: "center" }}
        >
          {currentQuestion.question}
        </Text>

        <Input
          ref={inputRef} // <-- attach ref here
          style={{
            width: "100%",
            padding: 14,
            fontSize: "1.5rem",
            fontWeight: "bold",
            borderRadius: 10,
            border: "2px solid #FFB6C1",
            textAlign: "center",
            marginBottom: 20,
          }}
          placeholder="Type your answer"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        />

        <Space
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            gap: 16,
          }}
        >
          {current < questions.length - 1 ? (
            <Button
              type="primary"
              onClick={nextQuestion}
              style={{
                backgroundColor: "#28e40fff",
                width: "100%",
                maxWidth: 200,
                fontWeight: "bold",
                fontSize: "1.2rem",
                padding: "10px 5px",
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={submitQuiz}
              loading={loading}
              disabled={submitted}
              style={{
                backgroundColor: "orange",
                width: "100%",
                maxWidth: 200,
                fontWeight: "bold",
                fontSize: "1.2rem",
                padding: "10px 5px",
              }}
            >
              Submit Quiz
            </Button>
          )}

          {submitted && (
            <Button
              onClick={fetchQuestions}
              style={{
                backgroundColor: "#686bf7ff",
                width: "100%",
                maxWidth: 200,
                fontSize: "1.2rem",
                fontWeight: "bold",
                padding: "10px 5px",
              }}
            >
              New Game
            </Button>
          )}
        </Space>

        {result && (
          <Text
            strong
            style={{
              display: "block",
              marginTop: 20,
              fontSize: "1.3rem",
              color: "#023602ff",
            }}
          >
            Final Score: {result.score}
          </Text>
        )}
      </Card>
    </div>
  );
};

export default MoneyQuiz;
