import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/loadingscreen.css";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../store/Auth-slice";
import axios from "axios";

export const LoadingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // set both userID and channelID in localStorage and in cookie. LocalStorage for quick check.
    // check user's cookie if it does not exist then redirect to OAuth. Keep the target url then redirect back here
    // fetch user's data using the cookie
    // if (!localStorage.getItem("SCID") || !localStorage.getItem("SUID")) {
    //   window.location.href = `http://localhost:5174?WAA=Studio`;
    // }

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
    axios
      .get(`http://localhost:8873/Verify-cookie?SCID=${SCID}&SUID=${SUID}`, {
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.message !== "verified") {
          document.write("Token mismatch");
        } else {
          const userData = { currentChannelId: SCID };
          dispatch(userLoggedIn(userData));
          if (window.location.pathname === "/") {
            navigate(`/channel/${SCID}`);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setCredentials = () => {
    axios
      .get("http://localhost:8873/set-cookie", { withCredentials: true })
      .then((response) => {
        if (response.data.redirect === true) {
          window.location.href = `http://localhost:5174?WAA=Studio`;
        } else {
          const SCID = response.data.SCID;
          const SUID = response.data.SUID;
          localStorage.setItem("SCID", JSON.stringify(SCID));
          localStorage.setItem("SUID", JSON.stringify(SUID));

          const userData = { currentChannelId: SCID };
          dispatch(userLoggedIn(userData));
          if (window.location.pathname === "/") {
            navigate(`/channel/${SCID}`);
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className='loadingscreen'>
      <p>loading spinner....</p>
    </div>
  );
};
