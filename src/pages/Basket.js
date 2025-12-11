import React, { useState, useEffect } from "react";

const Basket = ({ basket }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check initial width
    const handleResize = () => {
      setIsVisible(window.innerWidth > 1024); // hide for mobile ≤480px
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isVisible) return null; // hide basket on mobile

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 160,
        minHeight: 100,
        border: "2px solid black",
        borderRadius: 16,
        backgroundColor: "beige",
        boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
        padding: 20,
        zIndex: 11000,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ textAlign: "center", fontSize: 80 }}>
        👝
        <hr style={{ border: "2px solid black", margin: "4px 0" }} />
      </div>
      <div
        style={{
          marginTop: 6,
          display: "flex",
          flexWrap: "wrap",
          gap: 6,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 40,
        }}
      >
        {basket.map((emoji, idx) => (
          <span key={emoji + "-" + idx} style={{ fontSize: 28 }}>
            {emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Basket;

// const Basket = ({ basket }) => (
//   <div style={{
//     position: "fixed", bottom: 22, right: 22, width: 160, minHeight: 100, border:"2px solid black",
//   borderRadius: 16, backgroundColor: "beige", boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
//     padding: 20, zIndex: 11000, display: "flex", flexDirection: "column",
//     alignItems: "center", justifyContent: "center"
//   }}>
//     <div style={{ textAlign:"center" ,fontSize: 80 }}>🧺 <hr style={{ border:"2px solid black" }}></hr></div>
//     <div style={{ marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", alignItems: "center", minHeight: 40 }}>
//       {basket.map((emoji, idx) => <span key={emoji + "-" + idx} style={{ fontSize: 28 }}>{emoji}</span>)}
//     </div>
//   </div>
// );
// export default Basket
