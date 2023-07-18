import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  pathLinknumber: number;
}

const initialState: ToggleState = {
  pathLinknumber: 0,
};

const togglepathLinknumber = createSlice({
  name: "togglepathLinknumber",
  initialState,
  reducers: {
    updatepathLinknumber: (state, action: PayloadAction<number>) => {
      state.pathLinknumber = action.payload;
    },
  },
});

export const { updatepathLinknumber } = togglepathLinknumber.actions;
export default togglepathLinknumber.reducer;
