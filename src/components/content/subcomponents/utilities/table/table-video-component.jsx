export const TableVideoComponent = ({ id, thumbnail, title, description, timestamp }) => {
  return (
    <div className='table-row-video-data Video'>
      <div className='row-thumbnail'>
        <img src={thumbnail} alt='row-thumbnail' />
        <div className='row-timestamp'>{timestamp}</div>
      </div>
      <div className='row-video-info'>
        <p className='row-title'>{title}</p>
        <p className='row-description'>{description}</p>
      </div>
    </div>
  );
};
