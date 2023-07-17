import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  currentTrackIndexRedux: number;
}

const initialState: ToggleState = {
  currentTrackIndexRedux: 0,
};

const togglecurrentTrackIndexRedux = createSlice({
  name: "currentTrackIndexRedux",
  initialState,
  reducers: {
    updatecurrentTrackIndex: (state, action: PayloadAction<number>) => {
      state.currentTrackIndexRedux = action.payload;
    },
  },
});

export const { updatecurrentTrackIndex } = togglecurrentTrackIndexRedux.actions;
export default togglecurrentTrackIndexRedux.reducer;
