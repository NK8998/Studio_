import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosFetching from "../axios/axios-function";

export default function AdditionalDataSubmission() {
  const dispatch = useDispatch();
  const additionalData = useSelector((state) => state.upload.additionalData);
  const currentVideoId = useSelector((state) => state.upload.currentVideoId);
  const videoData = { videoId: currentVideoId, ...additionalData };
  const { thumbnailString, thumbnailBlob, videoId, title, descriptionString, videoSettings, category, visibility } = videoData;
  console.log(videoData);

  useEffect(() => {
    if (!currentVideoId) return;
    const formData = new FormData();
    formData.append("thumbnailString", thumbnailString || null);
    thumbnailBlob ? formData.append("thumbnailBlob", document.getElementById("thumbnailBlob").files[0]) : formData.append("thumbnailBlob", null);
    formData.append("videoId", videoId);
    formData.append("title", title);
    formData.append("descriptionString", descriptionString || null);
    formData.append("videoSettings", videoSettings || null);
    formData.append("category", category || null);
    formData.append("visibility", visibility || "draft");

    AxiosFetching("post", "additional-video-data", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("something went wrong", error);
      });
  }, [videoData, currentVideoId]);
  return <></>;
}
