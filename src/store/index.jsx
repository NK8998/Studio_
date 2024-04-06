import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth-slice";
import AppSlice from "./App-slice";
import UploadSlice from "./Upload-slice";
import VideosSlice from "./Videos-slice";

const store = configureStore({
  reducer: {
    videos: VideosSlice,
    upload: UploadSlice,
    auth: AuthSlice,
    App: AppSlice,
  },
});

export default store;
