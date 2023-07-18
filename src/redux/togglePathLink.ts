import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  pathLink: string;
}

const initialState: ToggleState = {
  pathLink: "/",
};

const togglepathLink = createSlice({
  name: "togglepathLink",
  initialState,
  reducers: {
    updatepathLink: (state, action: PayloadAction<string>) => {
      state.pathLink = action.payload;
    },
  },
});

export const { updatepathLink } = togglepathLink.actions;
export default togglepathLink.reducer;
