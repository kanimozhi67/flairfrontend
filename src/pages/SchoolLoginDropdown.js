// import React, { useState } from "react";
// import { Button, Popover, Space, Modal } from "antd";
// import { SolutionOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import SchoolLoginPage from "./SchoolLoginPage";

// const SchoolLoginDropdown = ({ setUser }) => {
//   const navigate = useNavigate();
//   const [studentModalOpen, setStudentModalOpen] = useState(false);

//   const popoverContent = (
//     <Space direction="vertical">
//       <Button
//         icon={<SolutionOutlined />}
//         type="text"
//         onClick={() => setStudentModalOpen(true)}
//       >
//         Student Login
//       </Button>
//       <Button
//         icon={<TeamOutlined />}
//         type="text"
//         onClick={() => navigate("/school-teacher-login")}
//       >
//         Teacher Login
//       </Button>
//       <Button
//         icon={<UserOutlined />}
//         type="text"
//         onClick={() => navigate("/school-admin-login")}
//       >
//         School Admin Login
//       </Button>
//     </Space>
//   );


// return (
//   <>
//     <div
//      style={{ display: "flex", gap: 12, alignItems: "center" }}
    
//     >
//       <Popover
//         content={popoverContent}
//         trigger="click"
//         placement="bottomRight"
//         getPopupContainer={(triggerNode) => triggerNode.parentElement}
//       >
//         <Button
//           type="primary"
//          // shape="circle"
//           size="large"
//           style={{ background: "transparent" , border:"1px solid white" }}
//         >
//           🏫 School Login
//         </Button>
//       </Popover>
//     </div>
//     <Modal
//       open={studentModalOpen}
//       footer={null}
//       onCancel={() => setStudentModalOpen(false)}
//       centered
//     >
//       <SchoolLoginPage
//         setUser={setUser} 
//         onSuccess={() => setStudentModalOpen(false)}
//       />
//     </Modal>
//   </>
// );



// };

// export default SchoolLoginDropdown;
import React, { useState } from "react";
import { Button, Popover, Space, Modal } from "antd";
import { SolutionOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SchoolLoginPage from "./SchoolLoginPage";

const SchoolLoginDropdown = ({ setUser }) => {
  const navigate = useNavigate();
  const [studentModalOpen, setStudentModalOpen] = useState(false);

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
        onClick={() => navigate("/school-teacher-login")}
      >
        Teacher Login
      </Button>
      <Button
        icon={<UserOutlined />}
        type="text"
        onClick={() => navigate("/school-admin-login")}
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
    </>
  );
};

export default SchoolLoginDropdown;
