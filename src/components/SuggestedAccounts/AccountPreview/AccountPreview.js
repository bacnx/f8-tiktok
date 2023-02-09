import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { userServices } from '~/services';
import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';
import Avatar from '~/components/Avatar';

const cx = classNames.bind(styles);

function AccountPreview({ data }) {
  const [isFollowed, setIsFollowed] = useState(data.is_followed);
  const full_name = data.first_name + ' ' + data.last_name;

  const handleFollow = () => {
    userServices.followUser(data.id);
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    userServices.unfollowUser(data.id);
    setIsFollowed(false);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <Avatar className={cx('avatar')} src={data.avatar} alt={full_name} />

        {isFollowed ? (
          <Button className={cx('button', 'button-following')} type="border" onClick={handleUnfollow}>
            Following
          </Button>
        ) : (
          <Button className={cx('button')} color="primary" type="fill" onClick={handleFollow}>
            Follow
          </Button>
        )}
      </div>
      <div className={cx('body')}>
        <p className={cx('username')}>
          <strong>{data.nickname}</strong>
          {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
        </p>
        <p className={cx('name')}>{full_name}</p>
        <p className={cx('statistical')}>
          <strong className={cx('value')}>{data.followers_count} </strong>
          <span className={cx('label')}>Followers</span>
          <strong className={cx('value')}>{data.likes_count} </strong>
          <span className={cx('label')}>Like</span>
        </p>
      </div>
    </div>
  );
}

AccountPreview.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountPreview;
