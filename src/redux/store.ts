import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import toggleReducer1 from "./toggleSlice1";
import toggleReducer2 from "./toggleSlice2";
import toggleLink from "./toggleLink";
import toggleData1 from "./toggleData1";
import togglecurrentTrackIndex from "./togglecurrentTrackIndex";
import toggleidLink from "./toggleidLink";
const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    toggle1: toggleReducer1,
    toggle2: toggleReducer2,
    toggleLink: toggleLink,
    toggleData1: toggleData1,
    togglecurrentTrackIndex: togglecurrentTrackIndex,
    toggleidLink: toggleidLink,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
