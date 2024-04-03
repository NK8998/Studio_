import { FeedbackIcon, SettingsIcon } from "../../../assets/leftnavelements";

export const Bottom = ({ expand }) => {
  return (
    <div className={`leftnav-bottom ${expand ? "expand" : "collapse"}`}>
      <div className={`middle-container ${expand ? "expand" : "collapse"}`}>
        <SettingsIcon />
        <p>Settings</p>
      </div>
      <div className={`middle-container ${expand ? "expand" : "collapse"}`}>
        <FeedbackIcon />
        <p>Send feedback</p>
      </div>
    </div>
  );
};
