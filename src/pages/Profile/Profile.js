import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faEllipsis, faLink, faLock } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';

import styles from './Profile.module.scss';
import Loading from '~/components/Loading';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import Video from './Video';
import { userServices } from '~/services';
import { UserIcon, ShareIcon } from '~/components/Icons';
import auth from '~/auth';

const cx = classNames.bind(styles);

function Profile() {
  const [user, setUser] = useState();
  const [isTabVideos, setIsTabVideos] = useState(true);
  const [playing, setPlaying] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const [likedVideos, setLikedVideos] = useState([]);
  const params = useParams();

  useEffect(() => {
    userServices.getUser(params.nickname).then((data) => {
      setUser(data);
      setIsFollowed(data.is_followed);
    });
  }, [params.nickname]);

  useEffect(() => {
    if (user?.id) {
      userServices.getLikedVideos(user.id).then((data) => {
        setLikedVideos(data);
      });
    }
  }, [user?.id]);

  const currentUser = auth.getCurrentUser();
  const isCurrentUser = currentUser?.nickname === params.nickname;
  const fullname = `${user?.first_name} ${user?.last_name}`.trim();

  const handleFollow = () => {
    userServices.followUser(user.id);
    setIsFollowed(true);
  };

  const handleUnfollow = () => {
    userServices.unfollowUser(user.id);
    setIsFollowed(false);
  };

  return user?.nickname !== params.nickname ? (
    <Loading />
  ) : (
    <div className={cx('wrapper')}>
      <div className={cx('info')}>
        <div className={cx('main-info')}>
          <Avatar className={cx('avatar')} src={user.avatar} alt={user.nickname} />
          <div className={cx('main-right')}>
            <h2 className={cx('nickname')}>
              {user.nickname}
              {user.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
            </h2>
            <p className={cx('fullname')}>{fullname || user.nickname}</p>
            {!isCurrentUser ? ( // if not me
              !isFollowed ? (
                <Button className={cx('btn', 'follow-btn')} type="fill" color="primary" onClick={handleFollow}>
                  Follow
                </Button>
              ) : (
                <Button className={cx('btn', 'unfollow-btn')} type="border" onClick={handleUnfollow}>
                  Unfollow
                </Button>
              )
            ) : (
              <Button className={cx('btn', 'edit-btn')} type="border">
                <FontAwesomeIcon icon={faEdit} />
                Edit profile
              </Button>
            )}
          </div>
        </div>

        <div className={cx('numbers')}>
          <div className={cx('counter')}>
            <strong>{user.followings_count}</strong> Following
          </div>
          <div className={cx('counter')}>
            <strong>{user.followers_count}</strong> Followers
          </div>
          <div className={cx('counter')}>
            <strong>{user.likes_count}</strong> Likes
          </div>
        </div>
        <div className={cx('bio')}>
          {user.bio.split('\n').map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>

        {/* URLs */}
        <>
          {user.website_url && (
            <a className={cx('link')} href={user.website_url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
              <span>{user.website_url}</span>
            </a>
          )}
          {user.facebook_url && (
            <a className={cx('link')} href={user.facebook_url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
              <span>{user.facebook_url}</span>
            </a>
          )}
          {user.youtube_url && (
            <a className={cx('link')} href={user.youtube_url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
              <span>{user.youtube_url}</span>
            </a>
          )}
          {user.twitter_url && (
            <a className={cx('link')} href={user.twitter_url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
              <span>{user.twitter_url}</span>
            </a>
          )}
          {user.instagram_url && (
            <a className={cx('link')} href={user.instagram_url} target="_blank" rel="noreferrer">
              <FontAwesomeIcon className={cx('link-icon')} icon={faLink} />
              <span>{user.instagram_url}</span>
            </a>
          )}
        </>
        <div className={cx('actions')}>
          <ShareIcon />
          {!isCurrentUser && <FontAwesomeIcon icon={faEllipsis} />}
        </div>
      </div>
      <div className={cx('videos')}>
        <div className={cx('tabs')}>
          <p className={cx('tab', { active: isTabVideos })} onClick={() => setIsTabVideos(true)}>
            Videos
          </p>
          <p className={cx('tab', { active: !isTabVideos })} onClick={() => setIsTabVideos(false)}>
            <FontAwesomeIcon icon={faLock} />
            Liked
          </p>
        </div>
        {isTabVideos ? (
          user.videos.length ? (
            <div className={cx('videos-container')}>
              {user.videos.map((video) => (
                <Video
                  key={video.id}
                  play={playing === video.id}
                  data={video}
                  onMouseEnter={() => setPlaying(video.id)}
                />
              ))}
            </div>
          ) : (
            <div className={cx('not-videos')}>
              <UserIcon className={cx('not-icon')} />
              <p className={cx('not-main')}>No content</p>
              <p className={cx('not-desc')}>This user has not published any videos.</p>
            </div>
          )
        ) : likedVideos?.length ? (
          <div className={cx('videos-container')}>
            {likedVideos?.map((video) => (
              <Video
                key={video.id}
                play={playing === video.id}
                data={video}
                onMouseEnter={() => setPlaying(video.id)}
              />
            ))}
          </div>
        ) : (
          // pro className =))
          <div className={cx('not-videos')}>
            {isCurrentUser ? (
              <>
                <UserIcon className={cx('not-icon')} />
                <p className={cx('not-main')}>No liked videos yet</p>
                <p className={cx('not-desc')}>Your videos will appear here</p>
              </>
            ) : (
              <>
                <FontAwesomeIcon className={cx('not-icon')} icon={faLock} />
                <p className={cx('not-main')}>This user's liked videos are private</p>
                <p className={cx('not-desc')}>Videos liked by {user.nickname} are currently hidden</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
