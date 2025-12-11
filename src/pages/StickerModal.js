import { Modal } from "antd";
import { useEffect } from "react";

const StickerModal = ({ visible, stickers, onStickerClick,  onCancel }) => {
  // Speak only when modal opens
  // useEffect(() => {
  //   if (visible && speakLine) {
  //     speakLine("Collect your favourite sticker");
      
 
  //   }
  // }, [visible, speakLine]);

  return (
    <Modal
      open={visible}
      footer={null}
      centered
      onCancel={onCancel}
      width={400}
      bodyStyle={{
        backgroundColor: "#fff9c4",
        borderRadius: 16,
        textAlign: "center",
        padding: "30px 20px",
      }}
    >
      <h2 style={{ marginBottom: 20, fontSize: 28 }}>🎉 Collect a Sticker!</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 12,
          flexWrap: "wrap",
          fontSize: 60,
        }}
      >
        {stickers.map((emoji, idx) => (
          <span
            key={emoji + "-" + idx}
            style={{ cursor: "pointer", userSelect: "none" }}
            onClick={(e) => onStickerClick(emoji, e)}
          >
            {emoji}
          </span>
        ))}
      </div>
    </Modal>
  );
};

export default StickerModal;
