// import { useEffect, useState, useRef } from "react";
// import { Card, Input, Button, Typography, Space, message } from "antd";
// import api from "../api/axiosClient";

// const { Title, Text } = Typography;

// const MoneyQuiz = ({ selectedLevel, addPointsToBackend }) => {
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [answers, setAnswers] = useState({});
//   const [selected, setSelected] = useState("");
//   const [result, setResult] = useState(null);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const inputRef = useRef(null);

//   /* ---------------- FETCH QUESTIONS ---------------- */
//   const fetchQuestions = async () => {
//     setSubmitted(false);
//     setCurrent(0);
//     setAnswers({});
//     setSelected("");
//     setResult(null);

//     const endpoint =
//       selectedLevel === 1
//         ? "/quiz/money"
//         : selectedLevel === 2
//         ? "/quiz/moneylevel2"
//         : "/quiz/moneylevel3";

//     const res = await api.get(endpoint);
//     setQuestions(res.data.questions);

//     setTimeout(() => inputRef.current?.focus(), 200);
//   };

//   useEffect(() => {
//     fetchQuestions();
//   }, []);

//   if (!questions.length) return <Card loading />;

//   const currentQuestion = questions[current];

//   /* ---------------- NEXT QUESTION ---------------- */
//   const nextQuestion = () => {
//     if (!selected) {
//       message.warning("Please enter an answer");
//       return;
//     }

//     setAnswers(prev => ({
//       ...prev,
//       [currentQuestion.id]: selected.trim()
//     }));

//     setSelected("");
//     setCurrent(prev => prev + 1);

//     setTimeout(() => inputRef.current?.focus(), 200);
//   };

//   /* ---------------- SUBMIT QUIZ ---------------- */
//   const submitQuiz = async () => {
//     if (!selected) {
//       message.warning("Please enter an answer");
//       return;
//     }

//     const finalAnswers = {
//       ...answers,
//       [currentQuestion.id]: selected.trim()
//     };

//     setLoading(true);

//     try {
//       const payload = {
//         answers: Object.entries(finalAnswers).map(([id, answer]) => ({
//           id,
//           answer
//         }))
//       };

//       const res = await api.post("/quiz/checkmoney", payload);

//       setResult(res.data);
//       addPointsToBackend(res.data.score);
//       setSubmitted(true);

//       message.success(`Score: ${res.data.score}`);
//     } catch (err) {
//       message.error("Failed to submit quiz");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
//       <Card
//         style={{
//           width: "100%",
//           maxWidth: 650,
//           borderRadius: 20,
//           background: "#FFF8DC",
//           boxShadow: "0 8px 16px rgba(0,0,0,0.2)"
//         }}
//       >
//         <Title
//           level={3}
//           style={{
//             textAlign: "center",
//             color: "#FF6347",
//             fontWeight: "bold"
//           }}
//         >
//           💰 Money Quiz ({current + 1}/{questions.length})
//         </Title>

//         <hr />

//         {/* ---------------- QUESTION MODE ---------------- */}
//         {!submitted ? (
//           <>
//             <Text
//               strong
//               style={{
//                 display: "block",
//                 fontSize: "1.4rem",
//                 textAlign: "center",
//                 marginBottom: 20
//               }}
//             >
//               {currentQuestion.question}
//             </Text>

//             <Input
//               ref={inputRef}
//               value={selected}
//               onChange={e => setSelected(e.target.value)}
//               placeholder="Type your answer ₹"
//               style={{
//                 textAlign: "center",
//                 fontSize: "1.5rem",
//                 fontWeight: "bold",
//                 borderRadius: 10,
//                 padding: 14,
//                 marginBottom: 20
//               }}
//             />

//             <Space
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 width: "100%",
//                 gap: 16
//               }}
//             >
//               {current < questions.length - 1 ? (
//                 <Button
//                   type="primary"
//                   onClick={nextQuestion}
//                   style={{
//                     background: "#22c55e",
//                     width: "100%",
//                     maxWidth: 220,
//                     fontSize: "1.2rem",
//                     fontWeight: "bold"
//                   }}
//                 >
//                   Next ➡️
//                 </Button>
//               ) : (
//                 <Button
//                   type="primary"
//                   loading={loading}
//                   onClick={submitQuiz}
//                   style={{
//                     background: "#f59e0b",
//                     width: "100%",
//                     maxWidth: 220,
//                     fontSize: "1.2rem",
//                     fontWeight: "bold"
//                   }}
//                 >
//                   Submit Quiz ✅
//                 </Button>
//               )}
//             </Space>
//           </>
//         ) : (
//           /* ---------------- REVIEW MODE ---------------- */
//           <>
//             {questions.map((q, index) => {
//               const userAnswer = answers[q.id];
//               const correctAnswer = result.correctAnswers[q.id];
//               const isCorrect = userAnswer == correctAnswer;

//               return (
//                 <Card
//                   key={q.id}
//                   style={{
//                     marginBottom: 16,
//                     border: isCorrect
//                       ? "3px solid #22c55e"
//                       : "3px solid #ef4444",
//                     background: isCorrect ? "#dcfce7" : "#fee2e2"
//                   }}
//                 >
//                   <Text strong>
//                     Q{index + 1}. {q.question}
//                   </Text>

//                   <Text style={{ display: "block", marginTop: 6 }}>
//                     Your Answer: ₹ {userAnswer}
//                   </Text>

