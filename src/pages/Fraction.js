import React, { useEffect, useState } from "react";
import api from "../api/axiosClient";

export default function Fraction({ category, level, selectedLevel, user, addPointsToBackend }) {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFractionQuiz = async () => {
    setLoading(true);
    setResult(null);
    setAnswers([]);
    setSelected("");
    setStep(0);

    const endpoint =
    category === "puzzles" ? ( selectedLevel===2 ?  "/quiz/puzzlelevel2" :  "/quiz/puzzlelevel3" ) :

    (  level==="primary" ? (
          selectedLevel === 1
          ? "/quiz/fraction"
          : selectedLevel === 2
          ? "/quiz/fraction2"
          : "/quiz/fraction3"
      ) : (
         selectedLevel === 1
          ? "/quiz/fractionk"
          : selectedLevel === 2
          ? "/quiz/fractionk2"
          : "/quiz/fractionk3"))

      
    const res = await api.get(endpoint);
    setQuestions(res.data.questions);
    setLoading(false);
  };

  useEffect(() => {
    fetchFractionQuiz();
  }, []);

  if (loading) {
    return <p style={styles.loading}>Loading quiz... 🧠</p>;
  }

  const current = questions[step];

  const handleNext = () => {
    if (!selected) return alert("Please select an answer 😊");

    setAnswers((prev) => [
      ...prev,
      {
        id: current.id,
        question: current.question,
        answer: selected
      }
    ]);

    setSelected("");

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = async () => {
    const response = await api.post("/quiz/checkfraction", {
      userId: user?._id || "demo-user",
      answers: [...answers, { id: current.id, question: current.question, answer: selected }]
    });

    setResult(response.data);

    if (addPointsToBackend) {
      addPointsToBackend(response.data.score);
    }
  };

  // 🌈 RESULT SCREEN
  if (result) {
    return (
      <div style={styles.resultCard}>
        <h2 style={styles.title}>🎉 Great Job! 🎉</h2> <hr></hr>

        <p style={styles.score}>
          You scored <strong>{result.score}</strong> out of {result.total} ⭐
        </p>

        {answers.map((item, index) => {
          const correct = result.correctAnswers?.[item.id];
          const isCorrect = item.answer === correct;

          return (
            <div
              key={item.id}
              style={{
                ...styles.reviewBox,
                borderColor: isCorrect ? "#22c55e" : "#ef4444"
              }}
            >
              <p style={styles.question}>
                {index + 1}. {item.question}
              </p>

              <p style={styles.answerText}>
                🧒 Your Answer:{" "}
                <span style={{ color: isCorrect ? "#16a34a" : "#dc2626" }}>
                  {item.answer}
                </span>
              </p>

              {!isCorrect && (
                <p style={styles.answerText}>
                  ✅ Correct Answer:{" "}
                  <span style={{ color: "#16a34a" }}>{correct}</span>
                </p>
              )}

              <p style={isCorrect ? styles.correct : styles.wrong}>
                {isCorrect ? "🎈 Correct!" : "💡 Try again next time!"}
              </p>
            </div>
          );
        })}

        <button style={styles.playAgainBtn} onClick={fetchFractionQuiz}>
        New Game
        </button>
      </div>
    );
  }

  // ❓ QUESTION SCREEN
  return (
    <div style={styles.card}>
      <h3 style={styles.step}>
     🌈   Question   {step + 1} / {questions.length}
      </h3>
<hr></hr><br></br>
{level!=="fraction" && selectedLevel ===3 && ( 
  <p style={{fontSize: "clamp(18px, 3vw, 26px)"}}> Find the symmetric one</p>)}
{level==="primary" && selectedLevel ===1 && (
<p style={{fontSize: "clamp(18px, 3vw, 26px)"}}>What fraction is represented ?</p>)}
{level==="primary" && selectedLevel ===1 ? (
<p style={styles.mainQuestion}>{current.question}</p> 
) : (
      <p style={styles.mainQuestion1}>{current.question}</p> )}

{ level!=="primary"   ? (
      current.options.map((opt) => (
       // <label key={opt} style={styles.option1}>
      <label
  key={opt}
  style={{
    ...styles.option1,
    color: levelColors[selectedLevel] || "#4af017ff",
  }}
>

          <input
            type="radio"
            name="option"
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
          />
          <span style={{ marginLeft: 10 }}>{opt}</span>
        </label>
      ))
    ): 
    (
      current.options.map((opt) => (
        <label key={opt} style={styles.option}>
          <input
            type="radio"
            name="option"
            value={opt}
            checked={selected === opt}
            onChange={() => setSelected(opt)}
          />
          <span style={{ marginLeft: 10 }}>{opt}</span>
        </label>
      )))
    }

      <button style={styles.button} onClick={handleNext}>
        {step === questions.length - 1 ? "🎯 Submit" : "➡ Next"}
      </button>
    </div>
  );
}

//
// 🎨 RESPONSIVE + KIDS FRIENDLY STYLES
//
const levelColors = {
  1: "#f01758ff",
  2: "#f09217ff",
  3: "#4af017ff",
};
const styles = {
  loading: {
    textAlign: "center",
    fontSize: "clamp(14px, 2vw, 20px)",
   // marginTop: 60,
   // fontFamily: "'Comic Sans MS', 'Poppins', sans-serif"
  },

  card: {
    maxWidth: "min(100%, 1000px)",
    margin: "0px auto",
    padding: "clamp(20px, 4vw, 40px)",
    borderRadius: 24,
     background: "#f0fdf4",
//    color: "#ffffffef",
//      background: "linear-gradient(90deg, #f01758ff, #f7555dff)",
//   boxShadow: "0 0 25px rgba(228, 217, 71, 0.6)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.18)",
    fontFamily: "'Comic Sans MS', 'Poppins', sans-serif"
  },

  step: {
    fontSize: "clamp(20px, 4vw, 28px)",
    marginBottom: 15
  },

  mainQuestion: {
    fontSize: "clamp(25px, 3.5vw, 35px)",
    marginBottom: 20,
    border:"2px solid  #f01758ff",
    padding:10
  },
  mainQuestion1: {
    fontSize: "clamp(18px, 2vw, 28px)",
    marginBottom: 20,
    //border:"2px solid  #f01758ff",
   // padding:10
  },

  option: {
    display: "flex",
    alignItems: "center",
    margin: "12px 0",
    fontSize: "clamp(18px, 4vw, 26px)",
    cursor: "pointer"
  },
option1: {
  display: "flex",
  alignItems: "center",
  margin: "12px 0",
  fontSize: "clamp(68px, 44vw, 76px)",
  cursor: "pointer",

},
  button: {
    marginTop: 25,
    padding: "clamp(10px, 2vw, 16px) clamp(22px, 4vw, 38px)",
    borderRadius: 14,
    border: "none",
    background: "#e59b46ff",
    color: "#fff",
    fontSize: "clamp(16px, 4vw, 26px)",
    cursor: "pointer"
  },

  // RESULT
 resultCard: {
  maxWidth: "min(100%, 1100px)",
  margin: "40px auto",
  padding: "clamp(25px, 5vw, 45px)",
  borderRadius: 28,
 background: "linear-gradient(90deg, #f01758ff, #f7656cff)",
  boxShadow: "0 0 25px rgba(228, 217, 71, 0.6)",
  fontFamily: "'Comic Sans MS', 'Poppins', sans-serif"
},


  title: {
    fontSize: "clamp(26px, 5vw, 36px)",
    textAlign: "center",
    color: "#eff8f2ff"
  },

  score: {
    fontSize: "clamp(20px, 4vw, 28px)",
    textAlign: "center",
    marginBottom: 25
  },

  reviewBox: {
    background: "#ffffff",
    border: "4px solid",
    borderRadius: 20,
    padding: "clamp(15px, 4vw, 25px)",
    marginBottom: 20
  },

  question: {
    fontSize: "clamp(18px, 4vw, 26px)",
    fontWeight: "bold",
    marginBottom: 10
  },

  answerText: {
    fontSize: "clamp(16px, 3.5vw, 24px)"
  },

  correct: {
    color: "#16a34a",
    fontWeight: "bold",
    fontSize: "clamp(16px, 3.5vw, 22px)"
  },

  wrong: {
    color: "#ea580c",
    fontWeight: "bold",
    fontSize: "clamp(16px, 3.5vw, 22px)"
  },

  playAgainBtn: {
    marginTop: 30,
    padding: "clamp(12px, 2vw, 18px) clamp(24px, 4vw, 44px)",
    borderRadius: 16,
    border: "0px",
    background: "#22c55e",
    color: "#fff",
    fontSize: "clamp(20px, 4vw, 28px)",
    cursor: "pointer",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }
};
