import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const currentChannelId = useSelector(
    (state) => state.auth.userData.currentChannelId
  );

  useEffect(() => {
    if (currentChannelId) {
      navigate(`/channel/${currentChannelId}`);
    }
  }, []);
  return <div>Not found</div>;
};
