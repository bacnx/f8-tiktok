import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis, faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import Avatar from '~/components/Avatar';
import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

function Comment() {
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(91);

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
      <Avatar className={cx('avatar')} src="https://www.tiktok.com/@hoaa.hanassii" alt="hoaa.hanassii" />

      <div className={cx('body')}>
        <div className={cx('name')}>
          <strong>Đào Lê Phương Hoa</strong>
          <FontAwesomeIcon icon={faCheckCircle} />
          <span className={cx('title')}>Creater</span>
        </div>
        <p className={cx('content')}>
          ở đầu mặc màu trắng/ màu tương phản với màu đen thì váy ở đoạn sau nó sẽ nổi bật và chinh hơn đó ạ🥺
        </p>
        <div className={cx('informations')}>
          <span className={cx('date')}>2-9</span>
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
