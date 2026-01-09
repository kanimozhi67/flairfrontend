export default function SvgClock({ hour, minute }) {
  const hourAngle = (hour % 12) * 30 + minute * 0.5;
  const minuteAngle = minute * 6;

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r="95" fill="#fff" stroke="#520ad8ff" strokeWidth="4" />

      {/* Numbers */}
      <g fontSize="16" fontWeight="bold" fontFamily="Arial" fill="#f04a09ff" textAnchor="middle" dominantBaseline="middle">
        <text x="100" y="25">12</text>
        <text x="175" y="100">3</text>
        <text x="100" y="175">6</text>
        <text x="25" y="100">9</text>

        <text x="145" y="45">1</text>
        <text x="165" y="70">2</text>
        <text x="165" y="130">4</text>
        <text x="145" y="155">5</text>
        <text x="55" y="155">7</text>
        <text x="35" y="130">8</text>
        <text x="35" y="70">10</text>
        <text x="55" y="45">11</text>
      </g>

      {/* Hour hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="60"
        stroke="#000"
        strokeWidth="6"
        transform={`rotate(${hourAngle} 100 100)`}
      />

      {/* Minute hand */}
      <line
        x1="100"
        y1="100"
        x2="100"
        y2="40"
        stroke="#000"
        strokeWidth="4"
        transform={`rotate(${minuteAngle} 100 100)`}
      />

      <circle cx="100" cy="100" r="4" fill="#3b0ce7ff" />
    </svg>
  );
}
