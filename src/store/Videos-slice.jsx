import { createSlice } from "@reduxjs/toolkit";
import AxiosFetching from "../axios/axios-function";
import { updateSelectedIds } from "./Table-slice";

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    deletingModalShowing: false,
    deleting: false,
  },
  reducers: {
    updateVideos: (state, action) => {
      state.videos = action.payload; // Set videos array
    },
    modifyVideos: (state, action) => {
      state.videos = state.videos.map((video) => (video.video_id === action.payload.video_id ? action.payload : video));
    },
    removeVideos: (state, action) => {
      // remove the deleted videos
      const newVideos = state.videos.filter((video) => !action.payload.includes(video.video_id));
      state.videos = newVideos;
    },
    toggleDeletingModal: (state, action) => {
      state.deletingModalShowing = action.payload;
    },
    toggleDeleting: (state, action) => {
      state.deleting = action.payload;
    },
  },
});

export const { updateVideos, modifyVideos, toggleDeletingModal, toggleDeleting, removeVideos } = videosSlice.actions;

export default videosSlice.reducer;

export const getUsersVideos = () => {
  return async (dispatch, getState) => {
    AxiosFetching("get", "get-users-videos", {}, {})
      .then((response) => {
        if (response.data) {
          dispatch(updateVideos(response.data));
        }
      })
      .catch((error) => {
        // "display error component";
      });
  };
};

export const deleteVideos = (selectedIds) => {
  return async (dispatch, getState) => {
    const isDeleting = getState().videos.deleting;
    if (isDeleting) return;
    const formData = new FormData();

    formData.append("ids", selectedIds);
    // send request to delete end point and indicate deleting
    dispatch(toggleDeleting(true));
    AxiosFetching("post", "delete-video", formData, {})
      .then((response) => {
        if (response.data) {
          dispatch(toggleDeleting(false));
          dispatch(removeVideos(selectedIds));
          dispatch(updateSelectedIds([]));
          console.log(response.data);

          // remove video from videos array
        }
      })
      .catch((error) => {
        dispatch(toggleDeleting(false));
        console.error(error);

        // "display error component";
      });
  };
};
