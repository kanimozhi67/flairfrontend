import { useState, useEffect } from "react";
import { Button, message, Card, Typography } from "antd";
import SvgClock from "./SvgClock";

const { Title } = Typography;

/* -------------------- DATA -------------------- */

// LEVEL 1 – Clock → Text
const clocks1 = [
  { emoji: <SvgClock hour={3} minute={0} />, correct: "3:00", options: ["2:00", "3:00", "4:00"] },
  { emoji: <SvgClock hour={6} minute={0} />, correct: "6:00", options: ["5:00", "6:00", "7:00"] },
  { emoji: <SvgClock hour={5} minute={0} />, correct: "5:00", options: ["8:00", "9:00", "5:00"] },
  { emoji: <SvgClock hour={1} minute={0} />, correct: "1:00", options: ["1:00", "3:00", "4:00"] },
  { emoji: <SvgClock hour={8} minute={0} />, correct: "8:00", options: ["5:00", "8:00", "7:00"] },
  { emoji: <SvgClock hour={2} minute={0} />, correct: "2:00", options: ["8:00", "9:00", "2:00"] },
  { emoji: <SvgClock hour={4} minute={0} />, correct: "4:00", options: ["1:00", "3:00", "4:00"] },
  { emoji: <SvgClock hour={7} minute={0} />, correct: "7:00", options: ["5:00", "8:00", "7:00"] },
  { emoji: <SvgClock hour={12} minute={0} />, correct: "12:00", options: ["8:00", "12:00", "10:00"] },
  { emoji: <SvgClock hour={11} minute={0} />, correct: "11:00", options: ["8:00", "9:00", "11:00"] },
];

// LEVEL 2 – Text → Clock
const clocks2 = [
  {
    emoji: "3:00",
    correct: { hour: 3, minute: 0 },
    options: [{ hour: 3, minute: 0 }, { hour: 3, minute: 15 }],
  },
  {
    emoji: "6:00",
    correct: { hour: 6, minute: 0 },
    options: [{ hour: 6, minute: 0 }, { hour: 6, minute: 20 }],
  },
  {
    emoji: "5:00",
    correct: { hour: 5, minute: 0 },
    options: [{ hour: 5, minute: 10 }, { hour: 5, minute: 0 }],
  },
  {
    emoji: "1:00",
    correct: { hour: 1, minute: 0 },
    options: [{ hour: 1, minute: 45 }, { hour: 1, minute: 0 }],
  },
  {
    emoji: "8:00",
    correct: { hour: 8, minute: 0 },
    options: [{ hour: 8, minute: 0 }, { hour: 9, minute: 0 }],
  },
  {
    emoji: "2:00",
    correct: { hour: 2, minute: 0 },
    options: [{ hour: 1, minute: 10 }, { hour: 2, minute: 0 }],
  },
  {
    emoji: "4:00",
    correct: { hour: 4, minute: 0 },
    options: [{ hour: 4, minute: 0 }, { hour: 4, minute: 20 }],
  },
  {
    emoji: "7:00",
    correct: { hour: 7, minute: 0 },
    options: [{ hour: 8, minute: 0 }, { hour: 7, minute: 0 }],
  },
  {
    emoji: "12:00",
    correct: { hour: 12, minute: 0 },
    options: [{ hour: 12, minute: 0 }, { hour: 4, minute: 0 }],
  },
  {
    emoji: "11:00",
    correct: { hour: 11, minute: 0 },
    options: [{ hour: 11, minute: 55 }, { hour: 11, minute: 0 }],
  },
];

// LEVEL 3 – Clock → Text (minutes)
const clocks3 = [
  { emoji: <SvgClock hour={3} minute={10} />, correct: "3:10", options: ["3:00", "3:10", "2:00"] },
  { emoji: <SvgClock hour={6} minute={55} />, correct: "6:55", options: ["5:00", "6:55", "7:00"] },
  { emoji: <SvgClock hour={5} minute={20} />, correct: "5:20", options: ["8:00", "9:00", "5:20"] },
  { emoji: <SvgClock hour={1} minute={40} />, correct: "1:40", options: ["1:40", "3:00", "4:00"] },
  { emoji: <SvgClock hour={8} minute={35} />, correct: "8:35", options: ["5:00", "8:35", "7:00"] },
  { emoji: <SvgClock hour={2} minute={25} />, correct: "2:25", options: ["8:00", "9:00", "2:25"] },
  { emoji: <SvgClock hour={4} minute={30} />, correct: "4:30", options: ["1:00", "3:00", "4:30"] },
  { emoji: <SvgClock hour={7} minute={15} />, correct: "7:15", options: ["5:00", "8:00", "7:15"] },
  { emoji: <SvgClock hour={12} minute={0} />, correct: "12:00", options: ["8:00", "12:00", "10:00"] },
  { emoji: <SvgClock hour={11} minute={55} />, correct: "11:55", options: ["8:00", "9:00", "11:55"] },
];

/* -------------------- COMPONENT -------------------- */

export default function TimeOption({ selectedLevel, addPointsToBackend }) {
  const [clocks, setClocks] = useState(clocks1);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [iteration, setIteration] = useState(1);

  /* Handle level change */
  useEffect(() => {
    setClocks(selectedLevel === 3 ? clocks3 : selectedLevel === 2 ? clocks2 : clocks1);
    setIndex(0);
    setScore(0);
    setIteration(1);
  }, [selectedLevel]);

  const handleOptionClick = (option) => {
    const current = clocks[index];

    const isCorrect =
      typeof current.correct === "string"
        ? option === current.correct
        : option.hour === current.correct.hour &&
          option.minute === current.correct.minute;

    let nextScore = score;
    let nextIteration = iteration + 1;

    if (isCorrect) {
      nextScore += 1;
      message.success("Correct 🎉");
    } else {
      message.error("Try again ⏱️");
    }

    setScore(nextScore);
    setIteration(nextIteration);

    if (nextIteration > 4) {
        if(nextScore){
      addPointsToBackend(nextScore);
      setScore(0);
      setIteration(1);
    }
      else{
      addPointsToBackend();
      setScore(0);
      setIteration(1);}  
      
    }

    setIndex((prev) => (prev + 1) % clocks.length);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Card
        style={{
          borderRadius: 20,
          background: "linear-gradient(135deg,#a9b1f3,#8a1043)",
          boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
          padding: 20,
          maxWidth: 800,
          margin: "auto",
        }}
      >
        <Title style={{ fontWeight: "bold" }}>
          🧠 Q{iteration}. {selectedLevel === 2 ? "Find the clock" : "Find the time"}
          <hr />
        </Title>

        <div style={{ fontSize: 60 }}>{clocks[index].emoji}</div>

        <div style={{ marginTop: 20 }}>
          {clocks[index].options.map((opt, i) => (
            <Button
              key={i}
              onClick={() => handleOptionClick(opt)}
              style={{
                margin: 8,
                minWidth: 100,
                padding: selectedLevel === 2 ? 80 : 10,
                background: selectedLevel === 2 ? "transparent" : "blue",
              }}
              type="primary"
            >
              {selectedLevel === 2 ? (
                <SvgClock hour={opt.hour} minute={opt.minute} />
              ) : (
                opt
              )}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
