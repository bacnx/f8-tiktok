import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis, faHeart as faHeartFill } from '@fortawesome/free-solid-svg-icons';
import { faHeart, faFlag, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';

import Avatar from '~/components/Avatar';
import Login from '~/components/Login';
import Menu from '~/components/Popper/Menu';
import styles from './Comment.module.scss';
import { commentServices } from '~/services';
import auth from '~/auth';
import { useModal } from '~/hooks';

const cx = classNames.bind(styles);

function Comment({ data, isCreater, onReply, onDelete }) {
  const { isShowing, toggle } = useModal();
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(null);

  const user = data.user || ({});
  const fullname = `${user.first_name} ${user.last_name}`?.trim() || user.nickname;
  const createdAtDate = data.created_at?.split(' ')?.shift();
  const profileLink = `/@${data.user.nickname}`;
  const isLoged = !!auth.getToken();

  let menuItems = [
    {
      type: 'report',
      title: 'Report',
      icon: <FontAwesomeIcon icon={faFlag} />,
    }
  ];

  if (isLoged) {
    menuItems = [...menuItems, {
      type: 'delete',
      title: 'Delete',
      icon: <FontAwesomeIcon icon={faTrashCan} />,
    }];
  }

  useEffect(() => {
    setLiked(data.is_liked);
    setLikedCount(data.likes_count);
  }, [data]);


  const handleToggleLike = () => {
    if (!isLoged) {
      toggle();
      return;
    }

    if (liked) {
      setLiked(false);
      setLikedCount(likedCount - 1);
      commentServices.unlike(data.id);
    } else {
      setLiked(true);
      setLikedCount(likedCount + 1);
      commentServices.like(data.id);
    }
  };

  // call when click to an item of popper menu
  const handleMenuChange = (item) => {
    switch (item.type) {
      case 'delete':
        onDelete(data.id);
        break;
      default:
        console.warn("Haven't this type");
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
          <span className={cx('reply-btn')} onClick={() => onReply(data.user.nickname)}>Reply</span>
        </div>
      </div>

      <div className={cx('actions')}>
        <Menu items={menuItems} onChange={handleMenuChange}>
          <FontAwesomeIcon className={cx('more')} icon={faEllipsis} />
        </Menu>
        <div className={cx('like')} onClick={handleToggleLike}>
          {liked ? (
            <FontAwesomeIcon className={cx('icon', 'liked')} icon={faHeartFill} />
          ) : (
            <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
          )}
          <span className={cx('count')}>{likedCount}</span>
        </div>
      </div>


      <Login isShowing={isShowing} hide={toggle} />
    </div>



  );
}

Comment.propTypes = {
  data: PropTypes.object.isRequired,
  isCreater: PropTypes.bool,
  onReply: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Comment;
