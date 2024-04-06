export default function Visibility({ curIndex }) {
  return (
    <div className={`details-inner visiblity ${curIndex === 3 ? "visible" : ""}`}>
      <p className='details-role-title'>Visibility</p>
      <div className='visibility-sections'>
        <div className='left-side-visibility'>
          <p className='details-role-description'>Choose when to publish and who can see your video</p>
          <div className='visibility-card'>
            <p className='visibility-title'>Save or publish</p>
            <p className='visibility-card-description'>
              Make your video <span>public</span>, <span>unlisted</span> or <span>private</span>
            </p>
            <div className='visibility-options'>
              <div className='visibility-option'>
                <div className='selector'></div>
                <div className='visibility-description'>
                  <p>Private</p>
                  <p>Only you and people who you choose can watch your video</p>
                </div>
              </div>
              <div className='visibility-option'>
                <div className='selector'></div>
                <div className='visibility-description'>
                  <p>Unlisted</p>
                  <p>Anyone with the video link can watch your video</p>
                </div>
              </div>
              <div className='visibility-option'>
                <div className='selector'></div>
                <div className='visibility-description'>
                  <p>Public</p>
                  <p>Everyone can watch your video</p>
                  <div className='premiere-selector'>
                    <div className='selector square'></div>
                    <p>Set as instant Premiere</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='schedule-picker'></div>
        </div>
        <div className='right-side-visibility'>
          <div className='video-representation'></div>
        </div>
      </div>
    </div>
  );
}
