import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import styles from './Video.module.scss';

const cx = classNames.bind(styles);

function Video({ data, play = false, onMouseEnter }) {
  const videoRef = useRef();

  if (play) {
    videoRef.current?.play();
  } else {
    videoRef.current?.load();
  }

  return (
    <Link className={cx('wrapper')} to={`/@${data.user.nickname}/${data.uuid}`} onMouseEnter={onMouseEnter}>
      <div className={cx('video-container')}>
        <div className={cx('video')}>
          <video className={cx('player')} ref={videoRef} poster={data.thumb_url} muted loop>
            {play && <source src={data.file_url} type={`video/${data.meta.file_format}`} />}
          </video>
        </div>
        <div className={cx('view-counter')}>
          <FontAwesomeIcon icon={faPlay} />
          <span>{data.views_count}</span>
        </div>
      </div>
      <div className={cx('desc')}>{data.description}</div>
    </Link>
  );
}

Video.propTypes = {
  data: PropTypes.object.isRequired,
  play: PropTypes.bool,
  onMouseEnter: PropTypes.func,
};

export default Video;
