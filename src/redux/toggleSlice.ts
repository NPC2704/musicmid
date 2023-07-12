import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  number: number;
}

const initialState: ToggleState = {
  number: 0,
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    updateNumber: (state, action: PayloadAction<number>) => {
      state.number = action.payload;
    },
  },
});

export const { updateNumber } = toggleSlice.actions;
export default toggleSlice.reducer;
