import { useDispatch, useSelector } from "react-redux";
import { toggleUploadCard } from "../../../store/App-slice";
import UploadBegin from "./video-details/upload-begin";
import VideoDetails from "./video-details/details-wrapper/details-wrapper";
import TopPart from "./video-details/top-part";

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
  const uplodCardVisible = useSelector((state) => state.App.uplodCardVisible);
  const currentVideoId = useSelector((state) => state.upload.currentVideoId);

  return (
    uplodCardVisible && (
      <>
        <div className={`upload-card-hover ${uplodCardVisible ? "show" : ""}`}>
          <TopPart />
          {currentVideoId ? <VideoDetails /> : <UploadBegin />}
        </div>
        <div className='bg-black-upload'></div>
      </>
    )
  );
};
