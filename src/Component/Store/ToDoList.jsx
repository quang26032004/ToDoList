import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BASE_URL = "http://localhost:3000/todoList/";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return data;
});

export const createTodoThunk = createAsyncThunk(
  "createTodo",
  async (body, thunkAPI) => {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (response.ok) {
      thunkAPI.dispatch(fetchTodos());
    }
  }
);

export const deleteTodoThunk = createAsyncThunk(
  "deleteTodo",
  async (todoId, thunkAPI) => {
    console.log("runn");
    const response = await fetch(`${BASE_URL}${todoId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      thunkAPI.dispatch(fetchTodos());
    }
  }
);

export const updateToDoThunk = createAsyncThunk(
  "updateTodo",
  async (newTodo, thunkAPI) => {
    const { todoDetail } = thunkAPI.getState().todos;
    const response = await fetch(`${BASE_URL}${todoDetail.id}`, {
      method: "PUT",
      body: JSON.stringify(newTodo),
    });
    if (response.ok) {
      thunkAPI.dispatch(fetchTodos());
      thunkAPI.dispatch(setTodoDetail({}));
    }
  }
);

const initialState = {
  todos: [],
  status: "idle",
  todoDetail: {},
};

const ToDoList = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodoDetail: (state, action) => {
      state.todoDetail = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setTodoDetail } = ToDoList.actions;

export default ToDoList.reducer;
