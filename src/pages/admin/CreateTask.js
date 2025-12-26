import {
  Button,
  Form,
  Input,
  DatePicker,
  Switch,
  message,
  Radio,
  Checkbox,
  Card,
  Row,
  Col,
} from "antd";
import api from "../../api/axiosClient";
import "./CreateTask.css";

const categoryOptions = [
  "Measurement",
  "Addition & Subtraction",
  "Sorting",
  "Sudoku",
  "Logical Questions",
  "Puzzles",
  "Multiplication",
  "Money",
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
      const { title, description, level, categories, selectedLevel, date, active } =
        values;

      const payload = {
        title,
        description,
        date: date.format("YYYY-MM-DD"),
        active,
        categories: categories.map((cat) => ({
          name: cat,
          levels: selectedLevel.map((lvl) => ({
            level,
            selectedLevel: lvl,
          })),
        })),
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
              <Form.Item name="title" label="Title" required>
                <Input placeholder="Enter task title" />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={3} placeholder="Task description" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="level" label="Level" required>
                <Radio.Group className="radio-group">
                  <Radio value="kindergarden">Kindergarden</Radio>
                  <Radio value="primary">Primary</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="date" label="Date" required>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item name="categories" label="Categories" required>
                <Checkbox.Group className="checkbox-grid">
                  {categoryOptions.map((cat) => (
                    <Checkbox key={cat} value={cat}>
                      {cat}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            </Col>

            <Col xs={24}>
              <Form.Item name="selectedLevel" label="Selected Levels" required>
                <Checkbox.Group options={selectedLevelOptions} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item
                name="active"
                label="Active"
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>
            </Col>

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

export default CreateTask;
