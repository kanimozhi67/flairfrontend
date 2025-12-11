import React, { useEffect ,useRef} from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const NoGiftBox = ({
 
  speakLine,
  showNoGift,
  setShowNoGift,
  setShowResultModal,
}) => {
  const { width, height } = useWindowSize();

  // Speak once when gift shows
 const hasSpoken = useRef(false);
useEffect(() => {
  if (showNoGift && speakLine && !hasSpoken.current) {
    speakLine("Sorry! No gift. You can do it. Try next time!");
    hasSpoken.current = true;
  }
}, [showNoGift, speakLine]);


  return (
    <>
      {showNoGift && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            cursor: "pointer",
            zIndex: 9999,
            animation: "popGift 0.5s ease-out",
            background: "white",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
          }}
        >
          <div style={{ fontSize: 150 }}>❌</div>
          <p
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1f1d1bff",
              padding: 40,
            }}
          > You can do it.
            Try Next Time!
          </p>
          <button
            onClick={() => {
              
              setShowNoGift(false);
              setShowResultModal(true);
            }}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              borderRadius: 8,
              border: "none",
              backgroundColor: "#ff6b00",
              color: "white",
              cursor: "pointer",
            }}
          >
            Close
          </button>

          <Confetti
            width={width}
            height={height}
            numberOfPieces={150}
            recycle={false}
            gravity={0.3}
            run={showNoGift}
          />
        </div>
      )}
    </>
  );
};

export default NoGiftBox;
