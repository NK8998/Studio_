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

export const LoadingScreen = () => {
  const [gettingLong, setGettingLong] = useState(false);
  const [tooLong, setToolong] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UrlSCID = window.location.pathname
    .split("/")
    .find((urlPart) => urlPart.includes("UC"));

  useEffect(() => {
    verifyCredentials();

    setTimeout(() => {
      setGettingLong(true);
    }, 6000);
    setTimeout(() => {
      setToolong(true);
    }, 12000);
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
        <div className='end'>
          <div className='m-circle'></div>
          <div className='m-circle bar'></div>
          <div className='m-circle'></div>
        </div>
      </div>
      <div className='loading-text'>
        <h2>Please give it some time. It will be worth it I promise.</h2>
        {gettingLong && (
          <p className='loading-text-para'>
            This is a project I made to showcase my skills. It is a YouTube
            clone with a few features. It is largely inspired by YouTube's UI so
            there might be some similarities😂. This is the Studio to allow for
            video uploads and more.
          </p>
        )}
        {tooLong && (
          <div className='taking-long-text'>
            <p>It appears to be taking forever. Try reloading👇.</p>
            <button onClick={handleReload} className='reload'>
              Reload
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
