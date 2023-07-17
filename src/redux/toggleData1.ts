import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToggleState {
  data1Redux: any[];
}

const initialState: ToggleState = {
  data1Redux: [],
};

const toggleData1 = createSlice({
  name: "data1Redux",
  initialState,
  reducers: {
    updatedata1Redux: (state, action: PayloadAction<any[]>) => {
      state.data1Redux = action.payload;
    },
  },
});

export const { updatedata1Redux } = toggleData1.actions;
export default toggleData1.reducer;