//                   <Text
//                     strong
//                     style={{
//                       display: "block",
//                       color: isCorrect ? "#166534" : "#991b1b"
//                     }}
//                   >
//                     Correct Answer: ₹ {correctAnswer}
//                   </Text>
//                 </Card>
//               );
//             })}

//             <Text
//               strong
//               style={{
//                 display: "block",
//                 marginTop: 20,
//                 fontSize: "1.3rem",
//                 color: "#065f46"
//               }}
//             >
//               🎉 Final Score: {result.score} / {questions.length}
//             </Text>

//             <Button
//               onClick={fetchQuestions}
//               style={{
//                 marginTop: 16,
//                 width: "100%",
//                 maxWidth: 220,
//                 fontSize: "1.2rem",
//                 fontWeight: "bold",
//                 background: "#6366f1",
//                 color: "#fff"
//               }}
//             >
//               🔄 New Game
//             </Button>
//           </>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default MoneyQuiz;
import { useEffect, useState, useRef } from "react";
import { Card, Input, Button, Typography, message } from "antd";
import api from "../api/axiosClient";

const { Title, Text } = Typography;

const MoneyQuiz = ({ selectedLevel = 1, addPointsToBackend }) => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  /* ---------- Fetch ---------- */
  const fetchQuestions = async () => {
    setSubmitted(false);
    setResult(null);
    setAnswers({});
    setSelected("");
    setCurrent(0);

    const endpoint =
      selectedLevel === 1
        ? "/quiz/money"
        : selectedLevel === 2
        ? "/quiz/moneylevel2"
        : "/quiz/moneylevel3";

    const res = await api.get(endpoint);
    setQuestions(res.data.questions);

    setTimeout(() => inputRef.current?.focus(), 150);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  if (!questions.length) return <Card loading />;

  const currentQuestion = questions[current];

  /* ---------- Next ---------- */
  const nextQuestion = () => {
    if (!selected) {
      message.warning("Please enter an answer");
      return;
    }

    setAnswers((p) => ({ ...p, [currentQuestion.id]: selected }));
    setSelected("");
    setCurrent((p) => p + 1);

    setTimeout(() => inputRef.current?.focus(), 150);
  };

  /* ---------- Submit ---------- */
  const submitQuiz = async () => {
    if (!selected) {
      message.warning("Please enter an answer");
      return;
    }

    const finalAnswers = {
      ...answers,
      [currentQuestion.id]: selected,
    };

    setLoading(true);

    const payload = {
      answers: Object.entries(finalAnswers).map(([id, answer]) => ({
        id,
        answer,
      })),
    };

    const res = await api.post("/quiz/checkmoney", payload);

    setResult(res.data);
    setSubmitted(true);
    addPointsToBackend?.(res.data.score);
    setLoading(false);
  };

  /* ---------- UI ---------- */
  return (
       <div style={{ padding: 20, display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "100%",
          maxWidth: 650,
         borderRadius: 20,
    background:  "linear-gradient(135deg, #a9b1f3ff, #8a1043ff)", // fun gradient
    boxShadow: "0 8px 20px rgba(100, 7, 46, 0.25)",
    padding: 20,
        }}
      >
        <Title
          level={3}
          style={{
            textAlign: "center",
            color: "#fdfbfbff",
            fontWeight: "bold"
          }}
        >
          💰 Money Quiz ({current + 1}/{questions.length})
        </Title>

        <hr />

        {!submitted ? (
          <>
            <Text strong style={{ fontSize: "1.4rem", display: "block" }}>
              Q{current + 1}. 👉 {currentQuestion.question}
            </Text>

            <Input
              ref={inputRef}
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              placeholder="Enter answer"
              style={{
                marginTop: 20,
                fontSize: "1.4rem",
                textAlign: "center",
              }}
            />
<div style={{textAlign:"center",justifyContent:"center"}}>
            <Button
              type="primary"
              block
              style={{ marginTop: 20,  backgroundColor:" #ec0a7bff", 
                 maxWidth: 120,
                fontSize:18,fontWeight:"bold"}}
              onClick={
                current < questions.length - 1 ? nextQuestion : submitQuiz
              }
              loading={loading}
            >
              {current < questions.length - 1 ? "Next" : "Submit"}
            </Button></div>
          </>
        ) : (
          <>
            {questions.map((q, i) => {
              const user = answers[q.id];
              const correct = result.correctAnswers[q.id];
              const ok =
                Number(parseFloat(user).toFixed(2)) ===
                Number(parseFloat(correct).toFixed(2));

              return (
                <Card
                  key={q.id}
                  style={{
                    marginBottom: 12,
                    border: ok ? "3px solid #22c55e" : "3px solid #ef4444",
                    background: ok ? "#dcfce7" : "#fee2e2",
                  }}
                >
                  <Text strong>
                    Q{i + 1}. {q.question}
                  </Text>
                  <Text block>Your Answer: ₹ {user}</Text>
                  <Text strong>
                    Correct Answer: ₹ {correct}
                  </Text>
                </Card>
              );
            })}

            <Title level={4}>Score: {result.score}</Title>

            <Button block onClick={fetchQuestions} style={{backgroundColor: "lightgreen", fontWeight:"bold", fontSize:18}}>
              New Game
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default MoneyQuiz;
