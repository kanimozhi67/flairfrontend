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
    <div style={{ textAlign: "center", marginTop: 30 }}>
      <h2 style={titleStyle}>Fill the shapes from smallest to largest numbers 🌟
        <hr></hr><br></br>
      </h2>

      {questions.map((q, qIdx) => (
        <div
          key={q.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          {/* Numbers to sort */}
          <div style={{ marginBottom: "10px",position:"fixed" }}>
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

// import React, { useRef, useEffect } from "react";
// import "./shapes.css";

// const SortingQuizCard = ({
//   questions,      // [{ id, numbers: [] }]
//   answers,        // { 'questionId-index': value }
//   setAnswers,
//   results,        // { 'questionId-index': true/false }
//   submitted,
//   handleSubmit,
//   fetchQuiz,      // function to reload the quiz
//   loading,
//   speakLine,   // boolean to indicate loading state
//   shape = "star",
// }) => {
//   const firstInputRef = useRef(null);

//   // Focus the first input when component mounts
//   useEffect(() => {
//     if (firstInputRef.current) firstInputRef.current.focus();
//   }, []);

//   const hasSpoken = useRef(false);
//  useEffect(() => {
//     if (!hasSpoken.current && speakLine && typeof speakLine === "function") {
//       speakLine("Fill the shapes from smallest to largest numbers.");
//       hasSpoken.current = true; // mark as spoken
//     }
//   }, [speakLine]);

//   // Determine shape CSS class
//   const shapeClass = {
//     star: "shape-star",
//     cloud: "shape-cloud",
//     heart: "shape-heart",
//   }[shape];

//   // Check if all inputs are answered
//   const allAnswered = questions.every(q =>
//     q.numbers.every(
//       (_, idx) => answers[`${q.id}-${idx}`] !== undefined && answers[`${q.id}-${idx}`] !== ""
//     )
//   );

//   return (
//     <div style={{ textAlign: "center", marginTop: 30 }}>
//       <h2 style={{ fontSize: 38, marginBottom: 20 }}>
//         Fill the shapes from smallest to largest  numbers🌟 <hr></hr><br></br>
//       </h2>

//       {questions.map((q, qIdx) => (
//         <div
//           key={q.id}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             marginBottom: 40,
//           }}
//         >
//           {/* Numbers to sort */}
//           <div style={{ fontSize: 50, marginBottom: 15 }}>
//             {q.numbers.map((num, idx) => (
//               <span key={idx} style={{ margin: "0 10px", fontWeight: "bold" }}>
//                 {num} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//               </span>
//             ))}
//           </div>

//           {/* Shapes with input inside */}
//           <div style={{ display: "flex", gap: 20 }}>
//             {q.numbers.map((num, idx) => {
//               const inputId = `${q.id}-${idx}`;
//               return (
//                 <div key={inputId} className={`shape-container ${shapeClass}`}>
//                   <div className="shape-input-wrapper">
//                     <input
//                       type="number"
//                       value={answers[inputId] ?? ""}
//                       onChange={(e) =>
//                         setAnswers((prev) => ({
//                           ...prev,
//                           [inputId]: e.target.value,
//                         }))
//                       }
//                       disabled={submitted}
//                       ref={qIdx === 0 && idx === 0 ? firstInputRef : null}
//                       className="shape-input"
//                       style={{
//                         color:
//                           submitted && results[inputId] === true
//                             ? "green"
//                             : submitted && results[inputId] === false
//                             ? "red"
//                             : "black",
//                       }}
//                     />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       ))}

//       {/* Submit Button */}
//       <button
//         onClick={handleSubmit}
//         disabled={!allAnswered || loading}
//         hidden={submitted}
//         style={{
//           marginTop: 30,
//           padding: "12px 30px",
//           fontSize: 24,
//           borderRadius: 10,
//           background: "#ff9d2f",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Submit
//       </button>
// <br></br>
//       {/* Play Again Button */}
//       {submitted && (
//         <button
//           onClick={fetchQuiz}
//           style={{
//             marginTop: 20,
//             fontSize: 24,
//             borderRadius: 12,
//             padding: "12px 0",
//             background: "linear-gradient(135deg, #ff9d2f, #ff6126)",
//             color: "white",
//             fontWeight: "bold",
//             border: "none",
//             boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
//             cursor: "pointer",
//           }}
//         >
//           🔄 Play Again
//         </button>
//       )}
//     </div>
//   );
// };

// export default SortingQuizCard;
