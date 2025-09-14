import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/loadingscreen.css";
import { useDispatch } from "react-redux";
import {
  updateAuthentication,
  updatePermission,
  userLoggedIn,
} from "../../store/Auth-slice";
import axios from "axios";
import AxiosFetching from "../../axios/axios-function";
import LoadingTxt from "./loading-txt";
import ReloadBtn from "./reload-btn";

export const LoadingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UrlSCID = window.location.pathname
    .split("/")
    .find((urlPart) => urlPart.includes("UC"));

  useEffect(() => {
    verifyCredentials();
  }, []);

  const verifyCredentials = () => {
    AxiosFetching("get", `Verify-cookie`, {}).then((response) => {
      if (response.data) {
        if (response.data.redirect === true) {
          window.location.href = `${import.meta.env.VITE_OAUTH_URL}?redirect=${
            window.location.href
          }`;
          return;
        }

        if (response.data.message !== "verified") {
          document.write("An error occurred");
          return;
        }

        const userDataArr =
          Array.isArray(response?.data?.user_data) &&
          response.data.user_data.length > 0
            ? response.data.user_data
            : [{}];

        const userData = userDataArr[0];
        if (
          UrlSCID &&
          userData?.channel_id &&
          userData?.channel_id !== UrlSCID
        ) {
          dispatch(updatePermission(false));
          dispatch(updateAuthentication(true));

          return;
        }
        dispatch(userLoggedIn(userData));
        dispatch(updatePermission(true));
        dispatch(updateAuthentication(true));
        if (window.location.pathname === "/" && userData?.channel_id) {
          navigate(`/channel/${userData?.channel_id}`);
        }
      }
    });
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className='loadingscreen'>
      <div className='masthead-skeleton'>
        <div className='start'>
          <div className='m-circle bar'></div>
        </div>
        <div className='end'>
          <div className='m-circle'></div>
          <div className='m-circle bar'></div>
          <div className='m-circle'></div>
        </div>
      </div>
      <div className='loading-text'>
        <LoadingTxt />
        <ReloadBtn onClick={handleReload} />
      </div>
    </div>
  );
};
