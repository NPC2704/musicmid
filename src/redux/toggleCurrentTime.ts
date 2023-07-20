import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  currentTime: number;
}

const initialState: ToggleState = {
  currentTime: 0,
};

const togglecurrentTime = createSlice({
  name: "currentTime",
  initialState,
  reducers: {
    updatecurrentTime: (state, action: PayloadAction<number>) => {
      state.currentTime = action.payload;
    },
  },
});

export const { updatecurrentTime } = togglecurrentTime.actions;
export default togglecurrentTime.reducer;
