import { useRef, useState } from "react";
import { CountDropDown } from "../../../../../../../assets/contentelements";
import { useDispatch, useSelector } from "react-redux";
import { deleteVideos, toggleDeletingModal } from "../../../../../../../store/Videos-slice";
import { toast } from "sonner";

export default function MoreActions() {
  const selectedIds = useSelector((state) => state.table.selectedIds);
  const isDeleting = useSelector((state) => state.videos.deleting);
  const videos = useSelector((state) => state.videos.videos);
  const [boxShowing, setBoxShowing] = useState(false);
  const buttonRef = useRef(null);
  const dispatch = useDispatch();

  const handleOutSideClick = (e) => {
    if (e.target !== buttonRef.current && !e.target.closest(".more-actions.toolbar-section") && !e.target.closest(".more-actions.options-selector")) {
      setBoxShowing(false);
      document.removeEventListener("click", handleOutSideClick);
    }
  };
  const handleClick = () => {
    setBoxShowing((prevState) => !prevState);

    document.addEventListener("click", handleOutSideClick);
  };

  const handleDownload = () => {
    if (isDeleting) return;
    if (selectedIds.length !== 1) return; // Ensure only one video is selected

    const video = videos.find((video) => video.video_id === selectedIds[0]);
    const downloadables = video.downloadables;
    if (!downloadables || !downloadables["downloadableUrl-0"]) {
      toast.info("Download URL for this video is not available");
      return;
    }
    const urls = Object.values(downloadables).sort((a, b) => {
      // Extract resolution number from the URL using a regex
      let resA = parseInt(a.match(/video-(\d+)/)[1], 10);
      let resB = parseInt(b.match(/video-(\d+)/)[1], 10);

      // Compare resolution numbers numerically
      return resA - resB;
    });

    const downloadableUrl = urls[urls.length - 1];

    const filename = video.title;

    const link = document.createElement("a");
    link.href = downloadableUrl;
    link.target = "_blank"; // Open in a new tab
    link.style.display = "none";
    link.download = filename;
    // Trigger the download
    link.click();
  };

  return (
    <div className='more-actions toolbar-section'>
      <button ref={buttonRef} className='toolbar-section-button toolbar-section more-actions-button' onClick={handleClick}>
        <p>More actions</p>
        <CountDropDown />
      </button>
      <div className={`more-actions options-selector ${boxShowing ? "show" : ""}`}>
        <p className={`download ${selectedIds.length > 1 ? "inactive" : ""}`} onClick={handleDownload}>
          Download
        </p>
        <p className='delete' onClick={() => dispatch(toggleDeletingModal(true))}>
          Delete forever
        </p>
      </div>
    </div>
  );
}

export function DeleteHandler() {
  const isDeleting = useSelector((state) => state.videos.deleting);
  const selectedIds = useSelector((state) => state.table.selectedIds);
  const deletingModalShowing = useSelector((state) => state.videos.deletingModalShowing);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const descriptionString = `${selectedIds.length} ${selectedIds.length > 1 ? "videos are" : "video is"} about to be deleted `;

  const deleteVideo = () => {
    if (isDeleting) return;
    if (!isChecked) return;
    dispatch(deleteVideos(selectedIds));
    dispatch(toggleDeletingModal(false));
  };

  return (
    <div className={`delete-modal-wrapper ${deletingModalShowing ? "show" : ""}`}>
      <div className='delete-modal'>
        <p className='modal-action-title'>Delete forever</p>
        <div className='modal-action-dewscription-wrapper'>
          <p className='modal-action-dewscription warning'>{descriptionString}</p>
        </div>
        <div className='affirm-action' onClick={() => setIsChecked((prevState) => !prevState)}>
          <div className='checkbox-wrapper-46'>
            <div className={`checkbox-row-data ${isChecked ? "checked" : ""}`}></div>
            <label htmlFor='cbx-46' className='cbx'>
              <span>
                <svg viewBox='0 0 12 10' height='10px' width='12px'>
                  <polyline points='1.5 6 4.5 9 10.5 1'></polyline>
                </svg>
              </span>
            </label>
          </div>
          <p>I understand that deleting is permanent, and can't be undone</p>
        </div>
        <div className='delete-modal-affirmative-buttons'>
          <button className='cancel-deletion' onClick={() => dispatch(toggleDeletingModal(false))}>
            CANCEL
          </button>
          <button className={`confirm-deletion ${isChecked ? "active" : ""}`} onClick={deleteVideo}>
            DELETE FOREVER
          </button>
        </div>
      </div>
    </div>
  );
}
