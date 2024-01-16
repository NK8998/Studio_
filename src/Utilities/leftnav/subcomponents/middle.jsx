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

  const currentChannelId = useSelector(
    (state) => state.auth.userData.currentChannelId
  );

  return (
    <div className={`leftnav-middle ${expand ? "expand" : "collapse"}`}>
      <Link to={`/channel/${currentChannelId}`}>
        <button
          className={`middle-container ${
            location === `/channel/${currentChannelId}` ? "current" : ""
          } ${expand ? "expand" : "collapse"}`}
        >
          {location === `/channel/${currentChannelId}` ? (
            <DashboardIconCurrent />
          ) : (
            <DashboardIconNotCurrent />
          )}
          <p>Dashboard</p>
        </button>
      </Link>
      <Link to={`/channel/${currentChannelId}/videos/upload`}>
        <button
          className={`middle-container ${
            location.includes("videos") ? "current" : ""
          } ${expand ? "expand" : "collapse"}`}
        >
          {location.includes("videos") ? (
            <ContentIconCurrent />
          ) : (
            <ContentIconNotCurrent />
          )}
          <p>Content</p>
        </button>
      </Link>
      <Link to={`/channel/${currentChannelId}/analytics`}>
        <button
          className={`middle-container ${
            location.includes("analytics") ? "current" : ""
          } ${expand ? "expand" : "collapse"}`}
        >
          {location.includes("analytics") ? (
            <AnalyticsIconCurrent />
          ) : (
            <AnalyticsIconNotCurrent />
          )}
          <p>Analytics</p>
        </button>
      </Link>
      <Link to={`/channel/${currentChannelId}/comments`}>
        <button
          className={`middle-container ${
            location.includes("comments") ? "current" : ""
          } ${expand ? "expand" : "collapse"}`}
        >
          {location.includes("comments") ? (
            <CommentsIconCurrent />
          ) : (
            <CommentsIconNotCurrent />
          )}
          <p>Comments</p>
        </button>
      </Link>
      <Link to={`/channel/${currentChannelId}/subtitles`}>
        <button
          className={`middle-container ${
            location.includes("subtitles") ? "current" : ""
          } ${expand ? "expand" : "collapse"}`}
        >
          {location.includes("subtitles") ? (
            <SubtitlesIconCurrent />
          ) : (
            <SubtitlesIconNotCurrent />
          )}
          <p>Subtitles</p>
        </button>
      </Link>
      <Link to={`/channel/${currentChannelId}/editing`}>
        <button
          className={`middle-container ${
            location.includes("editing") ? "current" : ""
          } ${expand ? "expand" : "collapse"}`}
        >
          {location.includes("editing") ? (
            <CustomizationIconCurrent />
          ) : (
            <CustomizationIconNotCurrent />
          )}
          <p>Customization</p>
        </button>
      </Link>
    </div>
  );
};
