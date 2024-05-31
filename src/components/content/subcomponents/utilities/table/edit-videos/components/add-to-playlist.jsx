import { CountDropDown } from "../../../../../../../assets/contentelements";

export default function AddToPlaylist() {
  return (
    <div className='add-to-playlist toolbar-section'>
      <button className='toolbar-section-button toolbar-section'>
        <p>Add to playlist</p>
        <CountDropDown />
      </button>
    </div>
  );
}
