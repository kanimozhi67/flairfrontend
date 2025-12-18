import React, { useState, useEffect, useRef } from "react";
import { message } from "antd";
import { useWindowSize } from "react-use";
import { useParams, useOutletContext } from "react-router-dom";

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

const QuizPage = ({ user, setUser }) => {
   const [searchParams] = useSearchParams();
  const level = searchParams.get("level"); // kindergarten | primary
  const { category } = useParams();
  const { width } = useWindowSize();
  const firstInputRef = useRef(null);

  // Attempt to read update function from Layout's Outlet context.
  const outletCtx = useOutletContext?.() || {};
  const updateTodayScore =
    outletCtx?.updateTodayScore || outletCtx?.fetchTodayScore || (() => {});

     // const [level, setLevel] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
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
  background: "linear-gradient(135deg, #ffe680, #ffb3b3)",
  display: "flex",
  justifyContent: "center", // center horizontally
  alignItems: "center",     // center vertically
  overflowX: "hidden",
  boxSizing: "border-box",
};

const innerStyle = {
  display: "flex",
  flexDirection: width < 768 ? "column" : "row", // responsive stacking
  gap: 20,
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100%",
  maxWidth: 1200,
  margin: "0 auto",
};

const quizCardStyle = {
  width: width < 768 ? "90%" : "580px", // responsive width
  flex: "0 0 auto",                     // prevent stretching
  margin: width < 768 ? "20px 0" : "0 20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)", // optional styling
};

  const allStickers = [
    "🍰",
    "🍫",
    "🦅",
    "🤖",
    "🦄",
    "🎁",
    "🎈",
    "🐶",
    "🚀",
    "⭐",
    "🌈",
    "🐱",
    "🦊",
    "🐵",
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
    "Nice work! Take things one step at a time. Progress is still progress.",
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

  console.log(`level: ${level}`)
   const feedmsg = (score) =>{
    let len = questions.length;


    
        if(category==="sudoku" ){
  if(level=== "primary"){if(selectedLevel ===1) len=15;
       else if(selectedLevel ===2) len=20;
        else len=25;
          console.log(`score: ${score} and questions.length: ${len}`)
          console.log(score === len)}
  else{
     if(selectedLevel ===1) len=5;
       else if(selectedLevel ===2) len=6;
        else len=7;
          console.log(`score: ${score} and questions.length: ${len}`)
          console.log(score === len)
        }}
         if (category === "puzzles" ){
            len=3;
          console.log(`score: ${score} and questions.length: ${len}`)
          console.log(score === len)
        }
         if (category === "logic" ){
            len=3;
          console.log(`score: ${score} and questions.length: ${len}`)
          console.log(score === len)
        }


        const feedback =
          score === len
            ? perfectScoreAdviceList[
                Math.floor(Math.random() * perfectScoreAdviceList.length)
              ]
            : score >= 2
            ? adviceList[Math.floor(Math.random() * adviceList.length)]
            : guideList;
console.log(score)
        setFeedbackMessage(`🎉 You scored ${score} points! ${feedback}`);
        //   setFeedbackMessage(score === questions.length ? "🎉 Perfect! All correct!" : "Keep practicing!");
        if (score === len) setShowGift(true);
        else setShowNoGift(true);
      }


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
        console.log(`sorting category`);
        if (selectedLevel === 1) res = await api.get("/quiz/sort");
        else if (selectedLevel === 2) res = await api.get("/quiz/sortlevel2");
        else res = await api.get("/quiz/sortlevel3");
      } else if (category === "multiplication") {
        console.log(`mul category`);
        if (selectedLevel === 1) res = await api.get("/quiz/mul");
        else if (selectedLevel === 2) res = await api.get("/quiz/mullevel2");
        else res = await api.get("/quiz/mullevel3");
        console.log(`mul : ${res.data}`);
      } else if (category === "math") {
         console.log(`add sub category`);
         if(level === "primary"){
              if (selectedLevel === 1) res = await api.get("/quiz/mathp");
        else if (selectedLevel === 2) res = await api.get("/quiz/mathp");
        else res = await api.get("/quiz/mathplevel3");
              setQuestions(res.data.questions || []);
      setAnswers({});}
      else
       {
        if (selectedLevel === 1) res = await api.get("/quiz/math");
        else if (selectedLevel === 2) res = await api.get("/quiz/math");
        else res = await api.get("/quiz/mathlevel3");
        console.log(`addsub : ${res.data}`);
}
      }else if (category === "sudoku") {
        console.log(`sudoku category`);
         res = await api.get("/quiz/sudoku");
      setQuestions(res.data.questions || []);
      setPuzzleId(res.data.puzzleId); // Store puzzleId
      setAnswers({});
        //else if (selectedLevel === 2) res = await api.get("/quiz/sudokulevel2");
       // else res = await api.get("/quiz/sudokulevel3");
        console.log(`sudoku : ${res.data}`);
      } else {
        if(level === "primary"){
            res = await api.get(`/quiz/mathp?level=${selectedLevel}`);
              setQuestions(res.data.questions || []);
      setAnswers({});
        }else{
        res = await api.get(`/quiz/math?level=${selectedLevel}`);
          setQuestions(res.data.questions || []);
      setAnswers({});
      }}
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

  // Helper: send points to backend and update UI
  const addPointsToBackend = async (points) => {
    if (!user || !user._id) return;  
      try {
      const res = await api.post("/quiz/progress/addpoints", { points });
      const total = res?.data?.points ?? res?.data?.total ?? null;

      // Prefer React callback first, but still dispatch as fallback
      try {
        await updateTodayScore();
      } catch (e) {
        // ignore
      }
      window.dispatchEvent(new Event("scoreUpdated"));
       feedmsg(points);
      return total;
      
    } catch (err) {
      console.error("addPointsToBackend error:", err);
      message.error("Failed to save points. Try again.");
      return null;
    }
  };

  // Submit quiz and handle results
  const submitQuiz = async () => {
    if (!questions || questions.length === 0) return;
console.log("submitquiz")
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

   const      res = await api.post("/quiz/checksort", {
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
    
    const    res = await api.post("/quiz/check", {
        answers: questions.map((q) => ({ id: q.id, answer: answers[q.id] })),
        
      }
    );
     
   
  
  console.log("submitquiz")
console.log("ANSWERS:", answers);
console.log("QUESTIONS:", questions.map(q => q.id));
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

      giftmessage(score);
    } 
  

  const giftmessage =(score) =>{
    const feedback =
        score === questions.length
          ? perfectScoreAdviceList[
              Math.floor(Math.random() * perfectScoreAdviceList.length)
            ]
          : score >= 2
          ? adviceList[Math.floor(Math.random() * adviceList.length)]
          : guideList;

      setFeedbackMessage(`🎉 You scored ${score} points! ${feedback}`);
      if (score === questions.length) setShowGift(true);
      else setShowNoGift(true);
  }
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
      />
    );
  }

  return (
    <div style={containerStyle}>
      <div style={innerStyle}>



        <div style={quizCardStyle}>
          {category === "sorting" ? (
            <SortingQuizCard

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
/>): category === "puzzles" ? (
<div style={{ fontSize :"28px" , fontWeight: "bold"}} >
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

          ): category === "logic" ? (

<Logics 
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
      )  }
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
      />

      <FlyingSticker
        flyData={flyData}
        setShowResultModal={setShowResultModal}
      />
      {/* <Basket basket={basket} /> */}
    </div>
  );
}

export default QuizPage;
