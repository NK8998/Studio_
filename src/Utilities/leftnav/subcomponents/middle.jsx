import {
  AnalyticsIconCurrent,
  AnalyticsIconNotCurrent,
  CommentsIconCurrent,
  CommentsIconNotCurrent,
  ContentIconCurrent,
  ContentIconNotCurrent,
  CustomizationIconCurrent,
  CustomizationIconNotCurrent,
  DashboardIconCurrent,
  DashboardIconNotCurrent,
  SubtitlesIconCurrent,
  SubtitlesIconNotCurrent,
} from "../../../assets/leftnavelements";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
export const Middle = ({ expand }) => {
  const location = window.location.pathname;
  const currentLocation = useLocation();
  useEffect(() => {}, [currentLocation]);

  const userData = useSelector((state) => state.auth.userData);
  const { channel_id } = userData;

  return (
    <div className={`leftnav-middle ${expand ? "expand" : "collapse"}`}>
      <Link to={`/channel/${channel_id}`}>
        <button className={`middle-container ${location === `/channel/${channel_id}` ? "current" : ""} ${expand ? "expand" : "collapse"}`}>
          {location === `/channel/${channel_id}` ? <DashboardIconCurrent /> : <DashboardIconNotCurrent />}
          <p>Dashboard</p>
        </button>
      </Link>
      <Link to={`/channel/${channel_id}/videos/upload`}>
        <button className={`middle-container ${location.includes("videos") ? "current" : ""} ${expand ? "expand" : "collapse"}`}>
          {location.includes("videos") ? <ContentIconCurrent /> : <ContentIconNotCurrent />}
          <p>Content</p>
        </button>
      </Link>
      <Link to={`/channel/${channel_id}/analytics`}>
        <button className={`middle-container ${location.includes("analytics") ? "current" : ""} ${expand ? "expand" : "collapse"}`}>
          {location.includes("analytics") ? <AnalyticsIconCurrent /> : <AnalyticsIconNotCurrent />}
          <p>Analytics</p>
        </button>
      </Link>
      <Link to={`/channel/${channel_id}/comments`}>
        <button className={`middle-container ${location.includes("comments") ? "current" : ""} ${expand ? "expand" : "collapse"}`}>
          {location.includes("comments") ? <CommentsIconCurrent /> : <CommentsIconNotCurrent />}
          <p>Comments</p>
        </button>
      </Link>
      <Link to={`/channel/${channel_id}/subtitles`}>
        <button className={`middle-container ${location.includes("subtitles") ? "current" : ""} ${expand ? "expand" : "collapse"}`}>
          {location.includes("subtitles") ? <SubtitlesIconCurrent /> : <SubtitlesIconNotCurrent />}
          <p>Subtitles</p>
        </button>
      </Link>
      <Link to={`/channel/${channel_id}/editing`}>
        <button className={`middle-container ${location.includes("editing") ? "current" : ""} ${expand ? "expand" : "collapse"}`}>
          {location.includes("editing") ? <CustomizationIconCurrent /> : <CustomizationIconNotCurrent />}
          <p>Customization</p>
        </button>
      </Link>
    </div>
  );
};
