import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Input, Typography, message } from "antd";
import api from "../api/axiosClient";

const { Title } = Typography;

// Helper: format mixed units for display
const formatUnits = (val) => {
  if (!val) return "";
  // Add space between numbers and units (e.g., '1m55cm' -> '1 m 55 cm')
  return val.replace(/(\d+)([a-zA-Z]+)/g, "$1 $2").replace(/\s+/g, " ").trim();
};

export default function Measurement({level,selectedLevel,addPointsToBackend}) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
   const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
       const [aiExplanations, setAiExplanations] = useState({});
const [loadingExplanation, setLoadingExplanation] = useState(false);

  const fetchQuestions = async () => {
      try {
        setSubmitted(false);
        const endpoint =
      selectedLevel === 1
        ?"quiz/measure"
        : selectedLevel === 2
        ? "quiz/measurelevel2"
        : "quiz/measurelevel3";

    const res = await api.get(endpoint);
      
        setQuestions(res.data.questions);
       
      } catch (err) {
        message.error("Failed to load quiz");
      }
    };
  useEffect(() => {
    
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [index]);

useEffect(() => {
  if (index === questions.length && questions.length > 0 && !finished) {
    setFinished(true);
    finishQuiz();
  }
}, [index, questions.length, finished]);

const startNewGame = async () => {
  setFinished(false);
  setResults([]);
  setUserAnswers([]);
  setIndex(0);
  setAnswer("");
  setSubmitted(false);

  await fetchQuestions();
};

  const submitAnswer = () => {
    if (!answer.trim()) {
      message.warning("Please enter an answer");
      return;
    }

    if (index >= questions.length) return;

    setUserAnswers(prev => [
      ...prev,
      { id: questions[index].id, answer: answer.trim() }
    ]);

    setAnswer("");
    setIndex(prev => prev + 1);
   
  };

  // const finishQuiz = async () => {
  //    setSubmitted(true);
  //   try {
  //           const endpoint =
  //     selectedLevel === 1
  //       ?"quiz/checkmeasure"
  //       : selectedLevel === 2
  //       ? "quiz/checkmeasure2"
  //       : "quiz/checkmeasure3";
  //     const res = await api.post(endpoint, {
  //       answers: userAnswers
  //     });

  //     setResults(res.data.results);
  //     message.success(
  //       `Score: ${res.data.score}/${res.data.total}`
      
  //     );
  //      addPointsToBackend(res.data.score);

  //      const explanations = {};

  // for (const item of [...userAnswers, { id: current.id, question: current.question, answer: selected }]) {
  //   const correct = res.data.correctAnswers?.[item.id];

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
  //     message.error("Failed to submit quiz");
  //   }
  // };
  const finishQuiz = async () => {
  setSubmitted(true);

  try {
    const endpoint =
      selectedLevel === 1
        ? "quiz/checkmeasure"
        : selectedLevel === 2
        ? "quiz/checkmeasure2"
        : "quiz/checkmeasure3";

    const res = await api.post(endpoint, {
      answers: userAnswers,
    });

    setResults(res.data.results);

    message.success(`Score: ${res.data.score}/${res.data.total}`);
    addPointsToBackend(res.data.score);

    const explanations = {};

    for (const item of userAnswers) {
      const correct = res.data.correctAnswers?.[item.id];

      if (String(item.answer) !== String(correct)) {
        const questionText =
          questions.find(q => q.id === item.id)?.question || "";

        const explainRes = await api.post("/quiz/explain2", {
          question: questionText,
          correctAnswer: correct,
          userAnswer: item.answer,
        });

        explanations[item.id] = explainRes.data.explanation;
      }
    }

    setAiExplanations(explanations);

  } catch (err) {
    message.error("Failed to submit quiz");
  }
};


  if (!questions.length) return <p style={{ textAlign: "center" }}>Loading...</p>;

  // Results view
  if (finished && results.length) {
    return (
         
      <div 
      //style={{ maxWidth: 750, margin: "auto", marginTop: 40 }}
  style={{
          width: "100%",
          maxWidth: 650,
          borderRadius: 20,
          background: "linear-gradient(135deg, #a9b1f3ff, #8a1043ff)",
          boxShadow: "0 8px 20px rgba(100, 7, 46, 0.25)",
          padding: 20,
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: 24 }}>
          Quiz Results
        </Title>
         

        {results.map((r, i) => (
          <Card
            key={r.id}
          
              style={{
  //  marginBottom: 16,
    borderRadius: 16,
    padding: 18,
    background: r.isCorrect ? "#f6ffed" : "#fff1f0",
    border: r.isCorrect
      ? "3px solid #95de64"
      : "3px solid #ff7875",
    boxShadow: "0 6px 14px rgba(0,0,0,0.1)"
  }}
          >

              <hr style={{ marginBottom: 12 }} />
{!r.isCorrect && (
aiExplanations[r.id] && (
  <div style={{ marginTop: 10 }}>
    <strong>🤖 Explanation</strong><br></br>
    <pre>{aiExplanations[r.id]}</pre>
  </div>
))}
            <div style={{ fontSize: 18, marginBottom: 8 }}>
              <strong style={{ color: r.isCorrect ? "#389e0d" : "#cf1322" }}>
Q{i + 1}:</strong> {questions[i].question}
            </div>

            <div style={{ fontSize: 18,display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
              <span>
                Your answer:{" "}
                <strong style={{ color: r.isCorrect ? "#389e0d" : "#cf1322" }}>
                  {formatUnits(r.userAnswer)}
                </strong>
              </span>

              {!r.isCorrect && (
                <span style={{ color: "#35960bff", fontStyle: "italic", marginTop: 4,fontWeight:"bold" }}>
                  Correct: {formatUnits(r.correctAnswer)}
                </span>
              )}
            </div>
            
          </Card>
          
        ))}
           {submitted &&
       <Button
              block
             onClick={startNewGame}
               style={{
    marginTop: 15,
    height: 50,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 14,
    background: "orange",
    width:170,
    border: "none"
  }}
            >
              🔄 New Game
            </Button>}
      </div>
     
    );
  }

  // Quiz question UI
  if (index >= questions.length) {
   
    return (
     <Title
  level={3}
  style={{
    textAlign: "center",
    color: "#fa8c16",
    fontWeight: "bold"
  }}
>
  🎉 Great Job! Quiz Results 🎉
</Title>
    
    );
  }

  return (
    <div>
 


    <Card
       style={{
    maxWidth: 650,
    borderRadius: 20,
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
   
//     background: "linear-gradient(135deg, #30a5eeff, #0bafbbff)",
 background: "linear-gradient(135deg, #87e8de, #ffadd2)",
 boxShadow: "0 8px 20px rgba(255, 150, 180, 0.35)",

    border: "5px solid #ffd666"
  }}
    ><h2 style={{textAlign:"center"}}>🧠 Measurement 🎉</h2><hr></hr><br></br>
      <Title level={4}>
        Question {index + 1} 
       
      </Title>

      <p style={{ fontSize: 20, marginBottom: 20 ,fontWeight:"bold",color:"red"}}>{questions[index].question}</p>

      <Input
        ref={inputRef}
        value={answer}
        placeholder="Enter your answer including units (e.g., 7.55 m or 7m55cm)"
        onChange={e => setAnswer(e.target.value)}
        onPressEnter={submitAnswer}
        autoComplete="off"
        //style={{ fontSize: 16, padding: 12 }}
        style={{
    fontSize: 18,
    padding: 14,
    borderRadius: 12,
    border: "2px solid #91caff"
  }}
      />

      <Button
        type="primary"
        block
       // style={{ marginTop: 20, padding: "12px 0", fontSize: 16 }}
        style={{
    marginTop: 20,
    height: 50,
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 14,
    background: "linear-gradient(90deg, #52c41a, #a0d911)",
    border: "none"
  }}
        onClick={submitAnswer}
      >
        Submit
      </Button>
    
    </Card>
    </div>
  );
}
