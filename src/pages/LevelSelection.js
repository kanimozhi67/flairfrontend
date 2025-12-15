// import { Card, Button, InputNumber, Spin, Modal, message } from "antd";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";




// const LevelSelection = ({ onSelectLevel }) => {
//   const { width, height } = useWindowSize();
//   const motivationList = ["Sharp-witted","Smart","Bright","Awesome","Amazing","Brilliant","Fantastic"];
  
//   return (
//     <div style={{
//       margin: -10, display: "flex", flexDirection: "column",
//       alignItems: "center", justifyContent: "center", minHeight: "100vh",
//       background: "linear-gradient(135deg, #ffd54f, #ff7043)", padding: 20, position: "relative"
//     }}>
//       <Confetti width={width} height={height} numberOfPieces={100} recycle={true} gravity={0.2} />
//       <h1 style={{ fontSize: 48, fontWeight: "bold", color: "#fff", textShadow: "3px 3px 0px #ff6b00", marginBottom: 40 }}>🏆 Select Level</h1>
//       <div style={{ display: "flex", gap: 30 }}>
//         {[1,2,3].map(level => (
//           <Button key={level} type="primary" size="large"
//             style={{ fontSize: 28, padding: "20px 40px", borderRadius: 20,
//               fontWeight: "bold", background: "linear-gradient(135deg, #ff9d2f, #ff6126)", color: "#fff",
//               boxShadow: "0 6px 15px rgba(0,0,0,0.2)"
//             }}
//             onClick={() => onSelectLevel(level, motivationList[Math.floor(Math.random()*motivationList.length)])}
//           >
//             Level {level}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default LevelSelection
import { Button } from "antd";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const LevelSelection = ({ onSelectLevel }) => {
  const { width, height } = useWindowSize();
  const motivationList = ["Sharp-witted","Smart","Bright","Awesome","Amazing","Brilliant","Fantastic"];
  
  return (
    <div style={{
      margin: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #ffd54f, #ff7043)",
      padding: "20px",
      position: "relative",
      boxSizing: "border-box",
    }}>
      <Confetti width={width} height={height} numberOfPieces={100} recycle={true} gravity={0.2} />
      
      <h1 style={{
        fontSize: "clamp(2rem, 6vw, 4rem)",
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
        textShadow: "3px 3px 0px #ff6b00",
        marginBottom: "40px",
      }}>
        🏆 Select Level
      </h1>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        justifyContent: "center",
      }}>
        {[1, 2, 3].map(level => (
          <Button
            key={level}
            type="primary"
            size="large"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.75rem)",
              padding: "15px 30px",
              borderRadius: "20px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #ff9d2f, #ff6126)",
              color: "#fff",
              boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
              flex: "1 1 150px",
              minWidth: "150px",
              maxWidth: "250px",
              textAlign: "center",
            }}
            onClick={() => onSelectLevel(level, motivationList[Math.floor(Math.random()*motivationList.length)])}
          >
            Level {level}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelection;
