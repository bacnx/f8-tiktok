import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCode,
  faComment,
  faHeart,
  faMusic,
  faShare,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import Comment from './Comment';

const cx = classNames.bind(styles);

function Video() {
  const params = useParams();
  const navigate = useNavigate();

  console.log(params);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('left')}>
        <span className={cx('back-button')} onClick={handleBack}>
          <FontAwesomeIcon icon={faXmark} />
        </span>
      </div>

      <div className={cx('right')}>
        <div className={cx('account')}>
          <Avatar
            className={cx('avatar')}
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/9ad47e71816c884b785dd10891662bf3~c5_100x100.jpeg?x-expires=1676462400&x-signature=PawNl3FAZy4Fc0JFmxTk%2BwM9n6w%3D"
            alt="f8official"
          />
          <div className={cx('name')}>
            <strong className={cx('nickname')}>
              f8official
              <FontAwesomeIcon icon={faCheckCircle} />
            </strong>
            <p className={cx('fullname')}>F8 - Học Lập Trình Để Đi Làm · 2022-2-9</p>
          </div>
          <Button className={cx('follow-btn')} type="border" color="primary">
            Follow
          </Button>
        </div>

        <div className={cx('content')}>
          <p className={cx('desc')}>Ai thấu nỗi đau này</p>
          <Link to="#" className={cx('music')}>
            <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
            {/* {data.music || data.user.nickname} */}
            nhạc nền - F8 Official - F8
          </Link>
        </div>

        <div className={cx('actions')}>
          <div className={cx('icon-btns')}>
            <div className={cx('post-actions')}>
              <div className={cx('post-action', 'like')}>
                <div className={cx('icon-wrapper')}>
                  <FontAwesomeIcon className={cx('action-icon', 'liked')} icon={faHeart} />
                </div>
                <span className={cx('action-count')}>3704</span>
              </div>
              <div className={cx('post-action')}>
                <div className={cx('icon-wrapper')}>
                  <FontAwesomeIcon className={cx('action-icon')} icon={faComment} />
                </div>
                <span className={cx('action-count')}>55</span>
              </div>
            </div>
            <div className={cx('share-actions')}>
              <span className={cx('code')}>
                <FontAwesomeIcon className={cx('share-action')} icon={faCode} />
              </span>
              <FontAwesomeIcon className={cx('share-action', 'telegram')} icon={faTelegram} />
              <FontAwesomeIcon className={cx('share-action', 'facebook')} icon={faFacebook} />
              <span className={cx('twitter')}>
                <FontAwesomeIcon className={cx('share-action')} icon={faTwitter} />
              </span>
              <span className={cx('more')}>
                <FontAwesomeIcon className={cx('share-more')} icon={faShare} />
              </span>
            </div>
          </div>
          <div className={cx('copy-action')}>
            <span className={cx('copy-text')}>
              https://www.tiktok.com/@f8official/video/7062654710624374017?is_from_webapp=1&sender_device=pc&web_id=7194249284311614977
            </span>
            <div className={cx('copy-button')}>Copy link</div>
          </div>
        </div>

        <div className={cx('comments')}>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>

        <div className={cx('post-comment')}>
          <input className={cx('comment-input')} text="text-area" placeholder="Add comment..." />
          <span className={cx('comment-button')}>Post</span>
        </div>
      </div>
    </div>
  );
}

export default Video;
