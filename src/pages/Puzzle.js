import React, { useEffect, useState } from "react";
import { Card, Row, Col, InputNumber, Button, message } from "antd";
import api from "../api/axiosClient";
import { IconMap } from "antd/es/result";

export default function Puzzle({
  user,
  answers,
  setAnswers,
  submitted,
  setSubmitted,
  results,
  setResults,
  addPointsToBackend,
}) {
  const [puzzleId, setPuzzleId] = useState(null);
  const [equations, setEquations] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [loading, setLoading] = useState(true);
 const [message, setMessage] = useState({ type: "", text: "" });
  const [inputToIcon, setInputToIcon] = useState({});
  // Map each input to an icon
  const icons =  ["🍎", "🍌", "🍇", "🍊", "🥝", "🍍", "🍑", "🍒", "🥭"];
  //const inputToIcon = {};

  // Fetch puzzle from backend
  useEffect(() => {
    const fetchPuzzle = async () => {
      setLoading(true);
      try {
        const res = await api.get("/quiz/puzzle");
        const puzzleData = res.data.puzzle || {};
        setPuzzleId(puzzleData.id);
        setEquations(puzzleData.equations || []);
        setInputs(puzzleData.inputs || []);

        // Initialize answers for each input
        const initialAnswers = {};
         const iconMap = {};
        (puzzleData.inputs || []).forEach((input, idx) => {
          initialAnswers[input] = answers[input] ?? null;
          iconMap[input] = icons[idx % icons.length]; // assign icon
        });
        setAnswers((prev) => ({ ...prev, ...initialAnswers }));
           setInputToIcon(iconMap);
      } catch (err) {
        console.error("Failed to fetch puzzle:", err);
        message.error("Failed to load puzzle.");
      } finally {
        setLoading(false);
      }
    };
    fetchPuzzle();
  }, []);

 const submitPuzzle = async () => {
  const allAnswered = inputs.every(
    (input) => answers[input] !== null && answers[input] !== undefined
  );
  if (!allAnswered) {
    message.warning("⚠️ Please answer all puzzle inputs before submitting!");
    return;
  }

  try {
    const payload = inputs.map((input) => ({
      id: input,
      answer: answers[input],
    }));

    const res = await api.post("/quiz/checkpuzzle", {
      puzzleId,
      answers: payload,
      userId: user?._id,
    });

    const score = res?.data?.score ?? 0;
    setSubmitted(true);

    if (addPointsToBackend) await addPointsToBackend(score);

    // Fixed answer check
    const resResults = {};
    inputs.forEach((input) => {
      const correct = res.data.correctAnswers[input];
      const userAns = answers[input];

      // Check number if possible, otherwise string comparison
      if (!isNaN(Number(correct)) && !isNaN(Number(userAns))) {
        resResults[input] = Number(userAns) === Number(correct);
      } else {
        resResults[input] = String(userAns).trim() === String(correct).trim();
      }
    });
    setResults(resResults);

    message.success(`🎉 You scored ${score} points!`);
  } catch (err) {
    console.error("Failed to submit puzzle:", err);
   // message.error("Failed to submit puzzle. Try again.");
  }
};


  if (loading) return <div style={{ fontSize: 30, textAlign: "center" }}>Loading puzzle...</div>;
  if (!equations.length || !inputs.length)
    return <div>No puzzle questions available.</div>;

  // Render each cell
  const renderCell = (val) => {
if (typeof val === "string" && inputs.includes(val)) {
  const icon = inputToIcon[val];
  return val === "A" ? (
    <InputNumber
      value={answers[val] ?? null}
      placeholder="🍓"// special placeholder for A
      onChange={(v) => setAnswers((prev) => ({ ...prev, [val]: v ?? null }))}
      style={{ width: 80 ,fontSize: 30, textAlign: "center" }}
    />
  ) : (
    <InputNumber
      value={answers[val] ?? null}
      placeholder={icon} // normal placeholder
      onChange={(v) => setAnswers((prev) => ({ ...prev, [val]: v ?? null }))}
      style={{ width: 80 ,fontSize: 26, textAlign: "center"  }}
    />
  );
}

    if (val === null) return <span style={{fontSize: 30,}}>?</span>;
    return <span style={{fontSize: 30,}}>{val}</span>;
  };

  return (
    <div >
        <h1 style ={{ fontSize: 26 , color:"blue" }}>"Solve the Puzzle 🧺"</h1>
    <Card  style={{width: "580px",  backgroundColor: "lightcoral"}}>
      {equations.map((eq, eqIdx) => (
eqIdx===1 ?(
        <Row key={eqIdx} gutter={16} align="middle" style={{ marginBottom: 12 , fontSize: 28 , }}>
          <div style={{ fontWeight: "bold"}}> 
             {eq.left.map((val, i) =>
         i !== 0 ? (
    <Col key={i}>{renderCell(val)}</Col>
       ) : null
      )}
          <div style={{ fontWeight: "bold" , fontSize: "20px"}}> 
          <Col >=</Col></div>
          {/* <Col >{renderCell(eq.right)}</Col> */}
           
           </div>
        </Row>)
: eqIdx===2 ?(
        <Row key={eqIdx} gutter={16} align="middle" style={{ marginBottom: 12 , fontSize: 28 , }}>
           
             {eq.left.map((val, i) =>
     
           <Col key={i}>{renderCell(val)}</Col>
             
            )}
         
          <Col>=</Col>
          <Col>{renderCell(eq.right)}</Col>
       
        </Row>
       
    ): (
        <Row key={eqIdx} gutter={16} align="middle" style={{ marginBottom: 12 , fontSize: 28 , }}>
        {eq.left.map((val, i) =>
  
    <Col key={i}>{renderCell(val)}</Col>
  ) }

          <Col>=</Col>
          <Col>{renderCell(eq.right)}</Col>
         <div style={{ fontWeight: "bold"}}>  </div>
        </Row>)
      ))}

      <Button
        type="primary"
        onClick={submitPuzzle}
        style={{ marginTop: 16 , fontSize: 24, backgroundColor:"green", textAlign:"center"}}
        disabled={submitted}
      >
        {submitted ? "Submitted" : "Check Answer"}
      </Button>
    </Card>
    </div>
  );
}