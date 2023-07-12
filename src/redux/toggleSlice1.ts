import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState1 {
  number1: number;
}

const initialState: ToggleState1 = {
  number1: 0,
};

const toggleSlice1 = createSlice({
  name: "toggle1",
  initialState,
  reducers: {
    updateNumber1: (state, action: PayloadAction<number>) => {
      state.number1 = action.payload;
    },
  },
});

export const { updateNumber1 } = toggleSlice1.actions;
export default toggleSlice1.reducer;
