import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  sendLink: boolean;
}

const initialState: ToggleState = {
  sendLink: false,
};

const toggleSendLink = createSlice({
  name: "sendLink",
  initialState,
  reducers: {
    updatesendLink: (state, action: PayloadAction<boolean>) => {
      state.sendLink = action.payload;
    },
  },
});

export const { updatesendLink } = toggleSendLink.actions;
export default toggleSendLink.reducer;
