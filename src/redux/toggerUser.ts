import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { UserData } from "../types/item";
import getToken from "../utils/Token/token";

export interface IUserState {
  isLogin: boolean;
  data?: {
    name?: string;
    email?: string;
    picture?: string;
  };

  favoriteListID?: string[];
}

const initialState: IUserState = {
  isLogin: !!getToken(),
  favoriteListID: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogin: (state, actions: { payload: boolean }) => {
      state.isLogin = actions.payload;
    },
    setUserData: (
      state,
      actions: { payload: { name?: string; email?: string; picture?: string } }
    ) => {
      state.data = actions.payload;
    },
    setFavoriteListID: (state, actions: { payload: string[] }) => {
      state.favoriteListID = actions.payload;
    },
  },
});

export const { setIsLogin, setUserData, setFavoriteListID } = userSlice.actions;

export default userSlice.reducer;
