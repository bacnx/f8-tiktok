import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis, faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import Avatar from '~/components/Avatar';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment({ data, isCreater }) {
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(null);

  const user = data.user || ({});
  const fullname = `${user.first_name} ${user.last_name}`?.trim() || user.nickname;
  const createdAtDate = data.created_at?.split(' ')?.shift();
  const profileLink = `/@${data.user.nickname}`;

  useEffect(() => {
    setLiked(data.is_liked);
    setLikedCount(data.likes_count);
  }, [data]);


  const handleToggleLike = () => {
    if (liked) {
      setLiked(false);
      setLikedCount(likedCount - 1);
    } else {
      setLiked(true);
      setLikedCount(likedCount + 1);
    }
  };


  return (



    <div className={cx('wrapper')}>
      <Link className={cx('avatar-link')} to={profileLink}>
        <Avatar className={cx('avatar')} src={user.avatar} alt={user.nickname} />
      </Link>

      <div className={cx('body')}>
        <Link className={cx('name-link')} to={profileLink}>
          <div className={cx('name')}>
            <strong>{fullname}</strong>
            {user.tick && <FontAwesomeIcon icon={faCheckCircle} />}
            {isCreater && <span className={cx('title')}>Creater</span>}
          </div>
        </Link>
        <p className={cx('content')}>
          {data.comment}
        </p>
        <div className={cx('informations')}>
          <span className={cx('date')}>{createdAtDate}</span>
          <span className={cx('reply-btn')}>Reply</span>
        </div>
      </div>

      <div className={cx('actions')}>
        <FontAwesomeIcon className={cx('more')} icon={faEllipsis} />
        <div className={cx('like')} onClick={handleToggleLike}>
          {liked ? (
            <FontAwesomeIcon className={cx('icon', 'liked')} icon={faHeartFill} />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
          )}
          <span className={cx('count')}>{likedCount}</span>
        </div>
      </div>
    </div>



  );
}

export default Comment;
