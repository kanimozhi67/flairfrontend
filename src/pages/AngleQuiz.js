import React, { useState } from "react";


import { Card, Button, Progress, Typography, Space, Divider } from "antd";


const { Title, Text } = Typography;

/* ---------- SVG COMPONENTS ---------- */

const AcuteSVG = () => (
  <svg width="160" height="120">
    {/* arms */}
    <line x1="80" y1="80" x2="140" y2="80" stroke="black" strokeWidth="3" />
    <line x1="80" y1="80" x2="110" y2="30" stroke="black" strokeWidth="3" />

    {/* arc */}
    <path
      d="M100 80 A20 20 0 0 0 92 62"
      fill="none"
      stroke="#6ec1ff"
      strokeWidth="8"
    />
  </svg>
);


const RightSVG = () => (
  <svg width="160" height="120">
    <line x1="80" y1="80" x2="140" y2="80" stroke="black" strokeWidth="3" />
    <line x1="80" y1="80" x2="80" y2="20" stroke="black" strokeWidth="3" />

    {/* square corner */}
    <path
      d="M100 80 L100 60 L80 60"
      fill="none"
      stroke="#6ec1ff"
      strokeWidth="6"
    />
  </svg>
);


const ObtuseSVG = () => (
  <svg width="160" height="120">
    <line x1="80" y1="80" x2="140" y2="80" stroke="black" strokeWidth="3" />
    <line x1="80" y1="80" x2="50" y2="30" stroke="black" strokeWidth="3" />

    <path
      d="M100 80 A30 30 0 0 0 65 60"
      fill="none"
      stroke="#6ec1ff"
      strokeWidth="8"
    />
  </svg>
);

const StraightSVG = () => (
  <svg width="160" height="100">
    <line x1="10" y1="50" x2="200" y2="50" stroke="black" strokeWidth="3" />

    <path
      d="M60 50 A30 30 0 0 1 120 50"
      fill="none"
      stroke="#6ec1ff"
      strokeWidth="8"
    />
  </svg>
);

const ReflexSVG = () => (
  <svg width="160" height="140">
    <line x1="80" y1="80" x2="190" y2="80" stroke="black" strokeWidth="3" />
    <line x1="80" y1="80" x2="10" y2="120" stroke="black" strokeWidth="3" />

    <path
      d="M100 80 A30 30 1 1 0 55 95"
      fill="none"
      stroke="#6ec1ff"
      strokeWidth="8"
    />
  </svg>
);


const FullRotationSVG = () => (
  <svg width="140" height="140">
    <circle cx="70" cy="70" r="35" fill="none" stroke="#6ec1ff" strokeWidth="10" />
    <line x1="0" y1="70" x2="180" y2="70" stroke="black" strokeWidth="3" />
  </svg>
);


/* ---------- QUESTIONS ---------- */

const quizData = [
  {
    question: "Which angle is less than 90°?",
    svg: <AcuteSVG />,
    options: ["Acute", "Right", "Obtuse", "Straight"],
    answer: "Acute",
  },
  {
    question: "Which angle is exactly 90°?",
    svg: <RightSVG />,
    options: ["Acute", "Right", "Reflex", "Straight"],
    answer: "Right",
  },
  {
    question: "Which angle is greater than 90° but less than 180°?",
    svg: <ObtuseSVG />,
    options: ["Obtuse", "Straight", "Acute", "Full Rotation"],
    answer: "Obtuse",
  },
  {
    question: "Which angle is exactly 180°?",
    svg: <StraightSVG />,
    options: ["Right", "Straight", "Reflex", "Acute"],
    answer: "Straight",
  },
  {
    question: "Which angle is greater than 180°?",
    svg: <ReflexSVG />,
    options: ["Reflex", "Right", "Obtuse", "Straight"],
    answer: "Reflex",
  },
  {
    question: "Which angle is 360°?",
    svg: <FullRotationSVG />,
    options: ["Straight", "Right", "Full Rotation", "Acute"],
    answer: "Full Rotation",
  },
];

/* ---------- MAIN COMPONENT ---------- */

// export default function AngleQuiz() {
//   const [index, setIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [finished, setFinished] = useState(false);

//   const current = quizData[index];

//   const choose = (opt) => {
//     setSelected(opt);
//     if (opt === current.answer) setScore(score + 1);
//   };

//   const next = () => {
//     setSelected(null);
//     if (index + 1 < quizData.length) setIndex(index + 1);
//     else setFinished(true);
//   };

//   const restart = () => {
//     setIndex(0);
//     setScore(0);
//     setSelected(null);
//     setFinished(false);
//   };

//   return (
//     <Card
//       style={{
//         maxWidth: 500,
//         margin: "40px auto",
//         borderRadius: 16,
//         textAlign: "center",
//       }}
//     >
//       <Title level={3}>📐 Types of Angles Quiz</Title>

