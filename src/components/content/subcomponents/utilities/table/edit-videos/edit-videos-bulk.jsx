import EditOption from "./components/edit-options";
import AddToPlaylist from "./components/add-to-playlist";
import MoreActions from "./components/more-actions";
import { useSelector } from "react-redux";

export default function EditVideosBulk() {
  const selectedIds = useSelector((state) => state.table.selectedIds);
  const deleting = useSelector((state) => state.videos.deleting);
  return (
    <div className={`edit-video-bulk ${selectedIds.length > 0 ? "show" : ""}`}>
      <div className={`loader deleting-spinner ${deleting ? "deleting" : ""}`}>
        <svg viewBox='25 25 50 50'>
          <circle r='20' cy='50' cx='50'></circle>
        </svg>
      </div>
      <div className='number-selected toolbar-section'>{selectedIds.length} selected</div>
      <div className='right-side-toolbar'>
        <EditOption />
        <AddToPlaylist />
        <MoreActions />
      </div>
    </div>
  );
}
