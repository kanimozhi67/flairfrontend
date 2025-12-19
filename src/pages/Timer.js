import React from "react";
import { Card, Row, Col, Typography } from "antd";

const { Title } = Typography;

const data = [
  { value: 33, color: "#ff7a00" }, // orange
  { value: 42, color: "#7ac943" }, // green
  { value: 51, color: "#22a6b3" }, // teal
  { value: 60, color: "#6c3483" }, // purple
  { value: "❔", color: "#e53935" } // missing
];

const size = 220;
const strokeWidth = 45;
const radius = (size - strokeWidth) / 2;
const center = size / 2;
const sliceAngle = 360 / data.length;
const circumference = 2 * Math.PI * radius;
const sliceLength = circumference / data.length;

export default function PuzzleWheel() {
  let dashOffset = 0;

  return (
    <Card
      style={{ border: "none", boxShadow: "none" }}
      styles={{ body: { padding: 0 } }}
    >
      <Row align="middle" gutter={32}>
        <Col>
          {/* Rotate SVG once */}
          <svg
            width={size}
            height={size}
            style={{ transform: "rotate(-3deg)" }}
          >
            {data.map((item, index) => {
              const startAngle = index * sliceAngle;
              const midAngle = startAngle + sliceAngle / 2;
              const rad = (midAngle * Math.PI) / 180;

              // text position (middle of slice)
              const textRadius = radius;
              const x = center + textRadius * Math.cos(rad);
              const y = center + textRadius * Math.sin(rad);

              const currentOffset = dashOffset;
              dashOffset -= sliceLength;

              return (
                <g key={index}>
                  {/* Slice */}
                  <circle
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={item.color}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${sliceLength} ${circumference}`}
                    strokeDashoffset={currentOffset}
                  />

                  {/* Value */}
                  {item.value !== null && (
                    <text
                      x={x}
                      y={y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize="18"
                      fontWeight="bold"
                      fill="#000"
                      style={{  transformOrigin: "center",zIndex:5 }}

                    >
                      {item.value}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </Col>

        <Col>
          <Title level={3}>
            What comes<br />next?
          </Title>
        </Col>
      </Row>
    </Card>
  );
}
