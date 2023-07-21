import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  pathLink2: string;
}

const initialState: ToggleState = {
  pathLink2: "",
};

const togglepathLink2 = createSlice({
  name: "togglepathLink2",
  initialState,
  reducers: {
    updatepathLink2: (state, action: PayloadAction<string>) => {
      state.pathLink2 = action.payload;
    },
  },
});

export const { updatepathLink2 } = togglepathLink2.actions;
export default togglepathLink2.reducer;
