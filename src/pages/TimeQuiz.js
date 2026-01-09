

// export default TimeQuiz
import { useState,useEffect } from "react";
import { Input, Button, message,Card ,Typography} from "antd";
 import SvgClock from './SvgClock';

 const { Title } = Typography;

const clocks = [
  { emoji: <SvgClock hour={5} minute={10} />, time: "5:10" },
  { emoji: <SvgClock hour={1} minute={35} />, time: "1:35" },
  { emoji: <SvgClock hour={12} minute={55} />, time: "12:55" },
  { emoji: <SvgClock hour={9} minute={30} />, time: "9:30" },
  { emoji: <SvgClock hour={3} minute={0} />, time: "3:00" },
  { emoji: <SvgClock hour={7} minute={15} />, time: "7:15" },
  { emoji: <SvgClock hour={2} minute={50} />, time: "2:50" },
  { emoji: <SvgClock hour={4} minute={45} />, time: "4:45" },
  { emoji: <SvgClock hour={8} minute={20} />, time: "8:20" },
  { emoji: <SvgClock hour={6} minute={5} />, time: "6:05" },
  { emoji: <SvgClock hour={11} minute={40} />, time: "11:40" },
];

export default function TimeQuiz({ category, level, selectedLevel, user, addPointsToBackend }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
//const [clocks, setClocks] = useState(clocks1);
 
  const [score, setScore] = useState(0);
  const [iteration, setIteration] = useState(1);

  /* Handle level change */
  useEffect(() => {
   // setClocks(selectedLevel === 3 ? clocks3 : selectedLevel === 2 ? clocks2 : clocks1);
    setIndex(0);
    setScore(0);
    setIteration(1);
  }, [selectedLevel]);
  const checkAnswer = () => {
       let nextScore = score;
    let nextIteration = iteration + 1;

    if (answer.trim() === clocks[index].time) {
      message.success("Correct 🎉");
        nextScore += 1;
      setIndex((i) => (i + 1) % clocks.length);
      setAnswer("");
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

  };

  return (
    <div style={{ textAlign: "center", fontSize: 40 }}>
         <Card
      style={{
        borderRadius: 20,
        background: "linear-gradient(135deg,#a9b1f3,#8a1043)",
        boxShadow: "0 8px 20px rgba(100,7,46,0.25)",
        padding: 20,
        paddingTop:0,
        maxWidth: 800,
        margin: "auto"
      }}
    >
    <Title style={{ fontWeight: "bold",fontSize: 35 }}>
          🧠 Q{iteration}. {selectedLevel === 2 ? "Find the clock ⏰" : "Find the time ⏰"}
        
  <br />
  <hr />
</Title>
      <div>{clocks[index].emoji}</div>

      <Input
        placeholder="HH:MM"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        style={{ width: 120, textAlign: "center", margin: "12px auto" }}
      />

      <Button type="primary" onClick={checkAnswer}>
        Check
      </Button>

      </Card>
    </div>
  );
}