//       <Progress
//         percent={Math.round(((index + 1) / quizData.length) * 100)}
//       />

//       {finished ? (
//         <>
//           <Title level={4}>
//             Your Score: {score} / {quizData.length}
//           </Title>

//           <Button type="primary" onClick={restart}>
//             Play Again 🔄
//           </Button>
//         </>
//       ) : (
//         <>
//           <Space direction="vertical" size="middle" style={{ width: "100%" }}>
//             <Text strong>{current.question}</Text>

//             {current.svg}

//             {current.options.map((o, i) => (
//               <Button
//                 key={i}
//                 block
//                 disabled={selected}
//                 onClick={() => choose(o)}
//                 style={{
//                   background:
//                     selected === o ? "#d9f7be" : undefined,
//                 }}
//               >
//                 {o}
//               </Button>
//             ))}

//             {selected && (
//               <Button type="primary" onClick={next}>
//                 Next ➡️
//               </Button>
//             )}
//           </Space>
//         </>
//       )}
//     </Card>
//   );
// }


/* keep ALL your SVG components and quizData ABOVE exactly same */

/* ---------- MAIN COMPONENT ---------- */


export default function AngleQuiz({addPointsToBackend}) {
  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const [shuffledQuiz, setShuffledQuiz] = useState(() =>
    shuffle(quizData.map(q => ({ ...q, options: shuffle(q.options) })))
  );

  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const current = shuffledQuiz[index];

  const choose = (opt) => {
    setSelected(opt);
    setAnswers(prev => [...prev, opt]);
    if (opt === current.answer) setScore(score + 1);
  };

  const next = () => {
    setSelected(null);
    if (index + 1 < shuffledQuiz.length) setIndex(index + 1);
    else
      {
        setFinished(true);
        addPointsToBackend(score);
      } 
  };

  const restart = () => {
    setShuffledQuiz(shuffle(quizData.map(q => ({ ...q, options: shuffle(q.options) }))));
    setIndex(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
    setAnswers([]);
  };

  return (
    <div style={{
      minHeight: "100vh",
       background: "linear-gradient(135deg, #6a11cb, #ac0a0a)", 
    //   background: "linear-gradient(135deg,#ffd6e7,#e6f7ff,#fff1b8)",
    borderRadius:30,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 10
    }}>
      <Card style={{ width: "100%", maxWidth: 600, borderRadius: 0,
        background:"transparent",
        boxShadow: "0 10px 25px rgba(0,0,0,.2)" }}>
        <Title level={2} style={{ textAlign: "center", color: "#e7e5ee" }}>📐 Types of Angles Quiz</Title>

        {!finished && <Progress strokeColor="#7b5cff" trailColor="#ffe58f" percent={Math.round(((index + 1) / shuffledQuiz.length) * 100)} />}

        {finished ? (
          <>
            <Title level={4} style={{ textAlign: "center" }}>🎉 Score: {score}/{shuffledQuiz.length}</Title>
            <Divider />

            {shuffledQuiz.map((q, i) => {
              const correct = answers[i] === q.answer;
              return (
                <Card key={i} style={{
                  marginBottom: 15,
                  borderRadius: 20,
                
                  background: correct ? "linear-gradient(135deg,#83eb27,#96f537)" : "linear-gradient(135deg,#df4e40,#ee6d63)"
                }}>
                  <Text strong style={{ fontSize:20,}}>{q.question}</Text>
                  <div style={{ textAlign: "center", margin: 10 , fontSize:20,}}>{q.svg}</div>
                  <Text>Your Answer: <span style={{ color: correct ? "green" : "red" ,fontWeight:"bold", fontSize:20,}}>{answers[i]}</span></Text><br />
                  {!correct && <Text>Correct: <span style={{ color: "green"  ,fontWeight:"bold", fontSize:20,}}>{q.answer}</span></Text>}
                </Card>
              );
            })}

            <Button block style={{ height: 50, borderRadius: 25, background: "#7b5cff", color: "#fff", fontSize: 18 }} onClick={restart}>
              New Game 🔄
            </Button>
          </>
        ) : (
          <Space direction="vertical" style={{ width: "100%", }}><br></br>
            <Text strong style={{ fontSize:20,}}>{current.question}</Text>
            <div style={{ display: "flex", justifyContent: "center" }}>{current.svg}</div>

            {current.options.map((o, i) => (
              <Button key={i} block disabled={selected} onClick={() => choose(o)}
                style={{
                  height: 48,
                  borderRadius: 20,
                  fontSize: 16,
                  background: selected === o ? (o === current.answer ? "#b7eb8f" : "#ffa39e") : "#fafafa"
                }}>
                {o}
              </Button>
            ))}

            {selected && next()
           //  <Button type="primary" onClick={next}>Next ➡️</Button>
             }
          </Space>
        )}
      </Card>
    </div>
  );
}

