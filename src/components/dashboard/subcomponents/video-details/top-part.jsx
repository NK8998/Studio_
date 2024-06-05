import { useDispatch, useSelector } from "react-redux";
import { FeedbackIcon } from "../../../../assets/leftnavelements";
import { CloseIcon } from "../../../../assets/uploadcardelements";
import { toggleUploadCard } from "../../../../store/App-slice";
import { resetAdditionalData, updateCurrentVideo, updateCurrentVideoId } from "../../../../store/Upload-slice";

export default function TopPart() {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.upload.currentVideo);
  const currentVideoId = useSelector((state) => state.upload.currentVideoId);
  const saving = useSelector((state) => state.upload.saving);
  const removeUploadCard = () => {
    if (saving) return;
    dispatch(toggleUploadCard());
    dispatch(updateCurrentVideoId(""));
    dispatch(updateCurrentVideo({ video_id: "" }));
    dispatch(resetAdditionalData());
  };

  return (
    <div className='top'>
      <p>{currentVideoId.length > 0 ? title : "Upload videos"}</p>
      <div className='right'>
        <button className='top-row'>
          <FeedbackIcon />
        </button>
        <button className='top-row' onClick={removeUploadCard}>
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}
