import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./Utilities/navbar/navbar";
import { LeftNav } from "./Utilities/leftnav/leftnav";
import { LoadingScreen } from "./components/loadingscreen/loadingscreen";
import Dashboard from "./components/dashboard/dashboard";
import Content from "./components/content/content";
import Analytics from "./components/analytics/analytics";
import Comments from "./components/comments/comments";
import Subtitles from "./components/subtitles/subtitles";
import Customization from "./components/customization/customization";
import { NotFound } from "./components/not-found/notfound";
import { useDispatch, useSelector } from "react-redux";
import { resetNavigationBar, updateWindowWidth } from "../store/App-slice";
import { Videos } from "./components/content/subcomponents/videos";
import { Live } from "./components/content/subcomponents/live";
import { Playlists } from "./components/content/subcomponents/playlists";
import { Podcasts } from "./components/content/subcomponents/podcasts";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
      dispatch(resetNavigationBar());
    });
    dispatch(resetNavigationBar());
  }, []);

  const names = ["Manu", "fpp", 1234, "ate"];
  return isLoggedIn ? (
    <div className='page--manager'>
      <Navbar />
      <div className='leftnav--and--route--handler'>
        <LeftNav />
        <div className='route--handler'>
          <Routes>
            <Route path='/channel/:channelId' element={<Dashboard />} />
            <Route path='/channel/:channelId/videos' element={<Content />}>
              <Route path={`upload`} element={<Videos />} />
              <Route path={`live`} element={<Live />} />
              <Route path={`playlists`} element={<Playlists />} />
              <Route path={`podcasts`} element={<Podcasts />} />
            </Route>
            <Route
              path='/channel/:channelId/analytics'
              element={<Analytics names={names} />}
            />
            <Route path='/channel/:channelId/comments' element={<Comments />} />
            <Route
              path='/channel/:channelId/subtitles'
              element={<Subtitles />}
            />
            <Route
              path='/channel/:channelId/editing'
              element={<Customization />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  ) : (
    <div className='waiting--page'>
      <LoadingScreen />
    </div>
  );
}

export default App;
