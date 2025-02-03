import "./not-allowed.css";

export default function NotAllowed() {
  const handleRedirect = () => {
    window.location.href = window.location.origin;
  };
  return (
    <div className='not-allowed'>
      <div className='header'>
        <img
          src='https://www.gstatic.com/youtube/img/creator/yt_studio_logo.svg'
          alt='studiologo'
        />
      </div>
      <div className='main-content'>
        <img
          class='error-image'
          src='https://www.gstatic.com/youtube/img/creator/error_illustration_v2.svg'
          alt='Error'
        ></img>
        <p className='error-message'>
          You do not have permissions to see this page
        </p>
        <button className='redirect button' onClick={handleRedirect}>
          Return to Studio
        </button>
      </div>
    </div>
  );
}
