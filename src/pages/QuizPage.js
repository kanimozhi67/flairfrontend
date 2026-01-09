import React, { useState, useEffect, useRef } from "react";
import { message } from "antd";
import { useWindowSize } from "react-use";
import {  useOutletContext ,useLocation,useNavigate,useParams} from "react-router-dom";
import { completeTask } from "../api/auth.js";
import api from "../api/axiosClient";
import LevelSelection from "./LevelSelection.js";
import QuizCard from "./QuizCard.js";
import Logics from "./Logics.js";
import SortingQuizCard from "./SortingQuizCard.js";
import MotivationScreen from "./MotivationScreen.js";
import ResultModal from "./ResultModal.js";
import StickerModal from "./StickerModal.js";
import FlyingSticker from "./FlyingSticker.js";
import GiftBox from "./GiftBox.js";
import NoGiftBox from "./NoGiftBox.js";
import Basket from "./Basket.js";
import QuizWithTimer from "./QuizWithTimer.js";
import SudokuBoard from "./SudokuBoard.js";
import Puzzle from "./Puzzle.js";
import PrimaryPage from "./PrimaryPage.js";
import { useSearchParams } from "react-router-dom";
import PuzzleWheel from "./PuzzleWheel.js";
import PuzzleWheelKinder from "./PuzzleWheelKinder.js";
import MoneyQuiz from "./MoneyQuiz.js";
import Measurement from "./Measurement.js";
import ShapesQuiz from "./ShapesQuiz.js";
import Fraction from "./Fraction.js";
import TimeQuiz from "./TimeQuiz.js";
import TimeOption from "./TimeOption.js";

