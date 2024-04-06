import { createSlice } from "@reduxjs/toolkit";
import AxiosFetching from "../axios/axios-function";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
  },
  reducers: {
    updateVideos: (state, action) => {
      state.videos = action.payload; // Set videos array
    },
  },
});

export const { updateVideos } = videosSlice.actions;

export default videosSlice.reducer;

export const getUsersVideos = () => {
  return async (dispatch, getState) => {
    const data = getState().videos.videos;
    if (data.length > 0) return;
    AxiosFetching("get", "get-users-videos", {}, {})
      .then((response) => {
        dispatch(updateVideos(response.data));
      })
      .catch((error) => {
        "display error component";
      });
  };
};
