import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';

import styles from './VideoPost.module.scss';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import Video from '~/components/Video';

const cx = classNames.bind(styles);

function VideoPost() {
  return (
    <div className={cx('wrapper')}>
      <Avatar className={cx('avatar')} />
      <div className={cx('body')}>
        <div className={cx('info')}>
          <div className={cx('name')}>
            <span className={cx('username')}>hoaahanasii</span>
            <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
            <span className={cx('fullname')}>Đào Lê Phương Hoa</span>
          </div>

          <Button className={cx('follow-btn')} type="border" size="small" color="primary">
            Follow
          </Button>

          <p className={cx('desc')}>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <Link to="#" className={cx('music')}>
            <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
            Lorem ipsum dolor sit amet.
          </Link>
        </div>
        <div className={cx('video-wrapper')}>
          <Video />

          <div>
            <div className={cx('action-btn')}>
              <div className={cx('action-circle')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faHeart} />
              </div>
              <span className={cx('action-count')}>121.3K</span>
            </div>
            <div className={cx('action-btn')}>
              <div className={cx('action-circle')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faCommentDots} />
              </div>
              <span className={cx('action-count')}>411</span>
            </div>
            <div className={cx('action-btn')}>
              <div className={cx('action-circle')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faShare} />
              </div>
              <span className={cx('action-count')}>140</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoPost;
