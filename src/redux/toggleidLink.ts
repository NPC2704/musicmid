import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  idlink: string;
}

const initialState: ToggleState = {
  idlink: "",
};

const toggleidLink = createSlice({
  name: "link",
  initialState,
  reducers: {
    updateidLink: (state, action: PayloadAction<string>) => {
      state.idlink = action.payload;
    },
  },
});

export const { updateidLink } = toggleidLink.actions;
export default toggleidLink.reducer;
