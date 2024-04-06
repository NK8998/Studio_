import InputComponent from "../../../../../../utilities/input-component";
import ThumbnailPicker from "./details-components/thumbnail";
import "./details-components/components.css";
import { useSelector } from "react-redux";

export default function Details({ curIndex }) {
  const { title, description_string } = useSelector((state) => state.upload.currentVideo);
  return (
    <div className={`details-inner ${curIndex === 0 ? "visible" : ""}`}>
      <div className='section-details-top'>
        <p className='section-title'>Details</p>
        <p>REUSE DETAILS</p>
      </div>
      <div className='details-middle'>
        <div className='details-left'>
          <InputComponent
            defaultText={title}
            name={"title"}
            upperText={"Title (required)"}
            placeholder={"A title that tells your viewers about your video"}
            limit={600}
          />
          <InputComponent
            defaultText={description_string}
            name={"descriptionString"}
            upperText={"Description"}
            placeholder={"Tell viewers about your video (type @ to mention a channel)"}
            limit={5000}
          />
          <ThumbnailPicker />
        </div>
        <div className='details-right'>
          <div className='details-right-inner'></div>
        </div>
      </div>
    </div>
  );
}