const QuizPage = ({ user, setUser }) => {
    const navigate = useNavigate();
   const { search } = useLocation();
  const [searchParams] = useSearchParams();
  const level = searchParams.get("level"); // kindergarten | primary
  const { category } = useParams();
  const { width } = useWindowSize();
  const firstInputRef = useRef(null);
 // const taskId = searchParams.get("taskId");
//console.log(`taskid:${taskId}`)
const urlSelectedLevel = Number(searchParams.get("selectedLevel"));
  // Attempt to read update function from Layout's Outlet context.
  const outletCtx = useOutletContext?.() || {};
  const updateTodayScore =
    outletCtx?.updateTodayScore || outletCtx?.fetchTodayScore || (() => {});


 const [selectedLevel, setSelectedLevel] = useState(
  urlSelectedLevel || null
);

  const [showMotivation, setShowMotivation] = useState(false);
  const [motivationMessage, setMotivationMessage] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [finalScore, setFinalScore] = useState(0);
  const [basket, setBasket] = useState([]);
  const [selectedStickers, setSelectedStickers] = useState([]);
  const [showStickerModal, setShowStickerModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [flyData, setFlyData] = useState(null);
  const [showGift, setShowGift] = useState(false);
  const [showNoGift, setShowNoGift] = useState(false);
  const [puzzleId, setPuzzleId] = useState(null);

  // --- Default style objects (passed to children so they won't be undefined) ---
  const titleStyle = {
    fontSize: width < 480 ? 20 : width < 768 ? 24 : 28,
    marginBottom: 14,
    textAlign: "center",
    fontWeight: 700,
  };
  const numberStyle = {
    fontSize: width < 480 ? 18 : 24,
    margin: "0 8px",
    fontWeight: "700",
  };
  const buttonStyle = {
    marginTop: 18,
    padding: width < 480 ? "8px 16px" : "10px 20px",
    fontSize: width < 480 ? 16 : 18,
    borderRadius: 8,
    background: "#ff9d2f",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  };
  const playAgainButtonStyle = {
    marginTop: 12,
    padding: width < 480 ? "8px 12px" : "10px 14px",
    fontSize: width < 480 ? 16 : 18,
    borderRadius: 10,
    background: "linear-gradient(135deg,#ff9d2f,#ff6126)",
    color: "#fff",
    fontWeight: 700,
    border: "none",
    cursor: "pointer",
  };

  // --- speakLine helper (non-blocking) ---
  const speakLine = (text) => {
    if (!window.speechSynthesis) return;
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.pitch = 1.8;
      utter.rate = 1.05;
      const voices = window.speechSynthesis.getVoices();
      utter.voice =
        voices.find((v) => /zira|female|child/i.test(v.name)) || voices[0];
      window.speechSynthesis.speak(utter);
    } catch (e) {
      // ignore speech errors
    }
  };

  const containerStyle = {
    width: "100%",
    minHeight: "100vh", // full viewport height for vertical centering
    padding: 16,
    background: "linear-gradient(135deg, #ffe680, #f08c8cff)",
 
boxShadow: "0 12px 30px rgba(255, 160, 140, 0.45)",


    display: "flex",
   justifyContent: width > 768 ? "center" : "space-between",
 // center horizontally
 //  alignItems:   width > 768 ? "center" : "space-between", // center vertically
    overflowX: "hidden",
    boxSizing: "border-box",
  };

  const innerStyle = {
    display: "flex",
    flexDirection: width < 768 ? "column" : "row", // responsive stacking
    gap: 20,
    alignItems: "flex-start",
 justifyContent: width > 768 ? "center" : "space-between",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
   // marginLeft:-60
  };

  const quizCardStyle = {
    width: width < 768 ? "90%" : "580px", // responsive width
    flex: "0 0 auto", // prevent stretching
    margin: width < 768 ? "20px 0" : "0 20px",
   // boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // optional styling
  };

  const allStickers = [
    "🍰",
    "🍫",
    "🦅",
    "🤖",
    "🦄",
    "🍬",
    "🎁",
    "🎈",
    "🐶",
    "🚀",
    "🎂",
    "⭐",
    "🤴",
    "👛",
    "🐯",
    "🦁",
    "🐣",
    "🐥",
    "🦜",
    "🦩",
    "🐇",
    "🚗",
    "🛩",
    "🪆",
    "🌈",
    "🐱",
    "🦊",
    "🧸",
    "🐼",
    "🐨",
    "🍩",
    "🍕",
    "🍓", 
    "🌟",
    "👸",
    "🍦",
    "🐰",
    "💕",
    "🐤",
    "🐧",
    "🍭"
  ];

  const guideList = [
    "you can do it! ✏️ Keep practicing a little every day. If you struggle, join 🏫 FLAIR OLYMPIAD class 🧑‍🎓.",
  ];
  const adviceList = [
    "Awesome! Try challenging yourself with harder problems next time.",
    "Nice work! Remember, accuracy is more important than speed.",
    "Fantastic! Math gets easier the more you play with it.",
    "You're doing great! Stay curious and keep learning.",
    "Super effort! Don’t forget to check your answers carefully.",
    "Well done! Practice makes progress, not perfection.",
    "Nice work! Take things one step at a ti  me. Progress is still progress.",
    "Super effort! Believe in yourself. You’re more capable than you realize.",
    "Nice work! Stay open-minded. Every experience teaches you something.",
    "Super effort! Don't be afraid to ask questions.curiosity is your superpower.",
    "Nice work! Keep showing up, even on the tough days.You’re growing.",
    "Super effort! Trust the process.Good things take time.",
    "Well done!Nice work! Celebrate your small wins.They lead to big success.",
    "Well done! Stay kind to yourself. Growth isn’t always linear.",
    "Well done! Keep exploring. Your passion will guide you forward.",
  ];

  const perfectScoreAdviceList = [
    "I know you can win! You are unstoppable!",
    "You are such a talented kid! Truly amazing!",
    "I have never seen such a knowledgeable person like you!",
    "Your brain shines like a superstar! 🌟",
    "Brilliant! You solved everything perfectly!",
    "You are a genius in the making!",
    "Wow! You didn’t miss a single one — outstanding!",
    "You are extraordinary! Keep shining bright! ✨",
    "you are outstanding. I think, you are a magician.",
    "you are doing Gorgeous.you might be an Angel.",
    "Your light makes the world better—keep glowing! ✨",
    "You’re doing amazing, even on the days you doubt it! 🌟",
    "Your energy is magnetic—never dim it! ✨",
    "You are capable, powerful, and unstoppable! 💫",
    "Keep rising—your brilliance inspires others! ✨",
    "You’re a spark of magic in this world! 🔥✨",
    "Believe in your shine—it's one of a kind! 🌟",
    "You’re making progress, even if you don’t see it yet! ✨",
    "Your heart, your mind, your presence—they matter. 💛✨",
    "Keep going—your story is unfolding beautifully! 🌙✨",
  ];

 
  const feedmsg = (score) => {
  let len = questions.length; // default

  // Category-based length
  switch (category) {
    case "math":
    case "multiplication":
    case "division":
    case "shapes":
      if (level === "primary" && category === "multiplication" && selectedLevel === 3) {
        len = 9;
      } else if (category === "math" && selectedLevel === 3) {
        len = 3;
      } else {
        len = 5;
      }
      break;

    case "sorting":
      len = 1;
      break;

    case "sudoku":
      if (level === "primary") {
        len = selectedLevel === 1 ? 15 : selectedLevel === 2 ? 20 : 25;
      } else {
        len = selectedLevel === 1 ? 5 : selectedLevel === 2 ? 6 : 7;
      }
      break;

    case "puzzles":
       len = selectedLevel === 1 ? 3 : 5;
        break;

    case "time" :
       len = 4;
      break;

    case "logic":
      len = 3;
      break;

    case "money":
      len = 6;
      break;

      case "measure":
          len = selectedLevel === 1 ? 6 : 5;
          break;

    default:
      len = questions.length;
  }

 


  const feedback =
    score === len
      ? perfectScoreAdviceList[Math.floor(Math.random() * perfectScoreAdviceList.length)]
      : score >= 2
      ? adviceList[Math.floor(Math.random() * adviceList.length)]
      : guideList;

  setFeedbackMessage(`🎉 You scored ${score} points! ${feedback}`);

  if (score === len) {
    setShowGift(true);
    setShowNoGift(false);
  } else {
    setShowGift(false);
    setShowNoGift(true);
  }
};


  // Fetch quiz questions
  const fetchQuiz = async () => {
    if (!selectedLevel) return;
    setLoading(true);
    setSubmitted(false);
    setResults({});
    setFeedbackMessage("");

    try {
      let res;
      if (category === "sorting") {
   
        if(level=== "primary"){
            if (selectedLevel === 1) res = await api.get("/quiz/sortp");
        else if (selectedLevel === 2) res = await api.get("/quiz/sortplevel2");
        else res = await api.get("/quiz/sortplevel3");
        }else{
        if (selectedLevel === 1) res = await api.get("/quiz/sort");
        else if (selectedLevel === 2) res = await api.get("/quiz/sortlevel2");
        else res = await api.get("/quiz/sortlevel3");
        }
      } else if (category === "multiplication") {
       
        if(level==="primary"){
             if (selectedLevel === 1) res = await api.get("/quiz/mulp");
         if (selectedLevel === 2) res = await api.get("/quiz/mulplevel2");
      
        //  res = await api.get("/quiz/mulplevel3");
        }else{
        if (selectedLevel === 1) res = await api.get("/quiz/mul");
        else if (selectedLevel === 2) res = await api.get("/quiz/mullevel2");
        else res = await api.get("/quiz/mullevel3");
      
      }
     } else if (category === "division") {
 if (selectedLevel === 1) res = await api.get("/quiz/div");
        else if (selectedLevel === 2) res = await api.get("/quiz/divlevel2");
        else res = await api.get("/quiz/divlevel3");
      
     }else if (category === "math") {
     
        if (level === "primary") {
          if (selectedLevel === 1) res = await api.get("/quiz/mathp");
           if (selectedLevel === 2) res = await api.get("/quiz/mathp");
        //  else res = await api.get("/quiz/mathplevel3");
          setQuestions(res.data.questions || []);
          setAnswers({});
        } else {
          if (selectedLevel === 1) res = await api.get("/quiz/math");
          else if (selectedLevel === 2) res = await api.get("/quiz/math");
          else res = await api.get("/quiz/mathlevel3");
        
        }
      } else if (category === "sudoku") {
      
        res = await api.get("/quiz/sudoku");
        setQuestions(res.data.questions || []);
        setPuzzleId(res.data.puzzleId); // Store puzzleId
        setAnswers({});
        //else if (selectedLevel === 2) res = await api.get("/quiz/sudokulevel2");
        // else res = await api.get("/quiz/sudokulevel3");
      
      } else {
        if (level === "primary") {
          res = await api.get(`/quiz/mathp?level=${selectedLevel}`);
          setQuestions(res.data.questions || []);
          setAnswers({});
        } else {
          res = await api.get(`/quiz/math?level=${selectedLevel}`);
          setQuestions(res.data.questions || []);
          setAnswers({});
        }
      }
      setQuestions(res.data.questions || []);
      setAnswers({});
      //  setAnswers(Array((res.data.questions || []).length).fill(null));
    } catch (err) {
      console.error("fetchQuiz error:", err);
      setQuestions([]);
      setFeedbackMessage("❌ Failed to load quiz.");
    } finally {
      setLoading(false);
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  };

  // Ensure user loaded
  useEffect(() => {
    const fetchUser = async () => {
    //     const token = localStorage.getItem("token");

    // if (!token) return; // ⛔ stop auto-login
      if (user) return;
      try {
        const res = await api.get("/auth/getMe");
        setUser(res.data.user ?? res.data);
      } catch (err) {
        console.error("User not logged in (from quizPage)", err);
        setUser(null);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load stickers (guarded)
  useEffect(() => {
    if (!user || !user._id) return;
    const fetchStickers = async () => {
      try {
        const res = await api.get(`/users/${user._id}/stickers`);
        setBasket(res.data.stickers || []);
      } catch (err) {
        console.error("fetchStickers error:", err);
      }
    };
    fetchStickers();
  }, [user?._id]);

const userTaskId = searchParams.get("userTaskId");
const categoryName = searchParams.get("category");

  const handleComplete = async (score) => {
     if (!userTaskId || !categoryName || !selectedLevel) {
    console.warn("Task completion skipped – missing data");
    return;
  }
    try {
      console.log("user role in quizpage",user.role)
    if(user.role=== "Student"){
        await api.post("/users/completetaskstudent", {
        userTaskId,
        categoryName,
        selectedLevel,
        score,   // calculate real score here
        points: score,
      });
 message.success("🎉 Task level completed!");
    }else{
        await api.post("/users/completetask", {
        userTaskId,
        categoryName,
        selectedLevel,
        score,   // calculate real score here
        points: score,
      });
 message.success("🎉 Task level completed!");
    }
     
      //navigate("/my-tasks"); // go back to task list
    } catch (err) {
      message.error(
        err.response?.data?.message || "Failed to complete task"
      );
    }
  };

  // Helper: send points to backend and update UI
  const addPointsToBackend = async (points=0) => {

    if(points!==0){
handleComplete(points);}

    if (!user || !user._id) return;
    try {
   //   console.log(`user: ${JSON.stringify(user)} , user._id: ${user._id}`)
      // const res = await api.post("/quiz/progress/addpoints", { points });
       const res = await api.post(
      "/quiz/progress/addpoints",
      {
        studentId: user._id,   // 🔥 REQUIRED
        points: points,
      }
    );
      const total = res?.data?.points ?? res?.data?.total ?? null;

      // Prefer React callback first, but still dispatch as fallback
      try {
        await updateTodayScore();
      } catch (e) {
        // ignore
      }
      window.dispatchEvent(new Event("scoreUpdated"));
      feedmsg(points);
     // return total;



    } catch (err) {
      console.error("addPointsToBackend error:", err);
      message.error("Failed to save points. Try again.");
      return null;
    }
  };

  // Submit quiz and handle results
  const submitQuiz = async () => {
    if (!questions || questions.length === 0) return;
    console.log("submitquiz");
    // Sorting quiz
    if (category === "sorting") {
      const allAnswered = questions.every((q) =>
        q.numbers.every(
          (_, idx) =>
            answers[`${q.id}-${idx}`] !== undefined &&
            answers[`${q.id}-${idx}`] !== ""
        )
      );
      if (!allAnswered) {
        setFeedbackMessage("⚠️ Please answer all questions before submitting!");
        return;
      }

      try {
        const payload = questions.map((q) => ({
          id: q.id,
          answer: q.numbers.map((_, idx) => Number(answers[`${q.id}-${idx}`])),
        }));

        const res = await api.post("/quiz/checksort", {
          userId: user?._id,
          answers: payload,
        });

        const score = res?.data?.score ?? 0;
        setFinalScore(score);
        setSubmitted(true);

        await addPointsToBackend(score);
        const resResults = {};
        questions.forEach((q) => {
          q.numbers.forEach((_, idx) => {
            const key = `${q.id}-${idx}`;
            resResults[key] =
              Number(answers[key]) === res.data.correctAnswers[q.id][idx];
          });
        });
        setResults(resResults);
      } catch (err) {
        console.error("submitQuiz (sorting) error:", err);
        setFeedbackMessage("❌ Submit failed.");
      }

      return;
    }

    const hasAllKeys = questions.every((q) => answers.hasOwnProperty(q.id));

    if (!hasAllKeys) {
      setFeedbackMessage("⚠️ Quiz incomplete!");
      return;
    }

    //normal quiz

    const res = await api.post("/quiz/check", {
      answers: questions.map((q) => ({ id: q.id, answer: answers[q.id] })),
    });

    console.log("submitquiz");
    console.log("ANSWERS:", answers);
    console.log(
      "QUESTIONS:",
      questions.map((q) => q.id)
    );
    const score = res?.data?.score ?? 0;
    setFinalScore(score);
    setSubmitted(true);

    await addPointsToBackend(score);




    const resResults = {};
    questions.forEach((q) => {
      resResults[q.id] =
        Number(answers[q.id]) === Number(res.data.correctAnswers[q.id]);
    });
    setResults(resResults);

   // giftmessage(score);
  };

  const giftmessage = (score) => {
    const feedback =
      score === questions.length
        ? perfectScoreAdviceList[
            Math.floor(Math.random() * perfectScoreAdviceList.length)
          ]
        : score >= 2
        ? adviceList[Math.floor(Math.random() * adviceList.length)]
        : guideList;

    setFeedbackMessage(`🎉  ${user?.username} You scored ${score} points! ${feedback}`);
    if (score === questions.length) setShowGift(true);
    else setShowNoGift(true);
  };
  const onStickerClicked = async (emoji, event) => {
    if (!user || !user._id) {
      message.error("Not logged in");
      return;
    }

    // Only check selectedStickers (stickers available to collect)
    if (!selectedStickers.includes(emoji)) {
      message.info("You've already collected this sticker!");
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const start = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    const basketTarget = {
      x: window.innerWidth - 100,
      y: window.innerHeight - 100,
    };
    setFlyData({ emoji, start, target: basketTarget });

    try {
      await api.post(`/users/${user._id}/stickers`, { sticker: [emoji] });
      setUser((prev) => ({
        ...(prev || {}),
        sticker: [...((prev && prev.sticker) || []), emoji],
      }));
    } catch (err) {
      console.error("Failed to save sticker", err);
      message.error("Failed to save sticker.");
    }

    setTimeout(() => {
      setBasket((prev) => [...prev, emoji]);
      setSelectedStickers((prev) => prev.filter((s) => s !== emoji)); // remove from modal
      setFlyData(null);
      setShowStickerModal(false);
      setShowResultModal(true);
    }, 720);
  };




useEffect(() => {
  if (urlSelectedLevel) {
    setMotivationMessage("🔥 Great choice! Let’s start your challenge!");
    setShowMotivation(true);
  }
}, [urlSelectedLevel]);
  // Render flows
  if (!selectedLevel) {
    return (
      <LevelSelection
        onSelectLevel={(lvl, msg) => {
          setSelectedLevel(lvl);
          setMotivationMessage(msg);
          setShowMotivation(true);
        }}
      />
    );
  }

  if (showMotivation) {
    return (
      <MotivationScreen
        message={motivationMessage}
        onStart={() => {
          setShowMotivation(false);
          fetchQuiz();
        }}
        user={user}
      />
    );
  }

  return (
    <div style={{    background: "linear-gradient(135deg, #ffe680, #f08c8cff)",
 
boxShadow: "0 12px 30px rgba(255, 160, 140, 0.45)",}}>
           <button
  onClick={() => window.location.reload()}
  style={{
  
    height: "40px",
   // zIndex: 1000,
    backgroundColor:"#fff",
  
    fontSize:18,
    fontWeight:"bold",
    border:"0px ",
    color:"blue",
    cursor:"pointer"
  }}
>
  👉Change level from {selectedLevel}
</button>

    <div style={containerStyle}>
 
      <div style={innerStyle}>
      
        <div style={quizCardStyle}>
          
          {category === "sorting" ? (
            <SortingQuizCard
              level={level}
              questions={questions}
              setQuestions={setQuestions}
              answers={answers}
              setAnswers={setAnswers}
              results={results}
              submitted={submitted}
              handleSubmit={submitQuiz}
              fetchQuiz={fetchQuiz}
              loading={loading}
              speakLine={speakLine}
              shape="star"
              titleStyle={titleStyle}
              numberStyle={numberStyle}
              buttonStyle={buttonStyle}
              playAgainButtonStyle={playAgainButtonStyle}
            />
          ) : category === "math" && selectedLevel === 2 ? (
            <QuizWithTimer
              questions={questions}
              answers={answers}
              setAnswers={setAnswers}
              //  submitQuiz={submitQuiz}
              // submitted={submitted}
              //  results={results}
              setFeedbackMessage={setFeedbackMessage}
              setFinalScore={setFinalScore}
              setSubmitted={setSubmitted}
              addPointsToBackend={addPointsToBackend}
              setResults={setResults}
              giftmessage={giftmessage}
              fetchQuiz={fetchQuiz}
              speakLine={speakLine}
            />
          ) : category === "sudoku" ? (
            <SudokuBoard
              level={level}
              selectedLevel={selectedLevel}
              addPointsToBackend={addPointsToBackend}
            />
          ) : category === "puzzles" && selectedLevel===1 ? (
            <div style={{ fontSize: "28px", fontWeight: "bold" }}>
              <Puzzle
                selectedLevel={selectedLevel}
                user={user}
                puzzleId={puzzleId}
                answers={answers}
                setAnswers={setAnswers}
                submitted={submitted}
                setSubmitted={setSubmitted}
                results={results}
                setResults={setResults}
                addPointsToBackend={addPointsToBackend}
              />
            </div>
          ) : category === "logic" ? (
            <Logics
            level={level}
              selectedLevel={selectedLevel}
              user={user}
              puzzleId={puzzleId}
              answers={answers}
              setAnswers={setAnswers}
              submitted={submitted}
              setSubmitted={setSubmitted}
              results={results}
              setResults={setResults}
              addPointsToBackend={addPointsToBackend}
            />
          ) : level === "primary" && category === "multiplication" && selectedLevel === 3 ? ( 

            <PuzzleWheel
            
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
            
            />
          ) : category === "math" && selectedLevel === 3 ? ( 

<PuzzleWheelKinder
            level={level}
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
            
            />

        ): category=== "money" ? (
<MoneyQuiz
     level={level}
     selectedLevel={selectedLevel}
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
/>
        ): category=== "shapes" ? (
<ShapesQuiz
user={user}
     level={level}
     selectedLevel={selectedLevel}
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
/>

        ):category==="measure" ?(
<Measurement  
 level={level}
     selectedLevel={selectedLevel}
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
/>
        ):category==="fraction" || (category === "puzzles" && level === "kindergarten" && selectedLevel !==1 ) ?(
<Fraction  
category ={category}
 level={level}
     selectedLevel={selectedLevel}
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
/>
        ):category==="time" && level==="primary"? (
<TimeQuiz
category ={category}
 level={level}
     selectedLevel={selectedLevel}
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
/>
        ):category==="time" && level!=="primary"? (
<TimeOption
category ={category}
 level={level}
     selectedLevel={selectedLevel}
            addPointsToBackend={addPointsToBackend}
            setResults={setResults}
/>

 ):(
            <QuizCard
              level={level}
              selectedLevel={selectedLevel}
              category={category}
              questions={questions}
              answers={answers}
              setAnswers={setAnswers}
              submitQuiz={submitQuiz}
              submitted={submitted}
              results={results}
              loading={loading}
              fetchQuiz={fetchQuiz}
              firstInputRef={firstInputRef}
              titleStyle={titleStyle}
              numberStyle={numberStyle}
              buttonStyle={buttonStyle}
              playAgainButtonStyle={playAgainButtonStyle}
              speakLine={speakLine}
            />
          )}
        </div>
      </div>

      <GiftBox
        setSelectedStickers={setSelectedStickers}
        setShowStickerModal={setShowStickerModal}
        speakLine={speakLine}
        showGift={showGift}
        setShowGift={setShowGift}
        allStickers={allStickers}
      />

      <NoGiftBox
        speakLine={speakLine}
        showNoGift={showNoGift}
        setShowNoGift={setShowNoGift}
        setShowResultModal={setShowResultModal}
        user={user}
      />

      <StickerModal
        visible={showStickerModal}
        stickers={selectedStickers}
        onStickerClick={onStickerClicked}
        onCancel={() => setShowStickerModal(false)}
      />

      <ResultModal
        visible={showResultModal}
        score={finalScore}
        feedback={feedbackMessage}
        onClose={() => setShowResultModal(false)}
        onClose2={() => {
          setShowResultModal(false);
          fetchQuiz();
        }}
        speakLine={speakLine}
        user={user}
      />

      <FlyingSticker
        flyData={flyData}
        setShowResultModal={setShowResultModal}
      />
      {/* <Basket basket={basket} /> */}
    </div>
    </div>
  );
};

export default QuizPage;
