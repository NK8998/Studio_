import { createSlice } from "@reduxjs/toolkit";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    currentVideo: { video_id: "" },
  },
  reducers: {
    updateCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
});

export const { updateCurrentVideo } = uploadSlice.actions;

export default uploadSlice.reducer;

export const subscribeToSupabase = (videoId) => {
  return async (dispatch, getState) => {
    // subscribe to supabase
    const subscription = supabase
      .channel(`${videoId}`)
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "video-metadata", filter: `video_id=eq.${videoId}` }, handleRecordUpdated)
      .subscribe();

    function handleRecordUpdated(data) {
      const currentVideoData = getState().upload.currentVideo;
      dispatch(updateCurrentVideo({ ...currentVideoData, ...data.new }));
      if (data.new.mpd_url) {
        subscription.unsubscribe();
      }
    }
  };
};
