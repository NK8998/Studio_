import { useSelector } from "react-redux";

export default function DetailsBottom() {
  const { percentCompleted, uploadState } = useSelector((state) => state.upload.currentVideo);

  return (
    <div className='details-bottom'>
      <div>
        <p>{uploadState}</p>
        <p>{percentCompleted ? `percent completed: ${percentCompleted}` : ""}</p>
      </div>
    </div>
  );
}
