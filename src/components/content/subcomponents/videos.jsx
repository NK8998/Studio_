import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersVideos } from "../../../store/Videos-slice";
import TableComponent from "./utilities/table/table";
import "./css/video.css";

export const Videos = () => {
  const videos = useSelector((state) => state.videos.videos);
  const dispatch = useDispatch();

  const columns = ["Video", "Visibility", "Restriction", "Date", "Views", "Comments", "Likes (vs dislikes)"];

  useEffect(() => {
    dispatch(getUsersVideos());
  }, []);
  // retrieve all user's videos and give them option to save as draft or publish
  return (
    <div className='video-role'>
      <TableComponent data={videos} columns={columns} />
    </div>
  );
};
