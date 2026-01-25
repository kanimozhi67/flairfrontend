
// import React, { useState, useEffect, useRef } from "react";
// import { Card, Typography, Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import logo from "../images/fologo.png";
// import olymp1 from "../images/olympiad1.png";
// import olymp2 from "../images/olympiad2.png";
// import olymp3 from "../images/olympiad3.png";
// import olymp4 from "../images/olympiad4.png";
// import olymp5 from "../images/olympiad5.png";
// import olymp6 from "../images/olympiad6.png";
// import olymp7 from "../images/olympiad7.png";
// import olymp8 from "../images/olympiad8.png";
// import olymp9 from "../images/olympiad9.png";
// import olymp10 from "../images/olympiad10.png";
// import olymp11 from "../images/olympiad11.png";
// import olymp12 from "../images/olympiad12.png";
// import ContactFooter from "./ContactFooter";

// const { Title, Text } = Typography;

// /* ================= DATA ================= */

// const olympiadList2 = [
//   { img: olymp8, title: "Flair Robot 🤖", desc: "Explore how things work with AI" },
//   { img: olymp2, title: "Go Ahead with Flair 🎯", desc: "Boost thinking skills" },
//   { img: olymp3, title: "Logic Olympiad 💡", desc: "Step by step explanation" },
// ];

// const olympiadList = [
//   { img: olymp4, title: "Sudoku 🧩", desc: "Boost thinking skills" },
//   { img: olymp9, title: "Number Series", desc: "Know numbers better" },
//   { img: olymp10, title: "Logical Questions", desc: "Think smart & fast" },
//   { img: olymp11, title: "Puzzles", desc: "Sharpen your brain" },
//   { img: olymp12, title: "Reasoning", desc: "Fun challenges" },
//   { img: olymp5, title: "Handling Currency", desc: "Practical knowledge" },
// ];

// const olympiadList3 = [
//   { img: olymp1, title: "Stickers Award", desc: "Win rewards" },
//   { img: olymp6, title: "Games & Scores", desc: "Track progress" },
//   { img: olymp7, title: "LeaderBoard", desc: "Global ranking" },
// ];

// /* ================= STYLES ================= */

// const pageBg = {
//   minHeight: "100vh",
//  // padding: "20px",
//   background: "linear-gradient(135deg, #ad0797, #f50909)",
//  // background: "linear-gradient(135deg, #586ff1, #c02525)",
//   //(135deg,#fde68a,#bfdbfe)",
// };

// const headerStyle = {
//   maxWidth: 1100,
//   margin: "0 auto 30px",
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
// };


// const sectionStyle = (color1, color2) => ({
//   background: `linear-gradient(135deg, ${color1}, ${color2})`,
//   padding: "10px 10px",
//   borderRadius: "32px",
//   margin: "50px auto",
//   maxWidth: 1100,
// });


// const cardStyle = {
//   borderRadius: 24,
//   textAlign: "center",
//   boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
//   transition: "transform 0.3s",
  
// };

// const imageStyle = {
//   width: "100%",
//  height: 400,
//   objectFit: "contain",
//   transition: "transform .6s",
// };

// /* ================= SLIDER ================= */

// const SliderCard2 = ({ list }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % list.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [list.length]);

//   const item = list[index];

//   return (
//     <Card style={cardStyle}>
//       <img key={index} src={item.img} alt="" style={imageStyle} />
//       <Title level={4}>{item.title}</Title>
//       <Text>{item.desc}</Text>
     
//     </Card>
//   );
// };



// const SliderCard = ({ list }) => {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 2) % list.length);
//     }, 4000);

//     return () => clearInterval(timer);
//   }, [list.length]);

