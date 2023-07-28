import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "./store";

export interface IUiState {
  sidebarExpand: boolean;
  isLoginModalShow: boolean;
}

const initialState: IUiState = {
  sidebarExpand: true,
  isLoginModalShow: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleSidebar: (state, actions: { payload: boolean }) => {
      state.sidebarExpand = actions.payload;
    },
    setLoginModalShow: (state, actions: { payload: boolean }) => {
      state.isLoginModalShow = actions.payload;
    },
  },
});

export const { toggleSidebar, setLoginModalShow } = loadingSlice.actions;

export default loadingSlice.reducer;
