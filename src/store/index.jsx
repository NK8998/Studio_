import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth-slice";
import AppSlice from "./App-slice";
import UploadSlice from "./Upload-slice";
import VideosSlice from "./Videos-slice";
import TableSlice from "./Table-slice";

const store = configureStore({
  reducer: {
    table: TableSlice,
    videos: VideosSlice,
    upload: UploadSlice,
    auth: AuthSlice,
    App: AppSlice,
  },
});

export default store;
