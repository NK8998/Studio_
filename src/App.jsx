import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { LoadingScreen } from "./components/loadingscreen/loadingscreen";
import Dashboard from "./components/dashboard/dashboard";
import Content from "./components/content/content";
import Analytics from "./components/analytics/analytics";
import Comments from "./components/comments/comments";
import Subtitles from "./components/subtitles/subtitles";
import Customization from "./components/customization/customization";
import { NotFound } from "./components/not-found/notfound";
import { useDispatch, useSelector } from "react-redux";
import { resetNavigationBar, updateWindowWidth } from "./store/App-slice";
import { Videos } from "./components/content/subcomponents/videos";
import { Live } from "./components/content/subcomponents/live";
import { Playlists } from "./components/content/subcomponents/playlists";
import { Podcasts } from "./components/content/subcomponents/podcasts";
import { UploadCard } from "./components/dashboard/subcomponents/firstcard";
import { LeftNav } from "./high-level-components/leftnav/leftnav";
import { Navbar } from "./high-level-components/navbar/navbar";
import AdditionalDataSubmission from "./Utilities/additional-data-submission";
import { Shorts } from "./components/content/subcomponents/shorts";
import { DeleteHandler } from "./components/content/subcomponents/utilities/table/edit-videos/components/more-actions";
import { Toaster } from "sonner";
import NotAllowed from "./components/not-allowed/not-allowed";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const authenticated = useSelector((state) => state.auth.authenticated);
  const isAllowed = useSelector((state) => state.auth.isAllowed);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
      dispatch(resetNavigationBar());
    });
    dispatch(resetNavigationBar());
  }, []);

  const names = ["Manu", "fpp", 1234, "ate"];
  if (!authenticated) {
    return <LoadingScreen />;
  }

  if (!isAllowed) {
    return <NotAllowed />;
  }

  return (
    <>
      <Toaster position='bottom-center' expand={true} />
      <div className='page--manager'>
        <Navbar />
        <div className='leftnav--and--route--handler'>
          <LeftNav />
          <div className='route--handler'>
            <Routes>
              <Route path='/channel/:channelId' element={<Dashboard />} />
              <Route path='/channel/:channelId/videos' element={<Content />}>
                <Route path={`upload`} element={<Videos />} />
                <Route path={`shorts`} element={<Shorts />} />
                <Route path={`live`} element={<Live />} />
                <Route path={`playlists`} element={<Playlists />} />
                <Route path={`podcasts`} element={<Podcasts />} />
              </Route>
              <Route
                path='/channel/:channelId/analytics'
                element={<Analytics names={names} />}
              />
              <Route
                path='/channel/:channelId/comments'
                element={<Comments />}
              />
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
      <UploadCard />
      <AdditionalDataSubmission />
      <DeleteHandler />
    </>
  );
}

export default App;
