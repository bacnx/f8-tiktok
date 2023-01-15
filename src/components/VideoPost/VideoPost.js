import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';

import styles from './VideoPost.module.scss';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import Video from '~/components/Video';

const cx = classNames.bind(styles);

function VideoPost({ data }) {
  const fullName = data.user.first_name + ' ' + data.user.last_name;

  return (
    <div className={cx('wrapper')}>
      <Avatar className={cx('avatar')} src={data.user.avatar} />
      <div className={cx('body')}>
        <div className={cx('info')}>
          <div className={cx('name')}>
            <span className={cx('username')}>{data.user.nickname}</span>
            {data.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
            <span className={cx('fullname')}>{fullName}</span>
          </div>

          <Button className={cx('follow-btn')} type="border" size="small" color="primary">
            Follow
          </Button>

          <p className={cx('desc')}>{data.description}</p>
          <Link to="#" className={cx('music')}>
            <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
            {data.music}
          </Link>
        </div>
        <div className={cx('video-wrapper')}>
          <Video data={data} />

          <div>
            <div className={cx('action-btn')}>
              <div className={cx('action-circle')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faHeart} />
              </div>
              <span className={cx('action-count')}>{data.likes_count}</span>
            </div>
            <div className={cx('action-btn')}>
              <div className={cx('action-circle')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faCommentDots} />
              </div>
              <span className={cx('action-count')}>{data.comments_count}</span>
            </div>
            <div className={cx('action-btn')}>
              <div className={cx('action-circle')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faShare} />
              </div>
              <span className={cx('action-count')}>{data.shares_count}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

VideoPost.propTypes = {
  data: PropTypes.object.isRequired,
};

export default VideoPost;
