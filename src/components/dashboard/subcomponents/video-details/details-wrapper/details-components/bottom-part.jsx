import { useSelector } from "react-redux";

export default function DetailsBottom() {
  const { percentCompleted, uploadState } = useSelector(
    (state) => state.upload.currentVideo
  );

  return (
    <div className='details-bottom'>
      <p className='upload-state'>{`${uploadState ?? ""}...`}</p>
      <p className='percentage'>
        {percentCompleted ? `${percentCompleted}%` : ""}
      </p>
    </div>
  );
}
