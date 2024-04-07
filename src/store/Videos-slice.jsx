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
    modifyVideos: (state, action) => {
      state.videos = state.videos.map((video) => (video.video_id === action.payload.video_id ? action.payload : video));
    },
  },
});

export const { updateVideos, modifyVideos } = videosSlice.actions;

export default videosSlice.reducer;

export const getUsersVideos = () => {
  return async (dispatch, getState) => {
    const data = getState().videos.videos;
    if (data.length > 0) return;
    AxiosFetching("get", "get-users-videos", {}, {})
      .then((response) => {
        if (response.data) {
          dispatch(updateVideos(response.data));
        }
      })
      .catch((error) => {
        "display error component";
      });
  };
};
