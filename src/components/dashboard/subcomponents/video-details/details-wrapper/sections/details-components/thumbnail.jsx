import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadThumbIcon } from "../../../../../../../assets/contentelements";
import { updateAdditionalData } from "../../../../../../../store/Upload-slice";

export default function ThumbnailPicker() {
  const { possible_thumbnail_urls } = useSelector((state) => state.upload.currentVideo);
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [currentThumb, setCurrentThumb] = useState("");

  let thumbObj;
  if (!possible_thumbnail_urls || Object.entries(possible_thumbnail_urls).length === 0) {
    thumbObj = {};
  } else if (possible_thumbnail_urls && Object.entries(possible_thumbnail_urls).length > 0) {
    thumbObj = possible_thumbnail_urls;
  }

  const arr = Object.values(thumbObj);
  const updateThumbString = (url) => {
    setCurrentThumb(url);
    inputRef.current.value = url;
    const event = new Event("input", { bubbles: true });
    inputRef.current.dispatchEvent(event);
    dispatch(updateAdditionalData({ thumbnailString: url, thumbnailBlob: "" }));
  };

  const thumbElements = arr.map((thumb, index) => {
    return (
      <div
        className={`thumb-container ${thumb === currentThumb ? "current" : ""}`}
        onClick={() => updateThumbString(thumb)}
        key={`${index}-thumb-${thumb}`}
      >
        <img src={thumb} alt='possible-thumbnail' />
      </div>
    );
  });

  const handleChange = (e) => {
    setCurrentThumb("");
    dispatch(updateAdditionalData({ [e.target.name]: e.target.value, thumbnailString: "" }));
  };

  return (
    <div className='thumbnail-role'>
      <p className='role-title'>Thumbnail</p>
      <p className='role-description'>
        Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention. <span>Learn more</span>{" "}
      </p>
      <div className='thumbnail-picker'>
        <input onChange={handleChange} type='file' id='thumbnailBlob' name='thumbnailBlob' style={{ display: "none" }} />
        <input type='text' name='thumbnailString' style={{ display: "none" }} ref={inputRef} />
        <div className='thumb-container pick'>
          <label htmlFor='thumbnailBlob'>
            <UploadThumbIcon />
            <p>Upload thumbnail</p>
          </label>
        </div>
        <div className='possible-generated-thumbnails'>
          {thumbElements.length === 0 ? (
            <>
              <div className='thumb-container  loader'></div>
              <div className='thumb-container  loader'></div>
              <div className='thumb-container  loader'></div>
            </>
          ) : (
            thumbElements
          )}
        </div>
      </div>
    </div>
  );
}
