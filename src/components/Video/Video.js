import { useState, useRef } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

import styles from './Video.module.scss';
import { Volume, VolumeMute } from '~/components/Icons';

const cx = classNames.bind(styles);

function Video() {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [mute, setMute] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const formatTime = (time) => Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2);

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

  return (
    <div className={cx('wrapper')}>
      <video
        className={cx('video')}
        ref={videoRef}
        preload="metadata"
        poster="https://files.fullstack.edu.vn/f8-tiktok/videos/840-63723a61b9375.jpg"
        onPlay={handlePlay}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src="https://files.fullstack.edu.vn/f8-tiktok/videos/840-63723a60f27a2.mp4" type="video/mp4" />
      </video>

      <div className={cx('controls')}>
        <div className={cx('top-controls')}>
          <div className={cx('playback')}>
            {playing ? (
              <FontAwesomeIcon icon={faPause} onClick={togglePlay} />
            ) : (
              <FontAwesomeIcon icon={faPlay} onClick={togglePlay} />
            )}
          </div>

          <div className={cx('volume')}>
            <div className={cx('volume-icon')} onClick={toggleMute}>
              {mute || !volume ? <VolumeMute /> : <Volume />}
            </div>
            <input
              className={cx('volume-bar')}
              type="range"
              value={volume}
              min="0"
              max="1"
              step="0.01"
              onChange={handleChangeVolume}
            />
          </div>
        </div>

        <div className={cx('progress')}>
          <div className={cx('progress-left')}>
            <progress
              className={cx('progress-bar')}
              value={currentTime}
              min="0"
              max={videoRef.current?.duration}
              step="0.1"
            ></progress>
            <input
              className={cx('seek')}
              type="range"
              value={currentTime}
              min="0"
              max={videoRef.current?.duration}
              step="0.1"
              onChange={handleChangeCurrentTime}
            />
          </div>
          <span className={cx('seek-tooltip')}>
            {formatTime(currentTime)}/{formatTime(videoRef.current?.duration || 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Video;
