import { createSlice } from "@reduxjs/toolkit";

const tableSlice = createSlice({
  name: "table",
  initialState: {
    selectedIds: [],
  },
  reducers: {
    updateSelectedIds: (state, action) => {
      state.selectedIds = action.payload;
    },
  },
});

export const { updateSelectedIds } = tableSlice.actions;

export default tableSlice.reducer;
