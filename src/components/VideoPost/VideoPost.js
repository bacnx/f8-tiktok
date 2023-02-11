import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCommentDots, faHeart, faMusic, faShare } from '@fortawesome/free-solid-svg-icons';

import { userServices, videoServices } from '~/services';
import styles from './VideoPost.module.scss';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import Video from '~/components/Video';

const cx = classNames.bind(styles);

function VideoPost({ data }) {
  const [isFollowed, setIsFollowed] = useState(data.user.is_followed);
  const [isLiked, setIsLiked] = useState(data.is_liked);
  const [likesCount, setLikesCount] = useState(data.likes_count);
  const fullName = data.user.first_name + ' ' + data.user.last_name;
  const profileLink = `/@${data.user.nickname}`;

  const handleFollow = () => {
    userServices.followUser(data.id);
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    userServices.unfollowUser(data.id);
    setIsFollowed(false);
  };

  const handleLike = () => {
    videoServices.like(data.id);
    setIsLiked(true);
    setLikesCount(likesCount + 1);
  };

  const handleUnlike = () => {
    videoServices.unlike(data.id);
    setIsLiked(false);
    setLikesCount(likesCount - 1);
  };

  return (
    <div className={cx('wrapper')}>
      <Link className={cx('avatar-link')} to={profileLink}>
        <Avatar className={cx('avatar')} src={data.user.avatar} />
      </Link>
      <div className={cx('body')}>
        <div className={cx('info')}>
          <Link className={cx('name')} to={profileLink}>
            <span className={cx('username')}>{data.user.nickname}</span>
            {data.user.tick && <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />}
            <span className={cx('fullname')}>{fullName}</span>
          </Link>

          {isFollowed ? (
            <Button className={cx('follow-btn', 'following-btn')} type="border" size="small" onClick={handleUnfollow}>
              Following
            </Button>
          ) : (
            <Button className={cx('follow-btn')} type="border" size="small" color="primary" onClick={handleFollow}>
              Follow
            </Button>
          )}

          <p className={cx('desc')}>{data.description}</p>
          <Link to="#" className={cx('music')}>
            <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
            {data.music || data.user.nickname}
          </Link>
        </div>
        <div className={cx('video-wrapper')}>
          <Video data={data} />

          <div>
            <div
              className={cx('action-btn', { liked: isLiked })}
              onClick={() => (isLiked ? handleUnlike() : handleLike())}
            >
              <div className={cx('action-circle')}>
                <FontAwesomeIcon className={cx('action-icon')} icon={faHeart} />
              </div>
              <span className={cx('action-count')}>{likesCount}</span>
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
