import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "App",
  initialState: {
    uplodCardVisible: false,
    windowWidth: window.innerWidth,
    expand: true,
    preferresSmallSize: false,
  },
  reducers: {
    toggleNavigationBar: (state, action) => {
      state.expand = !state.expand;
      const expand = state.expand;
      if (expand) {
        state.preferresSmallSize = false;
      } else {
        state.preferresSmallSize = true;
      }
    },
    resetNavigationBar: (state, action) => {
      const windowWidth = state.windowWidth;
      const preferresSmallSize = state.preferresSmallSize;
      if (windowWidth <= 1280) {
        state.expand = false;
      } else if (!preferresSmallSize && windowWidth > 1280) {
        state.expand = true;
      }
    },
    updateWindowWidth: (state, action) => {
      state.windowWidth = action.payload;
    },
    toggleUploadCard: (state, action) => {
      state.uplodCardVisible = !state.uplodCardVisible;
    },
  },
});

export const { toggleNavigationBar, resetNavigationBar, updateWindowWidth, toggleUploadCard } = appSlice.actions;

export default appSlice.reducer;
