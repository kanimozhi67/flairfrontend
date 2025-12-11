



const FlyingSticker = ({ flyData, setShowResultModal }) => {
  if (!flyData) return null;
  return (
    <div style={{ position: "fixed", left: 0, top: 0, zIndex: 12000, pointerEvents: "none" }}>
      <div style={{
        position: "absolute",
        left: flyData.start.x - 25,
        top: flyData.start.y - 25,
        fontSize: 52,
        transition: "all 0.7s ease-in-out",
        transform: `translate(${flyData.target.x - flyData.start.x}px, ${flyData.target.y - flyData.start.y}px) scale(0.6)`
      }}>
        {flyData.emoji}
        setShowResultModal(true)
      </div>
    </div>
  );
};
export default FlyingSticker