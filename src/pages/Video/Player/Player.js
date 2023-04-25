import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import styles from './Player.module.scss';
import { Volume, VolumeMute } from '~/components/Icons';
import Progress from '~/components/Progress';


const cx = classnames.bind(styles);

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

function Player({ data }) {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);


  useEffect(() => {
    const video = videoRef.current;
    const handleLoadedData = () => setDuration(video.duration);
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);


  const handleStopPropagation = (event) => {
    event.stopPropagation();
  };

  const handleBack = (event) => {
    event.stopPropagation();
    navigate(-1);
  };

  const handleTogglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  const handleToggleMute = (event) => {
    event.stopPropagation();
    setMuted(!muted);
  };

  const handleReport = (event) => {
    event.stopPropagation();
  };

  const handleTimeChange = (event) => {
    videoRef.current.currentTime = event.target.value;
    setCurrentTime(videoRef.current.currentTime);
  };


  return (



    <div className={cx('container')} onClick={handleTogglePlay}>
      <div className={cx('video-wrapper')}>
        <video
          className={cx('video-player')}
          ref={videoRef}
          src={data.file_url}
          autoPlay
          loop
          muted={muted}
        >
          <source src={data.file_url} type={data.meta?.mime_type} />
        </video>

        <div className={cx('controller')} onClick={handleStopPropagation}>
          <Progress
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleTimeChange}
          />
          <div className={cx('progress-time')}>{`${formatTime(currentTime)}/${formatTime(duration)}`}</div>
        </div>
      </div>

      <span className={cx('btn', 'back-btn')} onClick={handleBack}>
        <FontAwesomeIcon icon={faXmark} />
      </span>

      {!playing && <FontAwesomeIcon className={cx('play-icon')} icon={faPlay} />}

      <span className={cx('btn', 'report-btn')} onClick={handleReport}>
        <FontAwesomeIcon className={cx('before-icon')} icon={faFlag} />
        Report
      </span>

      <span className={cx('btn', 'volume-btn')} onClick={handleToggleMute}>
        {muted ? <VolumeMute /> : <Volume />}
      </span>
    </div>



  );
}


Player.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Player;
