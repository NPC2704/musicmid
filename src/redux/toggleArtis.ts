import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  artisMusic: string;
}

const initialState: ToggleState = {
  artisMusic: "Tác giả",
};

const toggleartisMusic = createSlice({
  name: "artisMusic",
  initialState,
  reducers: {
    updateartisMusic: (state, action: PayloadAction<string>) => {
      state.artisMusic = action.payload;
    },
  },
});

export const { updateartisMusic } = toggleartisMusic.actions;
export default toggleartisMusic.reducer;
