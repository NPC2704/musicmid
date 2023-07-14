import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  link: string;
}

const initialState: ToggleState = {
  link: "",
};

const toggleLink = createSlice({
  name: "link",
  initialState,
  reducers: {
    updateLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
  },
});

export const { updateLink } = toggleLink.actions;
export default toggleLink.reducer;
