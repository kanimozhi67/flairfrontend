import React, { useEffect } from "react";
import { Modal, Button } from "antd";
import Confetti from "react-confetti";

const ResultModal = ({
  visible,
  score,
  feedback,
  onClose,
  onClose2,
  speakLine,
}) => {
  // Speak when modal opens
  useEffect(() => {
    if (visible && speakLine) {
      speakLine(`Hurray! You scored ${score} points! ${feedback}`);
    }
  }, [visible, speakLine, score, feedback]);

  return (
    <Modal open={visible} footer={null} centered onCancel={onClose} width={500}>
      <Confetti
        width={500}
        height={350}
        numberOfPieces={150}
        recycle={false}
        gravity={0.3}
        run={visible}
      />
      <div style={{ textAlign: "center", padding: 10 }}>
        <h2 style={{ fontSize: 32, marginBottom: 10 , color:"orange"}}>
          🎉 Your Score Box
        </h2>
        <div style={{ marginBottom: 20 }}>
          {Array.from({ length: score }).map((_, idx) => (
            <span
              key={idx}
              style={{ fontSize: 40, color: "#FFD700", marginRight: 5 }}
            >
              ⭐
            </span>
          ))}
        </div>
        <p style={{ fontSize: 22, fontWeight: "bold" }}>{feedback}</p>

        {/* Conditionally render button if score is 5 */}
        {score === 5 && (
          <Button
            type="primary"
            block
            size="large"
            style={{ marginTop: 20 }}
            onClick={onClose2}
          >
            🔄 Play Again
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default ResultModal;
