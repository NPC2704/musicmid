import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  imgMusic: string;
}

const initialState: ToggleState = {
  imgMusic:
    "https://yt3.googleusercontent.com/nOwpUI4-9dJLMVZjxUbsghJ-8qBRsGZWthz4cXSSNjuSsBFLw7Zq4iH2awp-Hk3m4milTxAQng=s900-c-k-c0x00ffffff-no-rj",
};

const toggleimgMusic = createSlice({
  name: "imgMusic",
  initialState,
  reducers: {
    updateimgMusic: (state, action: PayloadAction<string>) => {
      state.imgMusic = action.payload;
    },
  },
});

export const { updateimgMusic } = toggleimgMusic.actions;
export default toggleimgMusic.reducer;
