export default function EditVideosBulk({ selectedIds }) {
  return (
    <div className={`edit-video-bulk ${selectedIds.length > 0 ? "show" : ""}`}>
      <div className='number-selected'></div>
      <div className='edit-options'></div>
      <div className='add-to-playlist'></div>
      <div className='more-actions'></div>
    </div>
  );
}
