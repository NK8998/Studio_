import { FilterIcon } from "../../assets/contentelements";
import "./css/content.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import withTransition from "../../Utilities/transition";
import { useSelector } from "react-redux";

const Content = () => {
  const currentChannelId = useSelector(
    (state) => state.auth.userData.currentChannelId
  );

  const navigate = useNavigate();
  const handleRouteChange = (newRoute) => {
    navigate(`/channel/${currentChannelId}/videos/${newRoute}`);
  };

  return (
    <div className='content'>
      <div className='content-wrapper'>
        <div className='content-upper'>
          <div className='content-upper-top'>
            <p>Channel content</p>
          </div>
          <div className='route--buttons'>
            <button
              className={`route--button`}
              onClick={() => {
                handleRouteChange("upload");
              }}
            >
              Videos
            </button>
            <button
              className={`route--button`}
              onClick={() => {
                handleRouteChange("live");
              }}
            >
              Live
            </button>
            <button
              className={`route--button`}
              onClick={() => {
                handleRouteChange("playlists");
              }}
            >
              Playlists
            </button>
            <button
              className={`route--button`}
              onClick={() => {
                handleRouteChange("podcasts");
              }}
            >
              Podcasts
            </button>
            <div className='movable'></div>
          </div>
          <div className='filter-by'>
            <FilterIcon />
            <input type='text' placeholder='Filter' />
          </div>
        </div>
        <div className='content-lower'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default withTransition(Content);
