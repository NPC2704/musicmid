import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  iddMusic: string;
}

const initialState: ToggleState = {
  iddMusic: "",
};

const toggleiddMusic = createSlice({
  name: "iddMusic",
  initialState,
  reducers: {
    updateiddMusic: (state, action: PayloadAction<string>) => {
      state.iddMusic = action.payload;
    },
  },
});

export const { updateiddMusic } = toggleiddMusic.actions;
export default toggleiddMusic.reducer;
