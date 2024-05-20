import { FilterIcon } from "../../assets/contentelements";
import "./css/content.css";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import withTransition from "../../utilities/transition";

const Content = () => {
  const { channel_id } = useSelector((state) => state.auth.userData);

  const navigate = useNavigate();
  const handleRouteChange = (newRoute) => {
    navigate(`/channel/${channel_id}/videos/${newRoute}`);
  };

  return (
    <div className='content'>
      <div className='content-wrapper'>
        <div className='content-upper-top'>
          <p>Channel content</p>
        </div>
        <div className='content-upper'>
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
                handleRouteChange("shorts");
              }}
            >
              Shorts
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