//   const first = list[index];
//   const second = list[(index + 1) % list.length];

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: 20,
//        // justifyContent: "center",
//        // flexWrap: "wrap",
//       }}
//     >
//       {[first, second].map((item, i) => (
//         <Card key={i} style={{ ...cardStyle, width: "100%" }}>
//           <img src={item.img} alt="" style={imageStyle} /> <p>{">"}</p>
//           <Title level={4}>{item.title}</Title>
//           <Text>{item.desc}</Text>
//         </Card>
//       ))}
//     </div>
//   );
// };

// /* ================= MAIN ================= */

// export default function OlympiadExplore() {
//   const navigate = useNavigate();
//    const onlineRef3 = useRef(null);
//   const scrollToOnline3 = () => {
//     onlineRef3.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };
//   return (
//     <div style={pageBg}>
//       {/* HEADER */}
//       {/* <div style={headerStyle}> */}

// <div ref={onlineRef3} id="header"
//           style={{
//             display: "flex",
//             flexDirection:  "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             padding: "20px 50px",
//             paddingBottom:0,
//             gap:  0,zIndex: 1100, position: "relative",
//             width: "100%",
//             boxSizing: "border-box",
//           }}
//         >
//           {/* <div */}
//            <div 
//             style={{
//               display: "flex",
//               alignItems: "center",
//               background: "whitesmoke",
//               color: "purple",
//               padding: "6px 12px",
//               borderRadius: 12,
//               fontWeight: "bold",
//               fontSize: 24,
//             }}
//           >
//             <img src={logo} alt="logo" style={{ width: 40, marginRight: 8 }} />
//             FLAIR OLYMPIAD
//           </div>
//   <div>
//              <a href="tel:00971563512691" 
//  style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20,textDecoration:"none"}}
//  >
//   📞 Contact Us</a>&nbsp;&nbsp;&nbsp;
//    <a href="https://wa.me/00971563512691" target="_blank"
//     style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20,textDecoration:"none"}}
//    >
// 💬 Chat on WhatsApp
// </a>
        
//         <Button type="primary" onClick={() => navigate("/")} 
//         style={{color:"white",background:"transparent",border:"1px solid gray",borderRadius:25}}>
//          ⬅️ Back to Home
//         </Button>
//       </div></div>
// <hr></hr><br></br>
//       {/* INTRO */}

// </div><br></br>
//       {/* SECTION 1 */}
//       <div style={sectionStyle("#8b5cf6", "#60a5fa")}>
//         <Title level={3} style={{ color: "#fff" }}>
//          🎉 Smart AI Bot for Guidance
//         </Title>
//         <SliderCard list={olympiadList2} />
//       </div>
//        <Text
//         style={{
//           display: "block",
//           maxWidth: 900,
//           margin: "0 auto",
//           fontSize: 18,
//           color: "#fffcfc",
//           textAlign: "center",
//         }}
//       >
//         <strong style={{ color: "#380320" }}>Flair Olympiad</strong> focuses on
//         concept clarity instead of memorization. Kids build strong fundamentals
//         and gain confidence to face competitive exams happily 😊
//       </Text>
//       {/* SECTION 2 */}
//       <div style={sectionStyle("#fb923c", "#f472b6")}>
//         <Title level={3} style={{ color: "#fff" }}>
//         🚀 Challenging Puzzles ,Fun Math and Riddles
//         </Title>
//         <SliderCard list={olympiadList} />
//       </div>

//       {/* SECTION 3 */}
//       <div style={sectionStyle("#6cb8f7", "#740743")}>
//         <Title level={3} style={{ color: "#fff" }}>
//           🚀 Clear Insights into Accuracy & Speed
//         </Title>
//         <SliderCard2 list={olympiadList3} />
//       </div>


//        <div ><ContactFooter
//        scrollToOnline3={scrollToOnline3}
     
