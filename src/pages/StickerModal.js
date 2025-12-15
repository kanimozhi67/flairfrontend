import React, { useState } from "react";
import { Modal } from "antd";

const StickerModal = ({ visible, stickers, onStickerClick, onCancel }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = (emoji, e) => {
    if (clicked) return;      // 🚫 block extra taps
    setClicked(true);         // 🔒 lock immediately
    onStickerClick(emoji, e);
  };

  return (
    <Modal
      open={visible}
      footer={null}
      centered
      onCancel={onCancel}
      afterClose={() => setClicked(false)} // 🔄 reset when closed
      width={400}
      bodyStyle={{
        backgroundColor: "#fff9c4",
        borderRadius: 16,
        textAlign: "center",
        padding: "30px 20px",
      }}
    >
      <h2 style={{ marginBottom: 20, fontSize: 28 }}>
        🎉 Collect a Sticker!
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          fontSize: 60,
          pointerEvents: clicked ? "none" : "auto", // 🚫 disable all after click
          opacity: clicked ? 0.6 : 1,
        }}
      >
        {stickers.map((emoji, idx) => (
          <span
            key={`${emoji}-${idx}`}
            style={{
              cursor: clicked ? "not-allowed" : "pointer",
              userSelect: "none",
              transition: "transform 0.15s ease",
            }}
            onClick={(e) => handleClick(emoji, e)}
            onMouseDown={(e) => e.preventDefault()}
          >
            {emoji}
          </span>
        ))}
      </div>
    </Modal>
  );
};

export default StickerModal;



