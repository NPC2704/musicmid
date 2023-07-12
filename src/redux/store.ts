import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import toggleReducer1 from "./toggleSlice1";
const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    toggle1: toggleReducer1,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