//        /></div>
//     </div>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Card, Typography, Button } from "antd";
import { useNavigate } from "react-router-dom";
import logo from "../images/fologo.png";
import olymp1 from "../images/olympiad1.png";
import olymp2 from "../images/olympiad2.png";
import olymp3 from "../images/olympiad3.png";
import olymp4 from "../images/olympiad4.png";
import olymp5 from "../images/olympiad5.png";
import olymp6 from "../images/olympiad6.png";
import olymp7 from "../images/olympiad7.png";
import olymp8 from "../images/olympiad8.png";
import olymp9 from "../images/olympiad9.png";
import olymp10 from "../images/olympiad10.png";
import olymp11 from "../images/olympiad11.png";
import olymp12 from "../images/olympiad12.png";
import ContactFooter from "./ContactFooter";

const { Title, Text } = Typography;

/* ================= DATA ================= */

const olympiadList2 = [
  { img: olymp8, title: "Flair Robot 🤖", desc: "Explore how things work with AI" },
  { img: olymp2, title: "Go Ahead with Flair 🎯", desc: "Boost thinking skills" },
  { img: olymp3, title: "Logic Olympiad 💡", desc: "Step by step explanation" },
];

const olympiadList = [
  { img: olymp4, title: "Sudoku 🧩", desc: "Boost thinking skills" },
  { img: olymp9, title: "Number Series", desc: "Know numbers better" },
  { img: olymp10, title: "Logical Questions", desc: "Think smart & fast" },
  { img: olymp11, title: "Puzzles", desc: "Sharpen your brain" },
  { img: olymp12, title: "Reasoning", desc: "Fun challenges" },
  { img: olymp5, title: "Handling Currency", desc: "Practical knowledge" },
];

const olympiadList3 = [
  { img: olymp1, title: "Stickers Award", desc: "Win rewards" },
  { img: olymp6, title: "Games & Scores", desc: "Track progress" },
  { img: olymp7, title: "LeaderBoard", desc: "Global ranking" },
];

/* ================= STYLES ================= */

const pageBg = {
  minHeight: "100vh",
  background: "linear-gradient(135deg,#ad0797,#f50909)",
};

const sectionStyle = (c1, c2) => ({
  background: `linear-gradient(135deg,${c1},${c2})`,
  padding: "10px",
  borderRadius: 32,
  margin: "40px auto",
  maxWidth: 1100,
});

const cardStyle = {
  borderRadius: 24,
  textAlign: "center",
  boxShadow: "0 12px 30px rgba(0,0,0,.12)",
};

const imageStyle = {
  width: "100%",
  maxHeight: 400,
  objectFit: "contain",
};

/* ================= SLIDERS ================= */

const SliderCard2 = ({ list }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(v => (v + 1) % list.length), 4000);
    return () => clearInterval(t);
  }, [list.length]);

  const item = list[index];

  return (
    <Card style={cardStyle}>
      <img src={item.img} alt="" style={imageStyle} />
      <Title level={4}>{item.title}</Title>
      <Text>{item.desc}</Text>
    </Card>
  );
};

const SliderCard = ({ list }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex(v => (v + 2) % list.length), 4000);
    return () => clearInterval(t);
  }, [list.length]);

  const first = list[index];
  const second = list[(index + 1) % list.length];

  return (
    <div className="sliderRow">
      {[first, second].map((item, i) => (
        <Card key={i} style={{ ...cardStyle, width: "100%" }}>
          <img src={item.img} alt="" style={imageStyle} />
          <Title level={4}>{item.title}</Title>
          <Text>{item.desc}</Text>
        </Card>
      ))}
    </div>
  );
};

/* ================= MAIN ================= */

