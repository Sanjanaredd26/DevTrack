import { configureStore, createSlice } from "@reduxjs/toolkit";

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
  },
  reducers: {
    signIn(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    signOut(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

// Tasks Slice
const taskSlice = createSlice({
  name: "tasks",
  initialState: [],
  reducers: {
    setTasks(state, action) {
      return action.payload;
    },
    addTask(state, action) {
      state.push(action.payload);
    },
    updateTask(state, action) {
        return state.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        );
    },
    deleteTask(state, action) {
      return state.filter((task) => task.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;

// Store Configuration
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks: taskSlice.reducer,
  },
});

export default store;
