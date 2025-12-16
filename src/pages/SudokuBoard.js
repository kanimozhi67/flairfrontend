import React, { useState, useEffect, useRef } from "react";
import api from "../api/axiosClient";

/* ---------- Icons ---------- */

const RefreshIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </svg>
);

const ResetIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.5 15a9 9 0 1 0 2.2-9.4L1 10" />
  </svg>
);

/* ---------- Component ---------- */

export default function SudokuBoard({ selectedLevel ,addPointsToBackend }) {
  const [puzzleId, setPuzzleId] = useState(null);
  const [puzzle, setPuzzle] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
const [clicked, setClicked] = useState(false)
  /* ---------- HIGHLIGHT ---------- */
  const [focusedCell, setFocusedCell] = useState(null);

  /* ---------- TIMER ---------- */
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, []);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(0);
    startTimer();
  };

  const formatTime = () =>
    `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  /* ---------- GAME ---------- */

  useEffect(() => {
    generateNewPuzzle();
  }, []);

  const generateNewPuzzle = async () => {
    setLoading(true);
    setResult(null);
    setUserAnswers({});
    resetTimer();
if(selectedLevel === 1)  {const { data } = await api.get("/quiz/sudoku");
 setPuzzleId(data.puzzleId);
    setPuzzle(data.questions);}
else if(selectedLevel === 2)  {const { data } = await api.get("/quiz/sudokulevel2");
 setPuzzleId(data.puzzleId);
    setPuzzle(data.questions);}
else {const { data } = await api.get("/quiz/sudokulevel3");
 setPuzzleId(data.puzzleId);
    setPuzzle(data.questions);}
    // setPuzzleId(data.puzzleId);
    // setPuzzle(data.questions);
    setLoading(false);
    setClicked(false)
  };

  const resetBoard = () => {
    setUserAnswers({});
    setResult(null);
     setLoading(false);
    setClicked(false)
  };

  const handleInputChange = (r, c, v) => {
    if (v === "" || /^[1-4]$/.test(v)) {
      setUserAnswers(p => ({ ...p, [`${r}-${c}`]: v }));
    }
  };

  const checkAnswers = async () => {
    setLoading(true);
    stopTimer();

    const answers = Object.entries(userAnswers).map(([k, v]) => {
      const [row, col] = k.split("-").map(Number);
      return { row, col, value: v };
    });

    const { data } = await api.post("/quiz/checksudoku", { puzzleId, answers });
    setResult(data);

    if (data?.score && typeof addPointsToBackend === "function") {
      addPointsToBackend(data.score);
    }

    setLoading(false);
    setClicked(true)
  };

  const getCellStyle = (r, c) => {
    const key = `${r}-${c}`;
    const correct = result?.correctAnswers?.[key];
    const user = userAnswers[key];

    const isFocused =
      focusedCell &&
      (focusedCell.row === r || focusedCell.col === c);

    return {
      width: "clamp(45px, 12vw, 60px)",
      height: "clamp(45px, 12vw, 60px)",
      fontSize: "clamp(18px, 5vw, 24px)",
      fontWeight: "bold",
      textAlign: "center",
      border: "1px solid #999",
      borderRight: c === 1 ? "3px solid #222" : "1px solid #999",
      borderBottom: r === 1 ? "3px solid #222" : "1px solid #999",
      background:
        correct && Number(user) === correct
          ? "#e6fffb"
          : user && correct
          ? "#fff1f0"
          : isFocused
          ? "#e6f4ff"
          : "#ffffff",
      outline: focusedCell?.row === r && focusedCell?.col === c
        ? "2px solid #1890ff"
        : "none",
      transition: "background 0.2s, box-shadow 0.2s",
      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)",
    };
  };

  return (
    <div className="page">
      <div className="card">
        <h1 style={{ backgroundColor:"lightcyan"}}> 4×4 Sudoku</h1>
<br></br>
        <div className="top-bar">
          <span className="timer">⏱ {formatTime()}</span>
          <div className="actions">
            <button onClick={generateNewPuzzle}><RefreshIcon /> New</button>
            <button onClick={resetBoard}><ResetIcon /> Reset</button>
          </div>
        </div>

        <div className="board">
          {puzzle.map((row, r) => (
            <div key={r} className="row">
              {row.map((cell, c) => (
                <input
                  key={`${r}-${c}`}
                  type="tel"
                  inputMode="numeric"
                  pattern="[1-4]"
                  maxLength={1}
                  disabled={cell !== 0 || loading}
                  value={cell || userAnswers[`${r}-${c}`] || ""}
                  onChange={(e) => handleInputChange(r, c, e.target.value)}
                  onFocus={() => setFocusedCell({ row: r, col: c })}
                  onBlur={() => setFocusedCell(null)}
                  style={getCellStyle(r, c)}
                />
              ))}
            </div>
          ))}
        </div>

        <button className="check" onClick={checkAnswers} disabled={loading || clicked}>
          Check Answers
        </button>

        {result && <div className="result">Score: {result.score}</div>}
      </div>

      <style>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1d2671, #c33764);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card {
          background: white;
          padding: 22px;
          border-radius: 18px;
          box-shadow: 0 16px 40px rgba(0,0,0,0.3);
        }

        h1 {
          text-align: center;
          margin-bottom: 10px;
        }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .timer {
          font-weight: bold;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .board {
          border: 4px solid #222;
          display: inline-block;
          margin: 16px auto;
        }

        .row {
          display: flex;
        }

        button {
          padding: 8px 14px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          background: #1890ff;
          color: white;
          font-weight: bold;
        }

        .check {
          width: 100%;
          background: #52c41a;
          margin-top: 10px;
        }

        .result {
          margin-top: 12px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
