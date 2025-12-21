import React, { useRef, useEffect } from "react";
import "./shapes.css";

const SortingQuizCard = ({
  questions, // [{ id, numbers: [] }]
  answers, // { 'questionId-index': value }
  setAnswers,
  results, // { 'questionId-index': true/false }
  submitted,
  handleSubmit,
  fetchQuiz, // function to reload the quiz
  loading,
  speakLine,
  shape = "star",
  titleStyle,
  numberStyle,
  buttonStyle,
  playAgainButtonStyle,
  //firstInputRef
}) => {
  const firstInputRef = useRef(null);

 useEffect(() => {
  if (firstInputRef.current) {
    setTimeout(() => firstInputRef.current.focus(), 50);
  }
}, [questions]);

  const hasSpoken = useRef(false);
  useEffect(() => {
    if (!hasSpoken.current && speakLine && typeof speakLine === "function") {
      speakLine("Fill the shapes from smallest to largest numbers.");
      hasSpoken.current = true; // mark as spoken
    }
  }, [speakLine]);

  const shapeClass = {
    star: "shape-star",
    cloud: "shape-cloud",
    heart: "shape-heart",
  }[shape];

  const allAnswered = questions.every((q) =>
    q.numbers.every(
      (_, idx) =>
        answers[`${q.id}-${idx}`] !== undefined &&
        answers[`${q.id}-${idx}`] !== ""
    )
  );

  return (
    <div style={{ textAlign: "center",
       borderRadius: 20,
        background: "linear-gradient(135deg,#a9b1f3,#8a1043)",
        boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
         // padding: 20,
        maxWidth: 1200,
        margin: "auto"
    }}>
   <br></br>   <h2 style={titleStyle}>Fill the shapes from smallest to largest numbers 🌟
        <hr></hr><br></br>
      </h2>

      {questions.map((q, qIdx) => (
        <div
          key={q.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: -5,
          }}
        >
          {/* Numbers to sort */}
          <div style={{ marginBottom: "0px",position:"fixed" }}>
            {q.numbers.map((num, idx) => (
              <span key={idx} style={numberStyle}>
                {num} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
<br></br>
          {/* Shapes with input inside */}
          <div
            style={{
              display: "flex",
              gap: q.numbers.length > 4 ? 10 : 20,
              flexWrap: "wrap", // wrap on mobile
              justifyContent: "center",

            }}
          >
            {q.numbers.map((num, idx) => {
              const inputId = `${q.id}-${idx}`;
              return (
                <div key={inputId} className={`shape-container ${shapeClass}`}>
                  <div className="shape-input-wrapper">
                    <input
                      type="number"
                      value={answers[inputId] ?? ""}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [inputId]: e.target.value,
                        }))
                      }
                      disabled={submitted}
                      ref={qIdx === 0 && idx === 0 ? firstInputRef : null}
                      className="shape-input"
                      style={{
                        color:
                          submitted && results[inputId] === true
                            ? "green"
                            : submitted && results[inputId] === false
                            ? "red"
                            : "black",
                        fontSize: numberStyle?.fontSize || 24,// responsive
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Submit Button */}
      {!submitted && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || loading}
          style={buttonStyle}
        >
          Submit
        </button>
      )}

      {/* Play Again Button */}
      {submitted && (
        <button onClick={fetchQuiz} style={playAgainButtonStyle}>
          🔄 New Game
        </button>
      )}
    </div>
  );
};

export default SortingQuizCard;

