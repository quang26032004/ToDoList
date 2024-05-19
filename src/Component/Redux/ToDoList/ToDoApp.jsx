import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTodoThunk,
  fetchTodos,
  setTodoDetail,
} from "../../Store/ToDoList";
import { useEffect } from "react";
import { Button, Flex, Select, Tag } from "antd";
import { Table } from "antd";
import { Popconfirm } from "antd";
import ToDoAdd from "./ToDoAdd";
import "./ToDo.css";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const ToDoApp = () => {
  const [filterValue, setFilterValue] = useState(null);
  const dispatch = useDispatch();
  const { todos, status } = useSelector((store) => store.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const filteredTodos =
    filterValue !== null
      ? todos.filter((todo) => todo.done === filterValue)
      : todos;

  const renderCompleteStatus = (completed) => {
    const color = completed ? "success" : "processing";
    const icon = completed ? <CheckCircleOutlined /> : <SyncOutlined spin />;
    const label = completed ? "Completed" : "Not completed";
    return (
      <Tag color={color} icon={icon}>
        {label}
      </Tag>
    );
  };

  return (
    <div className="todo-app">
      <h1>ToDoApp</h1>
      <ToDoAdd />
      <Select
        defaultValue="All"
        style={{ width: 120 }}
        onChange={handleFilterChange}
      >
        <Option value={null}>All</Option>
        <Option value={true}>Complete</Option>
        <Option value={false}>Not Complete</Option>
      </Select>
      <Table dataSource={filteredTodos} rowKey="id" loading={status === "idle"}>
        <Table.Column title="Task" dataIndex="description" />
        <Table.Column
          title="Completed"
          dataIndex="done"
          width={100}
          render={renderCompleteStatus}
        />
        <Table.Column
          title="Actions"
          width={"25%"}
          render={(record) => (
            <Flex gap="small" wrap>
              <Button
                type="primary"
                onClick={() => dispatch(setTodoDetail(record))}
                icon={<EditOutlined />}
              >
                Edit
              </Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn xoá ToDo này?"
                onConfirm={() => dispatch(deleteTodoThunk(record.id))}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Flex>
          )}
        />
      </Table>
    </div>
  );
};

export default ToDoApp;
