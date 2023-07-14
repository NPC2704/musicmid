import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState2 {
  number2: string;
}

const initialState: ToggleState2 = {
  number2: "",
};

const toggleSlice2 = createSlice({
  name: "toggle2",
  initialState,
  reducers: {
    updateNumber2: (state, action: PayloadAction<string>) => {
      state.number2 = action.payload;
    },
  },
});

export const { updateNumber2 } = toggleSlice2.actions;
export default toggleSlice2.reducer;
