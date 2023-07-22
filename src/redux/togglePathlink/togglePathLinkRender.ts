// redux/toggleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggle",
  initialState: { data1: [], datatitle: "", dataChild: 0 },
  reducers: {
    updateData(state, action) {
      state.data1 = action.payload.data1;
      state.datatitle = action.payload.datatitle;
      state.dataChild = action.payload.dataChild;
    },
  },
});

export const { updateData } = toggleSlice.actions;
export default toggleSlice.reducer;
