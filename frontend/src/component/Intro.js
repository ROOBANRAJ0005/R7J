import introVedio from '../assets/vedios/intro2.mp4'

export const Intro = ({ onEnd }) => {
  return (
    <div className="landing-video-wrapper">
      <video
        autoPlay
        muted
        className="landing-video"
        onEnded={onEnd} // 👈 triggers when video ends
      >
        <source src= {introVedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional Skip Button */}
      <button className="skip-btn" onClick={onEnd}>
        Skip Intro
      </button>
    </div>
  );
};

