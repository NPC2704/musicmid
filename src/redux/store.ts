import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggleSlice";
import toggleReducer1 from "./toggleSlice1";
import toggleReducer2 from "./toggleSlice2";
import toggleLink from "./toggleLink";
import toggleData1 from "./toggleData1";
import togglecurrentTrackIndex from "./togglecurrentTrackIndex";
import toggleidLink from "./toggleidLink";
import togglePathLink from "./togglePathLink";
import togglePathLink2 from "./togglePathLink2";
import togglePathLinkNumber from "./togglePathLinkNumber";
import toggleSendLink from "./toggleSendLink";
import toggleImg from "./toggleImg";
import toggleTitle from "./toggleTitle";
import toggleCurrentTime from "./toggleCurrentTime";
const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    toggle1: toggleReducer1,
    toggle2: toggleReducer2,
    toggleLink: toggleLink,
    toggleData1: toggleData1,
    togglecurrentTrackIndex: togglecurrentTrackIndex,
    toggleidLink: toggleidLink,
    togglePathLink: togglePathLink,
    togglePathLink2: togglePathLink2,
    togglePathLinkNumber: togglePathLinkNumber,
    toggleSendLink: toggleSendLink,
    toggleImg: toggleImg,
    toggleCurrentTime: toggleCurrentTime,
    toggleTitle: toggleTitle,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
