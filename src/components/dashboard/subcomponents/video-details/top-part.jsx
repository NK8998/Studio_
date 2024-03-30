import { useDispatch, useSelector } from "react-redux";
import { FeedbackIcon } from "../../../../assets/leftnavelements";
import { CloseIcon } from "../../../../assets/uploadcardelements";
import { toggleUploadCard } from "../../../../store/App-slice";
import { updateCurrentVideo } from "../../../../store/Upload-slice";

export default function TopPart() {
  const dispatch = useDispatch();
  const removeUploadCard = () => {
    dispatch(toggleUploadCard());
    dispatch(updateCurrentVideo({ video_id: "" }));
  };

  return (
    <div className='top'>
      <p>Upload videos</p>
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
