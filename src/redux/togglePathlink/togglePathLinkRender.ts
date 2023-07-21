import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import PlayMusic from "../../pages/PlayMusic/PlayMusic";
interface ToggleState {
  pathLinkRender: React.ComponentType<any>; // pathLinkRender là một component
  // pathLinkHome: boolean;
}

const initialState: ToggleState = {
  pathLinkRender: PlayMusic,
  // pathLinkHome: true,
};

const togglepathLinkRender = createSlice({
  name: "togglepathLinkRender",
  initialState,
  reducers: {
    updatepathLinkRender: (
      state,
      action: PayloadAction<React.ComponentType<any>>
    ) => {
      state.pathLinkRender = action.payload;
      //  state.pathLinkHome = action.payload;
    },
  },
});

export const { updatepathLinkRender } = togglepathLinkRender.actions;
export default togglepathLinkRender.reducer;
