import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, Spin } from "antd";
import api from "../api/axiosClient";

const { Title, Text } = Typography;

const Robot = () => {
  const [question, setQuestion] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);

  const fetchAns = async () => {
    if (!question.trim()) return;

    setLoadingExplanation(true);
    setAiExplanation("");

    try {
      const explainRes = await api.post("/quiz/explain3", {
        question,
      });

      setAiExplanation(explainRes.data.explanation);
    } catch (err) {
      setAiExplanation("Oops 🤖 I couldn’t understand that. Try again!");
    } finally {
      setLoadingExplanation(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        padding: "1rem",
        background: "linear-gradient(135deg, #e977a9, #c725e7)",
          borderRadius: 24,
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 24,
          background:"transparent",
         // boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            //  background: "linear-gradient(135deg, #ffecd2, #f0087c",  
             
            //  background: "linear-gradient(135deg, #ffecd2, #dd08f0",  
          
            //  background: "linear-gradient(135deg, #ffecd2, #b2f008",  
         // background: "linear-gradient(135deg,#ffecd2,#fcb69f)",
        }}
      >
        <Title
          level={2}
          style={{
            textAlign: "center",
            color: "#6b21a8",
            fontWeight: "bold",
          }}
        >
         <span style={{ fontSize: "5.1rem",}}>🤖</span><br></br>  Flair AI Robot
        </Title>

        <Text
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "1.1rem",
            marginBottom: 16,
          }}
        >
          Ask me your doubts!
        </Text>

        <Form onFinish={fetchAns}>
          <Form.Item>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="💭 Ask your doubt here..."
              size="large"
              style={{
                borderRadius: 16,
                fontSize: "1.2rem",
                textAlign: "center",
              }}
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              htmlType="submit"
              size="large"
              loading={loadingExplanation}
              style={{
                borderRadius: 20,
                fontWeight: "bold",
                fontSize: "1.1rem",
                background:
                  "linear-gradient(135deg, #34d399, #22c55e)",
                color: "white",
                border: "none",
                padding: "0 2rem",
              }}
            >
              🚀 Ask Robot
            </Button>
          </Form.Item>
        </Form>

        {loadingExplanation && (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            <Spin size="large" />
            <Text block style={{ marginTop: 10 }}>
              🤖 Thinking...
            </Text>
          </div>
        )}

        {aiExplanation && !loadingExplanation && (
          <div
            style={{
              marginTop: 20,
              padding: 16,
              borderRadius: 16,
              background: "#ecfeff",
              border: "3px dashed #22d3ee",
            }}
          >
            <Text strong style={{ fontSize: "1.1rem" }}>
              🤖 Robot Says:
            </Text>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                fontSize: "1rem",
                marginTop: 8,
                fontFamily: "inherit",
              }}
            >
              {aiExplanation}
            </pre>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Robot;
