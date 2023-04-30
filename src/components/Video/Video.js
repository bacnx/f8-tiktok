import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './Video.module.scss';
import { Volume, VolumeMute } from '~/components/Icons';
import Progress from '~/components/Progress';

const cx = classNames.bind(styles);

function Video({ data }) {
  const navigate = useNavigate();
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (time) => ('0' + Math.floor(time / 60)).slice(-2) + ':' + ('0' + Math.floor(time % 60)).slice(-2);
  const duration = videoRef.current?.duration;

  const togglePlay = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handlePlay = () => {
    setPlaying(true);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handleChangeCurrentTime = (event) => {
    setCurrentTime(event.target.value);
    videoRef.current.currentTime = event.target.value;
  };

  const handleChangeVolume = (event) => {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setMute(!mute);
  };

  const handleClick = () => {
    navigate(`/@${data.user.nickname}/video/${data.uuid}`);
  };

  return (



    <div className={cx('wrapper')} onClick={handleClick}>
      <video
        className={cx('video')}
        ref={videoRef}
        preload="metadata"
        loop
        poster={data.thumb_url}
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={data.file_url} type={`video/${data.meta.file_format}`} />
      </video>

      <div className={cx('controls')} onClick={(e) => e.stopPropagation()}>
        <div className={cx('top-controls')}>
          <div className={cx('playback')} onClick={togglePlay}>
            {playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </div>

          <div className={cx('volume')}>
            <div className={cx('volume-icon')} onClick={toggleMute}>
              {mute || !volume ? <VolumeMute /> : <Volume />}
            </div>
            <Progress
              className={cx('progress-volume')}
              min={0}
              max={1}
              step={0.01}
              value={volume}
              border
              thumb
              onChange={handleChangeVolume}
            />
          </div>
        </div>

        {duration >= 30 && <div className={cx('progress')}>
          <Progress
            min={0}
            max={duration}
            step={0.1}
            value={currentTime}
            onChange={handleChangeCurrentTime}
          />
          <span className={cx('progress-time')}>
            {formatTime(currentTime)}/{formatTime(duration || 0)}
          </span>
        </div>}
      </div>
    </div>



  );
}

Video.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Video;
