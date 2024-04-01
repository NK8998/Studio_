import { useSelector } from "react-redux";
import DetailsBottom from "./details-components/bottom-part";
import SectionSelector from "./details-components/section-selector";
import { useState } from "react";
import Details from "./sections/details";
import VideoElements from "./sections/video-elements";
import Checks from "./sections/checks";
import Visibility from "./sections/visibility";
export default function VideoDetails() {
  const currentVideo = useSelector((state) => state.upload.currentVideo);
  console.log(currentVideo);
  const [curIndex, setCurSection] = useState(0);

  return (
    <div className='details-wrapper'>
      <div className='details-wrapper-inner'>
        <SectionSelector curSection={curIndex} setCurSection={setCurSection} />
        <Details curIndex={curIndex} />
        <VideoElements curIndex={curIndex} />
        <Checks curIndex={curIndex} />
        <Visibility curIndex={curIndex} />
      </div>
      <DetailsBottom />
    </div>
  );
}
