import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  titleMusic: string;
}

const initialState: ToggleState = {
  titleMusic: "Tên bài",
};

const toggleititleMusic = createSlice({
  name: "titleMusic",
  initialState,
  reducers: {
    updatetitleMusic: (state, action: PayloadAction<string>) => {
      state.titleMusic = action.payload;
    },
  },
});

export const { updatetitleMusic } = toggleititleMusic.actions;
export default toggleititleMusic.reducer;
