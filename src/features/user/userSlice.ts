import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPlayListArr, IPlayListItem, IUserData } from "../../types/item";
import getToken from "../../utils/Token/token";

export interface IUserState {
  isLogin: boolean;
  data?: IUserData;
  playList?: IPlayListItem[];
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
    setUserData: (state, actions: { payload: IUserData }) => {
      state.data = actions.payload;
    },
    setFavoriteListID: (state, actions: { payload: string[] }) => {
      state.favoriteListID = actions.payload;
    },
  },
});

export const { setIsLogin, setUserData, setFavoriteListID } = userSlice.actions;

export default userSlice.reducer;
