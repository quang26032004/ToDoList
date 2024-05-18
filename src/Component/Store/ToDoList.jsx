import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const fetchTodos = createAsyncThunk("http://localhost:3000/todoList", async () => {
    const response = await fetch("http://localhost:3000/todoList");
    const data = await response.json();
    console.log("data", data);
    return data;
});

const initialState = {
    todos: [],
    status: "idle",
};

const ToDoList = createSlice({
    name: "todos",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.todos = state.todos.concat(action.payload);
            })
            .addCase(fetchTodos.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default ToDoList.reducer;