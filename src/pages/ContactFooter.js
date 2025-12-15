import React from "react";
import { Typography, Input, Button, Row, Col, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  FacebookOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ContactFooter = ({scrollToOnline3}) => {
  return (
    <div
      style={{
        backgroundColor: "#001529",
        color: "white",
        padding: "60px 20px",
      }}
    >
      <Row
        gutter={[32, 32]}
        justify="center"
        style={{ maxWidth: 1200, margin: "0 auto" }}
      >
        {/* Contact Info */}
        <Col xs={24} sm={24} md={10} lg={8}>
          <Title level={4} style={{ color: "white" }}>
            Contact Us
          </Title>
          <Space direction="vertical" size="middle">
            <Paragraph style={{ color: "white" }}>
              <EnvironmentOutlined /> Al Rasidhiya2, Ajman, UAE.
            </Paragraph>
            <Paragraph style={{ color: "white" }}>
              <PhoneOutlined /> +971-XX-XXXXXXX
            </Paragraph>
            <Paragraph style={{ color: "white" }}>
              <MailOutlined /> support@flairolympiad.com
            </Paragraph>
            <Space size="middle">
              <a href="#" style={{ color: "white", fontSize: 20 }}>
                <LinkedinOutlined />
              </a>
              <a href="#" style={{ color: "white", fontSize: 20 }}>
                <TwitterOutlined />
              </a>
              <a href="#" style={{ color: "white", fontSize: 20 }}>
                <FacebookOutlined />
              </a>
            </Space>
          </Space>
        </Col>

        {/* Contact Form */}
        <Col xs={24} sm={24} md={14} lg={12}>
          <Title level={4} style={{ color: "white" }}>
            Send Us a Message
          </Title>
          <Space direction="vertical" size="middle" style={{ width: "100%" }}>
            <Input placeholder="Your Name" />
            <Input placeholder="Your Email" />
            <TextArea rows={4} placeholder="Your Message" />
            <Button
              type="primary"
              style={{ backgroundColor: "#1890ff", border: "none", width: "100%" }}
            >
              Send Message
            </Button>
          </Space>
        </Col>
      </Row>

      <Paragraph
        style={{
          textAlign: "center",
          marginTop: 40,
          color: "rgba(255,255,255,0.6)",
          fontSize: 14,
        }}
      >
        © 2025 Flair Olympiad. All rights reserved.
      </Paragraph>
      <button style={{ float:"right", color:"blueviolet", fontWeight:"bold"}} onClick={scrollToOnline3}>GO TO TOP</button>
    </div>
  );
};

export default ContactFooter;
