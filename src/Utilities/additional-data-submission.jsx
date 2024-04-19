import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosFetching from "../axios/axios-function";
import { updateCurrentVideo } from "../store/Upload-slice";
import { modifyVideos } from "../store/Videos-slice";

export default function AdditionalDataSubmission() {
  const dispatch = useDispatch();
  const additionalData = useSelector((state) => state.upload.additionalData);
  const currentVideoId = useSelector((state) => state.upload.currentVideoId);
  let videoData = { videoId: currentVideoId, ...additionalData };

  const { thumbnailString, thumbnailBlob, videoId, title, descriptionString, videoSettings, category, visibility, publishDate } = videoData;

  useEffect(() => {
    if (!currentVideoId || !videoId || !title) return;
    const formData = new FormData();
    formData.append("thumbnailString", thumbnailString || undefined);
    thumbnailBlob ? formData.append("thumbnailBlob", document.getElementById("thumbnailBlob").files[0]) : formData.append("thumbnailBlob", undefined);
    formData.append("videoId", videoId);
    formData.append("title", title || "");
    formData.append("descriptionString", descriptionString || "");
    formData.append("videoSettings", videoSettings || null);
    formData.append("category", category || undefined);
    formData.append("visibility", visibility || "Draft");
    formData.append("publishDate", publishDate || undefined);

    AxiosFetching("post", "additional-video-data", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data !== null && response.data.data && response.data.data !== null) {
          dispatch(updateCurrentVideo(response.data.data));
          dispatch(modifyVideos(response.data.data));
        }
      })
      .catch((error) => {
        console.error("something went wrong", error);
      });
  }, [additionalData, currentVideoId]);
  return <></>;
}
