
import React, { useState } from "react";
import { Button, Popover, Space, Modal } from "antd";
import { SolutionOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SchoolLoginPage from "./SchoolLoginPage";
import SchoolTeacherLoginPage from "./SchoolTeacherLoginPage";
import SchoolAdminLogin from "./SchoolAdminLogin";

const SchoolLoginDropdown = ({ setUser }) => {
  const navigate = useNavigate();
  const [studentModalOpen, setStudentModalOpen] = useState(false);
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [schoolAdminModalOpen, setSchoolAdminModalOpen] = useState(false);

  const popoverContent = (
    <Space direction="vertical">
      <Button
        icon={<SolutionOutlined />}
        type="text"
        onClick={() => setStudentModalOpen(true)}
      >
        Student Login
      </Button>
      <Button
        icon={<TeamOutlined />}
        type="text"
        onClick={() => setTeacherModalOpen(true)}
      >
        Teacher Login
      </Button>
      <Button
        icon={<UserOutlined />}
        type="text"
        onClick={() => setSchoolAdminModalOpen(true)}
      >
        School Admin Login
      </Button>
    </Space>
  );

  return (
    <>
      <Popover
        content={popoverContent}
        trigger="click"
        placement="bottomRight"
        getPopupContainer={() => document.body} // important: render above all layers
      >
        <Button
          type="primary"
          style={{
            background: "none",
            color: "#fff",
            zIndex: 1100,
            border: "1px solid #fff",
          }}
        >
          🏫 School Login
        </Button>
      </Popover>

      <Modal
        open={studentModalOpen}
        footer={null}
        onCancel={() => setStudentModalOpen(false)}
        centered
      >
        <SchoolLoginPage setUser={setUser} onSuccess={() => setStudentModalOpen(false)} />
      </Modal>
      <Modal
        open={teacherModalOpen}
        footer={null}
        onCancel={() => setTeacherModalOpen(false)}
        centered
      >
        <SchoolTeacherLoginPage setUser={setUser} onSuccess={() => setTeacherModalOpen(false)} />
      </Modal>
      <Modal
        open={schoolAdminModalOpen}
        footer={null}
        onCancel={() => setSchoolAdminModalOpen(false)}
        centered
      >
        <SchoolAdminLogin setUser={setUser} onSuccess={() => setTeacherModalOpen(false)} />
      </Modal>
    </>
  );
};

export default SchoolLoginDropdown;
