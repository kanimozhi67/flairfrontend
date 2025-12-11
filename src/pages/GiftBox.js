import React, { useEffect , useRef } from "react";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const GiftBox = ({ setSelectedStickers, setShowStickerModal, speakLine, showGift, setShowGift, allStickers }) => {
  const { width, height } = useWindowSize();

  // Speak once when gift shows
 

 const hasSpoken = useRef(false);
useEffect(() => {
  if (showGift && speakLine && !hasSpoken.current) {
    speakLine("Congratulations! You won a gift");
    hasSpoken.current = true;
  }
}, [showGift, speakLine]);

  return (
    <>
      {showGift && (
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
          onClick={() => {
            setShowGift(false);
            const randomStickers = allStickers.sort(() => 0.5 - Math.random()).slice(0, 3);
            setSelectedStickers(randomStickers);
            setShowStickerModal(true);
            speakLine("Collect one favourite sticker");
          }}
        >
          <div style={{ fontSize: 150 }}>🎁</div>
          <p style={{ fontSize: 24, fontWeight: "bold", color: "#ff6b00" }}>
            Click to collect your stickers!
          </p>
          <Confetti
            width={width}
            height={height}
            numberOfPieces={150}
            recycle={false}
            gravity={0.3}
            run={showGift}
          />
        </div>
      )}
    </>
  );
};

export default GiftBox;
