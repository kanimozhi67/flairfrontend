import {
  Button,
  Form,
  Input,
  DatePicker,
  Switch,
  message,
  Radio,
  Card,
  Row,
  Col,
} from "antd";
import api from "../../api/axiosClient";
import "../admin/CreateTask.css";

const categoryOptions = [
  "Addition & Subtraction",
  "Sorting",
  "Multiplication",
  "Logical Questions",
  "Sudoku",
  "Puzzles",
  "Division",
  "Money",
  "Measurement",
  "Shapes",
  "Time",
  "Fraction",
];

const selectedLevelOptions = [
  { label: "Level 1", value: 1 },
  { label: "Level 2", value: 2 },
  { label: "Level 3", value: 3 },
];

const TCreateTask = ({user}) => {
  //    console.log(`user: ${JSON.stringify(user)}`)
  // console.log(`user.school: ${JSON.stringify(user.school)}`)
  const onFinish = async (values) => {
    try {
      const {
        title,
        description,
        level,
        category,
        selectedLevel,
        date,
        active,
     
      } = values;

      const payload = {
      school: user.school,
        title,
        description,
        level, // kindergarten | primary
        category,
        selectedLevel,
           className: user.className,
        section: user.section,
        date: date.format("YYYY-MM-DD"),
        active,
      };
      console.log(`user.school in: ${JSON.stringify(user.school)}`)
      await api.post("/admin/screatetask", payload);
      message.success("Task created and assigned successfully");
    } catch (err) {
      console.error(err);
      message.error(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="create-task-container">
      <Card className="create-task-card" title="Create New Task">
        <Form layout="vertical" onFinish={onFinish} initialValues={{ active: true }}>
          <Row gutter={[16, 16]}>

            {/* TITLE */}
            <Col xs={24}>
              <Form.Item
                name="title"
                label="TITLE"
                rules={[{ required: true, message: "Please enter task title" }]}
              >
                <Input placeholder="Enter task title" />
              </Form.Item>
            </Col>

            {/* DESCRIPTION */}
            <Col xs={24}>
              <Form.Item name="description" label="DESCRIPTION">
                <Input.TextArea rows={3} placeholder="Optional task description" />
              </Form.Item>
            </Col>

            {/* LEVEL */}
            <Col xs={24} md={12}>
              <Form.Item
                name="level"
                label="LEVEL"
                rules={[{ required: true, message: "Please select a level" }]}
              >
                <Radio.Group>
                  <Radio value="kindergarten">Kindergarten</Radio>
                  <Radio value="primary">Primary</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* DATE */}
            <Col xs={24} md={12}>
              <Form.Item
                name="date"
                label="DATE"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>

            {/* CLASS NAME */}
            {/* <Col xs={24} md={12}>
              <Form.Item
                name="className"
                label="CLASS NAME"
                rules={[{ required: true, message: "Please enter class name" }]}
              >
                <Input placeholder="e.g. Class 1" />
              </Form.Item>
            </Col>

            {/* SECTION */}
            {/* <Col xs={24} md={12}>
              <Form.Item
                name="section"
                label="SECTION"
                rules={[{ required: true, message: "Please enter section" }]}
              >
                <Input placeholder="e.g. A" />
              </Form.Item>
            </Col>  */}

            {/* CATEGORY */}
            <Col xs={24}>
              <Form.Item
                name="category"
                label="CATEGORY"
                rules={[{ required: true, message: "Please select a category" }]}
              >
                <Radio.Group className="checkbox-grid">
                  {categoryOptions.map((cat) => (
                    <Radio key={cat} value={cat}>
                      {cat}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            </Col>

            {/* SELECTED LEVEL */}
            <Col xs={24}>
              <Form.Item
                name="selectedLevel"
                label="SELECTED LEVEL"
                rules={[{ required: true, message: "Please select difficulty level" }]}
              >
                <Radio.Group options={selectedLevelOptions} />
              </Form.Item>
            </Col>

            {/* ACTIVE */}
            <Col xs={24} md={12}>
              <Form.Item
                name="active"
                label="ACTIVE"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>

            {/* SUBMIT */}
            <Col xs={24}>
              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                className="submit-btn"
              >
                Create Task
              </Button>
            </Col>

          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default TCreateTask;
