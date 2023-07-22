// src/redux/toggleContentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const toggleContentSlice = createSlice({
  name: "toggleContent",
  initialState: {
    showHomeContent: true,
  },
  reducers: {
    toggleHomeContent: (state) => {
      state.showHomeContent = !state.showHomeContent;
    },
  },
});

export const { toggleHomeContent } = toggleContentSlice.actions;
export default toggleContentSlice.reducer;
