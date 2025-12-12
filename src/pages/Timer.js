import React, { useState, useEffect } from "react";
import { Typography } from "antd";

const { Text } = Typography;

const Timer = ({timeLeft,setTimeLeft}) => {
 

  useEffect(() => {
    // Start the timer automatically
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer); // stop when it reaches 0
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <Text style={{ fontSize: "24px" }}>{timeLeft}s</Text>
    </div>
  );
};

export default Timer;
