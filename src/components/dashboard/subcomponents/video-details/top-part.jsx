import { useDispatch, useSelector } from "react-redux";
import { FeedbackIcon } from "../../../../assets/leftnavelements";
import { CloseIcon } from "../../../../assets/uploadcardelements";
import { toggleUploadCard } from "../../../../store/App-slice";
import { updateCurrentVideoId } from "../../../../store/Upload-slice";

export default function TopPart() {
  const dispatch = useDispatch();
  const { title } = useSelector((state) => state.upload.currentVideo);
  const currentVideoId = useSelector((state) => state.upload.currentVideoId);
  const removeUploadCard = () => {
    dispatch(toggleUploadCard());
    dispatch(updateCurrentVideoId(""));
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
