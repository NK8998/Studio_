import { useSelector } from "react-redux";

export default function DetailsBottom() {
  const { percentCompleted, uploadState, mpd_url } = useSelector((state) => state.upload.currentVideo);

  return (
    <div className='details-bottom'>
      <div>
        <p>{!mpd_url ? "Processing" : ""}</p>
        <p>{`${uploadState ? uploadState : ""} ${percentCompleted ? percentCompleted : ""}`}</p>
      </div>
    </div>
  );
}
