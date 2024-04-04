import { createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    currentVideoId: "",
    currentVideo: { video_id: "", possible_thumbnail_urls: {} },
    additionalData: {},
  },
  reducers: {
    updateCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
    updateCurrentVideoId: (state, action) => {
      state.currentVideoId = action.payload;
    },
    updateAdditionalData: (state, action) => {
      const currentData = state.additionalData;
      state.additionalData = { ...currentData, ...action.payload };
    },
    resetAdditionalData: (state, action) => {
      state.additionalData = {};
    },
  },
});

export const { updateCurrentVideo, updateCurrentVideoId, updateAdditionalData, resetAdditionalData } = uploadSlice.actions;

export default uploadSlice.reducer;

export const subscribeToSupabase = (video_id) => {
  return async (dispatch, getState) => {
    // subscribe to supabase
    const subscription = supabase
      .channel(`${video_id}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "video-metadata", filter: `video_id=eq.${video_id}` }, handleRecordUpdated)
      .subscribe();

    function handleRecordUpdated(data) {
      const currentVideoData = getState().upload.currentVideo;
      const currentVideoId = getState().upload.currentVideoId;
      if (currentVideoId === data.new.video_id) {
        dispatch(updateCurrentVideo({ ...currentVideoData, ...data.new }));
      }
      if (data.new.mpd_url) {
        dispatch(updateCurrentVideo({ ...currentVideoData, uploadState: "done" }));
        subscription.unsubscribe();
      }
    }
  };
};
