import { configureStore } from "@reduxjs/toolkit";
import ToDoList from "./ToDoList";

export default configureStore({
    reducer: {
        todos: ToDoList,
    },
});