export default function OlympiadExplore() {
  const navigate = useNavigate();
  const onlineRef3 = useRef(null);

  return (
    <div style={pageBg}>
      <div ref={onlineRef3} className="headerBar">
        <div 
       // className="logoBox"
        
        style={{
              display: "flex",
             // alignItems: "center",
              background: "whitesmoke",
              color: "purple",
              padding: "6px 12px",
              borderRadius: 12,
              fontWeight: "bold",
              fontSize: 24,
            }}  
        >
          <img src={logo} alt="logo" style={{ width: 40, marginRight: 8 }} />
        <Button style={{textDecoration:"none",border:"none",fontSize: 20,
        color: "purple",background:"transparent",padding:0,}}
        onClick={()=>navigate("/")}
        > FLAIR OLYMPIAD </Button> 
        </div>

        <div
        // className="actions"
         >
          <a href="tel:00971563512691" 
          style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20,textDecoration:"none"}}
          >📞 Contact Us</a> &nbsp;
          <a href="https://wa.me/00971563512691" target="_blank"
          style={{backgroundColor:"wheat",fontWeight:"bold", padding:8,fontSize:16,borderRadius:20,textDecoration:"none"}}
          >💬 Chat on WhatsApp</a>&nbsp;
          <Button type="primary" onClick={() => navigate("/")} 
         
         style={{color:"white",background:"transparent",border:"none",borderRadius:30,padding:8,}}>
          ⬅️ Back to Home
        </Button>
          
        </div>
      </div>
<hr></hr>
      <div style={{ maxWidth: 800, margin: "auto", textAlign: "center" }}>
        <Text style={{ color: "#fff", fontSize: 18 }}>
          Olympiads strengthen basics and build confidence.
        </Text>
       <br></br>
         <Text style={{ fontSize: 18, color: "#fffcfc" }}>
            Olympiads help children strengthen their basics in Mathematics,
           Science, Reasoning, English, and General Knowledge. They improve
          thinking, problem-solving, and confidence from an early age.
        </Text>
      
  <br />

          <Text style={{ fontSize: 18, color: "#fffcfc" }}>
            Our{" "}
            <strong style={{ color: "#7e1f07" }}>AI-powered learning bots</strong>{" "}
            act like friendly tutors 🤖. They explain mistakes patiently and guide
            kids step-by-step until concepts become crystal clear.
        </Text>
      </div>

      <div style={sectionStyle("#8b5cf6", "#60a5fa")}>
        <Title style={{ color: "#fff" }} level={3}> 🚀 Smart AI Bot for Guidance</Title>
        <SliderCard list={olympiadList2} />
      </div>

      <div style={sectionStyle("#fb923c", "#f472b6")}>
        <Title style={{ color: "#fff" }} level={3}>  🚀 Challenging Puzzles ,Fun Math and Riddles</Title>
        <SliderCard list={olympiadList} />
      </div>
       <Text
        style={{
          display: "block",
          maxWidth: 900,
          margin: "0 auto",
          fontSize: 18,
          color: "#fffcfc",
          textAlign: "center",
        }}
      >
        <strong style={{ color: "#380320" }}>Flair Olympiad</strong> focuses on
        concept clarity instead of memorization. Kids build strong fundamentals
        and gain confidence to face competitive exams happily 😊
      </Text>
      <div style={sectionStyle("#6cb8f7", "#740743")}>
        <Title style={{ color: "#fff" }} level={3}> 🚀 Clear Insights into Accuracy & Speed</Title>
        <SliderCard2 list={olympiadList3} />
      </div>

      <ContactFooter />

      {/* RESPONSIVE CSS */}
      <style>{`
        .sliderRow{
          display:flex;
          gap:20px;
        }

        .headerBar{
          display:flex;
          justify-content:space-between;
         padding-top:20px;
         padding-bottom:5px;
          flex-wrap:wrap;
        }

        .logoBox{
          display:flex;
          align-items:center;
          background:whitesmoke;
          color:purple
          padding:6px 19px;
          border-radius:12px;
          font-weight:bold;
          font-size:24;
        }

        .logoBox img{
          width:40px;
          margin-right:8px;
        }

        .actions{
          display:flex;
          gap:10px;
          flex-wrap:wrap;
        }

        @media(max-width:768px){
          .sliderRow{
            flex-direction:column;
          }

          .headerBar{
            justify-content:center;
            text-align:center;
            gap:12px;
          }

          .actions{
            justify-content:center;
          }
        }
      `}</style>
    </div>
  );
}
