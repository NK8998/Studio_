import { useSelector } from "react-redux";

export default function VideoDetails() {
  const currentVideo = useSelector((state) => state.upload.currentVideo);
  console.log(currentVideo);
  return (
    <div className='details-wrapper'>
      <div className='inner'></div>
    </div>
  );
}
