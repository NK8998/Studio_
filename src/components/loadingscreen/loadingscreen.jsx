import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/loadingscreen.css";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../store/Auth-slice";
import axios from "axios";
import AxiosFetching from "../../axios/axios-function";

export const LoadingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const UrlSCID = window.location.pathname
      .split("/")
      .find((urlPart) => urlPart.includes("UC"));
    if (
      localStorage.getItem("SCID") &&
      UrlSCID &&
      UrlSCID !== JSON.parse(localStorage.getItem("SCID"))
    ) {
      document.write("You do not have permission to view this page");
    } else if (!localStorage.getItem("SCID") || !localStorage.getItem("SUID")) {
      setCredentials();
    } else if (localStorage.getItem("SCID") && localStorage.getItem("SUID")) {
      verifyCredentials();
    }
  }, []);

  const verifyCredentials = () => {
    const SCID = JSON.parse(localStorage.getItem("SCID"));
    const SUID = JSON.parse(localStorage.getItem("SUID"));
    AxiosFetching("get", `Verify-cookie?SCID=${SCID}&SUID=${SUID}`, {}).then(
      (response) => {
        if (response.data) {
          if (response.data.redirect === true) {
            window.location.href = `${
              import.meta.env.VITE_OAUTH_URL
            }?redirect=${window.location.href}`;
            return;
          }
          if (response.data.message !== "verified") {
            document.write("Token mismatch");
          } else {
            const userData = response.data.user_data[0]
              ? response.data.user_data[0]
              : {};
            dispatch(userLoggedIn(userData));
            if (window.location.pathname === "/") {
              navigate(`/channel/${SCID}`);
            }
          }
        }
      }
    );
  };

  const setCredentials = () => {
    AxiosFetching("get", "Set-cookie", {}).then((response) => {
      if (response.data) {
        if (response.data.redirect === true) {
          window.location.href = `${import.meta.env.VITE_OAUTH_URL}?redirect=${
            window.location.href
          }`;
        } else {
          const SCID = response.data.SCID;
          const SUID = response.data.SUID;
          localStorage.setItem("SCID", JSON.stringify(SCID));
          localStorage.setItem("SUID", JSON.stringify(SUID));

          const userData = response.data.user_data[0]
            ? response.data.user_data[0]
            : {};
          dispatch(userLoggedIn(userData));
          if (window.location.pathname === "/") {
            navigate(`/channel/${SCID}`);
          }
        }
      }
    });
  };

  return (
    <div className='loadingscreen'>
      <p>loading spinner....</p>
    </div>
  );
};
