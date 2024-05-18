import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Input,
  Checkbox,
  Button,
  ConfigProvider,
  Space,
  notification,
} from "antd";
import { TinyColor } from "@ctrl/tinycolor";

const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const ToDoAdd = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const addTask = () => {
    setInput("");
    notification.success({
      message: "Task Added",
      description: "Your new task has been added successfully.",
      placement: "bottomRight",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        flexDirection: "column",
      }}
    >
      <Input
        style={{ width: 400 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a new task"
      />
      <Checkbox>Done</Checkbox>
      <Space>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: `linear-gradient(135deg, ${colors1.join(", ")})`,
                colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(
                  colors1
                ).join(", ")})`,
                colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(
                  colors1
                ).join(", ")})`,
                lineWidth: 0,
              },
            },
          }}
        >
          <Button type="primary" size="large" onClick={addTask}>
            Add New Task
          </Button>
        </ConfigProvider>
      </Space>
    </div>
  );
};

export default ToDoAdd;
