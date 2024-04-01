import { useSelector } from "react-redux";

export default function DetailsBottom() {
  const { percentCompleted, uploadState } = useSelector((state) => state.upload.currentVideo);
  return <div className='details-bottom'>{uploadState === "uploading" ? <p>uploading... {percentCompleted}%</p> : <p>processing</p>}</div>;
}
