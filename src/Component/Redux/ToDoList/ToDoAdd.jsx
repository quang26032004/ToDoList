import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Input,
  Checkbox,
  Button,
  ConfigProvider,
  Space,
  notification,
} from "antd";
import { TinyColor } from "@ctrl/tinycolor";
import { createTodoThunk, updateToDoThunk } from "../../Store/ToDoList";
import { PlusCircleOutlined } from "@ant-design/icons";

const colors1 = ["#6253E1", "#04BEFE"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());

const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

const ToDoAdd = () => {
  const [input, setInput] = useState("");
  const [completed, setCompleted] = useState(false);
  const dispatch = useDispatch();
  const todoDetail = useSelector((store) => store.todos.todoDetail);
  const isUpdate = Object.keys(todoDetail).length > 0;

  const addTask = () => {
    if (input) {
      const newTodo = {
        description: input,
        done: isUpdate ? completed : false,
      };

      if (isUpdate) {
        dispatch(updateToDoThunk(newTodo));
      } else {
        dispatch(createTodoThunk(newTodo));
      }

      setInput("");
      setCompleted(false);
      notification.success({
        message: isUpdate ? "Updated the task" : "Task Added",
        description: "Your new task has been added successfully.",
        placement: "bottomRight",
      });
    } else {
      // show loi
      alert("please input your todo");
    }
  };

  useEffect(() => {
    if (isUpdate) {
      setInput(todoDetail.description);
      setCompleted(todoDetail.done);
    }
  }, [isUpdate, todoDetail]);

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
      <Checkbox checked={completed} onChange={(e) => setCompleted(!completed)}>
        Done
      </Checkbox>
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
          <Button
            type="primary"
            size="large"
            onClick={addTask}
            icon={<PlusCircleOutlined />}
          >
            {isUpdate ? "Update the task" : "Add New Task"}
          </Button>
        </ConfigProvider>
      </Space>
    </div>
  );
};

export default ToDoAdd;
