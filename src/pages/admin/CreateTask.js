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
import "./CreateTask.css";

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

const CreateTask = () => {
  const onFinish = async (values) => {
    try {
      const { title, description, level, categories, selectedLevel, date, active } = values;

      const payload = {
        title,
        description,
        level,                    // "kindergarden" or "primary"
        date: date.format("YYYY-MM-DD"),
        active,
        category: categories,      // single selected category
        selectedLevel,             // single selected level
      };

      await api.post("/admin/createtask", payload);
      message.success("Task created successfully");
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <div className="create-task-container">
      <Card className="create-task-card" title="Create New Task">
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="title"
                label="TITLE"
                rules={[{ required: true, message: "Please enter task title" }]}
              >
                <Input placeholder="Enter task title" />
              </Form.Item>
            </Col>

            {/* <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={3} placeholder="Task description" />
              </Form.Item>
            </Col> */}

            <Col xs={24} md={12}>
              <Form.Item
                name="level"
                label="LEVEL"
                rules={[{ required: true, message: "Please select a level" }]}
              >
                <Radio.Group className="radio-group">
                  <Radio value="kindergarten">Kindergarten</Radio>
                  <Radio value="primary">Primary</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="date"
                label="DATE"
                rules={[{ required: true, message: "Please select a date" }]}
              >
                <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item
                name="categories"
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

            <Col xs={24}>
              <Form.Item
                name="selectedLevel"
                label="SELECTED LEVEL"
                rules={[{ required: true, message: "Please select a level" }]}
              >
                <Radio.Group options={selectedLevelOptions} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="active"
                label="ACTIVE"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Button type="primary" htmlType="submit" block size="large" className="submit-btn">
                Create Task
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default CreateTask;
