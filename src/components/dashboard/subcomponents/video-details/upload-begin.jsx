import { useDispatch, useSelector } from "react-redux";
import { FeedbackIcon } from "../../../../assets/leftnavelements";
import { CloseIcon, UploadIcon } from "../../../../assets/uploadcardelements";
import AxiosFetching from "../../../../axios/axios-function";
import { nanoid } from "@reduxjs/toolkit";
import { subscribeToSupabase, updateCurrentVideo } from "../../../../store/Upload-slice";
import { toggleUploadCard } from "../../../../store/App-slice";

export default function UploadBegin() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const { channel_id, handle, display_name } = userData;

  function handleChange(event) {
    const file = event.target.files[0];
    const { name } = file;
    const videoId = nanoid(11);

    dispatch(subscribeToSupabase(videoId));

    const formData = new FormData();
    formData.append("displayName", display_name);
    formData.append("handle", handle);
    formData.append("video", event.target.files[0]);
    formData.append("title", name);
    formData.append("channelId", channel_id);
    formData.append("videoId", videoId);

    const config = {
      onUploadProgress: function (progressEvent) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        const commonPayload = { video_id: videoId, percentCompleted: percentCompleted };

        if (percentCompleted === 100) {
          dispatch(updateCurrentVideo({ ...commonPayload, uploadState: "processing" }));
        } else {
          dispatch(updateCurrentVideo({ ...commonPayload, uploadState: "uploading" }));
        }
      },
    };

    AxiosFetching("post", "upload", formData, config).then((response) => {
      console.log(response.data);
    });
  }
  return (
    <div className='upload-interface-wrapper'>
      <div className='middle'>
        <input type='file' id='fileUpload' name='video' style={{ display: "none" }} onChange={handleChange} />
        <label htmlFor='fileUpload' id='fileUpload-label'>
          <UploadIcon />
        </label>
        <div className='middle-text'>
          <p>Drag and drop video files to upload</p>
          <p>Your videos will be private until you publish them.</p>
        </div>
        <label htmlFor='fileUpload' className='upload-card-button'>
          SELECT FILES
        </label>
      </div>

      <div className='bottom'>
        <p>
          By submitting your videos to YouTube, you acknowledge that you agree to YouTube's <span>Terms of Service</span> and{" "}
          <span>Community Guidelines</span>.
        </p>
        <p>
          Please make sure that you do not violate others' copyright or privacy rights. <span>Learn more</span>
        </p>
      </div>
    </div>
  );
}
