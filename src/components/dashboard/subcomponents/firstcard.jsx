import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleUploadCard } from "../../../store/App-slice";
import { FeedbackIcon } from "../../../assets/leftnavelements";
import { CloseIcon, UploadIcon } from "../../../assets/uploadcardelements";
import { nanoid } from "@reduxjs/toolkit";
import AxiosFetching from "../../../axios/axios-function";

export const FirstCard = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className='firstcard card'>
        <div className='innner-card'>
          <img src='https://www.gstatic.com/youtube/img/creator/no_content_illustration_upload_video_v3_darkmode.svg' alt='download illustration' />
          <p>Want to see metrics on your recent video? Upload and publish a video to get started.</p>
          <button type='button' onClick={() => dispatch(toggleUploadCard())}>
            Upload videos
          </button>
        </div>
      </div>
    </>
  );
};

export const UploadCard = ({}) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const uplodCardVisible = useSelector((state) => state.App.uplodCardVisible);
  const { channel_id, handle, display_name } = userData;
  console.log(userData);

  const [currentVideoId, setCurrentVideoId] = useState();

  function handleChange(event) {
    const file = event.target.files[0];
    const { name } = file;
    const videoId = nanoid(11);
    setCurrentVideoId(videoId);

    const formData = new FormData();
    formData.append("displayName", display_name);
    formData.append("handle", handle);
    formData.append("video", event.target.files[0]);
    formData.append("title", name);
    formData.append("channelId", channel_id);
    formData.append("videoId", videoId);

    AxiosFetching("post", "upload", formData).then((response) => {
      console.log(response.data);
    });
  }

  return (
    <>
      <div className={`upload-card-hover ${uplodCardVisible ? "show" : ""}`}>
        <div className='top'>
          <p>Upload videos</p>
          <div className='right'>
            <button className='top-row'>
              <FeedbackIcon />
            </button>
            <button className='top-row' onClick={() => dispatch(toggleUploadCard())}>
              <CloseIcon />
            </button>
          </div>
        </div>
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
      <div className='bg-black-upload'></div>
    </>
  );
};
