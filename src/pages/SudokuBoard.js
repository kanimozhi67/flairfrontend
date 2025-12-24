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
export default function SudokuBoard({ level, selectedLevel, addPointsToBackend }) {
  const GRID = level === "primary" ? { SIZE: 9, SUBGRID: 3, MAX: 9 } : { SIZE: 4, SUBGRID: 2, MAX: 4 };

  const [puzzleId, setPuzzleId] = useState(null);
  const [puzzle, setPuzzle] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [focusedCell, setFocusedCell] = useState(null);

  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    startTimer();
    generateNewPuzzle();
    return stopTimer;
  }, []);

  const startTimer = () => { stopTimer(); timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000); };
  const stopTimer = () => timerRef.current && clearInterval(timerRef.current);
  const resetTimer = () => { stopTimer(); setSeconds(0); startTimer(); };
  const formatTime = () => `${String(Math.floor(seconds/60)).padStart(2,"0")}:${String(seconds%60).padStart(2,"0")}`;

  const generateNewPuzzle = async () => {
    setLoading(true); setResult(null); setUserAnswers({}); resetTimer(); setClicked(false);
    let url = "";
    if(level==="primary") url = selectedLevel===1?"/quiz/sudokup":selectedLevel===2?"/quiz/sudokuplevel2":"/quiz/sudokuplevel3";
    else url = selectedLevel===1?"/quiz/sudoku":selectedLevel===2?"/quiz/sudokulevel2":"/quiz/sudokulevel3";
    const { data } = await api.get(url);
    setPuzzleId(data.puzzleId); setPuzzle(data.questions); setLoading(false);
  };

  const resetBoard = () => { setUserAnswers({}); setResult(null); setClicked(false);setLoading(false) };
  const handleInputChange = (r,c,v) => { if(v==="" || (Number(v)>=1 && Number(v)<=GRID.MAX)) setUserAnswers(p=>({...p,[`${r}-${c}`]:v})); };

  const checkAnswers = async () => {
    setLoading(true); stopTimer();
    const answers = Object.entries(userAnswers).map(([k,v])=>{ const [row,col]=k.split("-").map(Number); return {row,col,value:v}; });
    const endpoint = level==="primary"?"/quiz/checksudokup":"/quiz/checksudoku";
    const { data } = await api.post(endpoint,{puzzleId,answers});
    setResult(data);
    if(data?.score && typeof addPointsToBackend==="function") addPointsToBackend(data.score);
    setClicked(true); setLoading(false);
  };

  const getCellStyle = (r,c)=>{
    const key=`${r}-${c}`;
    const correct=result?.correctAnswers?.[key];
    const user=userAnswers[key];
    const isFocused=focusedCell && (focusedCell.row===r || focusedCell.col===c);
    return {
      fontWeight:"bold",
      textAlign:"center",
      border:"1px solid #999",
      borderRight:(c+1)%GRID.SUBGRID===0 && c!==GRID.SIZE-1?"3px solid #222":"1px solid #999",
      borderBottom:(r+1)%GRID.SUBGRID===0 && r!==GRID.SIZE-1?"3px solid #222":"1px solid #999",
      background:correct && Number(user)===correct?"#28ecccff":user && correct?"#eb483cff":isFocused?"#e6f4ff":"#fff",
      outline:focusedCell?.row===r && focusedCell?.col===c?"2px solid #1890ff":"none",
    };
  };

  return (
    <div className="page">
      <div className="card">
        <h1 style={{ fontWeight:"bold"}}>{GRID.SIZE}×{GRID.SIZE} Sudoku</h1>
<hr></hr>
        <div className="top-bar">
          <span className="timer" style={{ fontWeight:"bold", fontSize:18}}>⏱ {formatTime()}</span>
        
          <div className="actions">
            <button onClick={generateNewPuzzle}><RefreshIcon /> New</button>
              {(!clicked) &&
            <button onClick={resetBoard} disabled={clicked} style={{backgroundColor:"green"}}><ResetIcon /> Reset</button>
              } &nbsp;
          </div>
        </div>

        <div
          className="board"
          style={{
            "--grid-size": GRID.SIZE,
            width: GRID.SIZE===4 ? "min(70vw,240px)" : "min(92vw,400px)"
          }}
        >
          {puzzle.map((row,r)=>
            row.map((cell,c)=>(
              <input
                key={`${r}-${c}`}
                type="tel"
                inputMode="numeric"
                maxLength={1}
                pattern={`[1-${GRID.MAX}]`}
                disabled={cell!==0 || loading}
                value={cell || userAnswers[`${r}-${c}`]||""}
                onChange={e=>handleInputChange(r,c,e.target.value)}
                onFocus={()=>setFocusedCell({row:r,col:c})}
                onBlur={()=>setFocusedCell(null)}
                style={getCellStyle(r,c)}
              />
            ))
          )}
        </div>
{( !clicked ) &&
        <button className="check" onClick={checkAnswers} 
        //disabled={loading||clicked}
        style={{ backgroundColor:"orange"}}
        >Check Answers</button>}
        {result && <div className="result">Score: {result.score}</div>}
      </div>

      <style>{`
        .page {
          min-height: 80vh;
          background: linear-gradient(135deg,#1d2671,#c33764);
           boxShadow: "0 8px 20px rgba(100, 7, 46, 0.25)",
          display:flex;
          justify-content:center;
          align-items:center;
          padding:10px;
        }
        .card {
          width:100%;
          max-width:480px;
          background:white;
          padding:16px;
          border-radius:18px;
          box-shadow:0 16px 40px rgba(0,0,0,0.3);
        }
        h1 {text-align:center; margin-bottom:12px; font-size:1.5rem;}
        .top-bar {display:flex; justify-content:space-between; flex-wrap:wrap; gap:8px; margin-bottom:12px;}
        .actions {display:flex; gap:8px; flex-wrap:wrap;}
        .actions button {flex:1; min-width:90px;}
        .board {
          display:grid;
          grid-template-columns: repeat(var(--grid-size),1fr);
          width:100%;
          aspect-ratio:1;
          border:4px solid #222;
          margin:16px auto;
          
        }
        .board input {
          width:100%;
          height:100%;
          font-size:clamp(16px,5vw,28px);
          text-align:center;
          border:1px solid #999;
          box-sizing:border-box;
        }
        button {
          padding:10px;
          border-radius:8px;
          border:none;
          cursor:pointer;
          background:#1890ff;
          color:white;
          font-weight:bold;
        }
        .check {width:100%; margin-top:12px; background:#52c41a;}
        .result {margin-top:12px; text-align:center; font-weight:bold;}
@media (max-width: 480px) {

  h1 { font-size: 1.3rem; }
  .timer, .check { font-size: 14px; }

  /* PAGE */
  .page {
    width: 380px;
    min-height: 70vh;
    marginLeft:-20px;
    padding: 0;
    display: flex;
   
    background: linear-gradient(135deg, #1d2671, #c33764);
      boxShadow: "0 8px 20px rgba(100, 7, 46, 0.25)",
   borderRadius:20,
  }

  /* CARD */
  .card {
    width: 92vw;
    max-width: 340px;
    background: white;
    padding: 0;
    border-radius: 18px;
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
    margin-left:-50px ;   /* centers card */
  }

  /* BOARD */
  .board {
    display: grid;
    grid-template-columns: repeat(var(--grid-size), 1fr);
    width: 92vw;
    max-width: 320px;
    aspect-ratio: 1;
    border: 4px solid #222;
    margin: 16px auto; /* centers board */
  }
}

      `}</style>
    </div>
  );
}
