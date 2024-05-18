import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../../Store/ToDoList";
import { useEffect } from "react";
import { Button, Flex, Select } from "antd";
import { Checkbox } from "antd";
import { Table } from "antd";
import { Popconfirm } from "antd";
import ToDoAdd from "./ToDoAdd";
import "./ToDo.css";


const { Option } = Select;

const ToDoApp = () => {
  const [filterValue, setFilterValue] = useState(null);
  const dispatch = useDispatch();
  const todos = useSelector((store) => store.todos.todos);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:3000/todoList/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(fetchTodos());
    }
  };

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const filteredTodos = filterValue
    ? todos.filter((todo) => todo.done === (filterValue === "Complete"))
    : todos;

  return (
    <div className="todo-app">
      <h1>ToDoApp</h1>
      <ToDoAdd />
      <Select
        defaultValue="All"
        style={{ width: 120 }}
        onChange={handleFilterChange}
      >
        <Option value="All">All</Option>
        <Option value="Complete">Complete</Option>
        <Option value="Not Complete">Not Complete</Option>
      </Select>
      <Table dataSource={filteredTodos} rowKey="id">
        <Table.Column title="Task" dataIndex="description" />
        <Table.Column
          title="Completed"
          dataIndex="done"
          render={(done) => <Checkbox checked={done} />}
        />
        <Table.Column
          title="Actions"
          render={() => (
            <Flex gap="small" wrap>
              <Button type="primary">Edit</Button>
              <Popconfirm
                title="Bạn có chắc chắn muốn xoá ToDo này?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
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
