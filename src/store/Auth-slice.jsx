import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticated: false,
    isAllowed: false,
    isLoggedIn: false,
    userData: null, // Initialize userData as null
  },
  reducers: {
    userLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.userData = action.payload; // Set user data when logged in
    },
    userLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.userData = null; // Clear user data when logged out
    },
    updatePermission: (state, action) => {
      state.isAllowed = action.payload;
    },
    updateAuthentication: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  updatePermission,
  updateAuthentication,
} = authSlice.actions;

export default authSlice.reducer;
