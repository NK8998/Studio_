import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./Auth-slice";
import AppSlice from "./App-slice";

const store = configureStore({
  reducer: {
    auth: AuthSlice,
    App: AppSlice,
  },
});

export default store;
