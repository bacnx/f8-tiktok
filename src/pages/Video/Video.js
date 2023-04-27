import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faCode,
  faComment,
  faHeart,
  faMusic,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';
import styles from './Video.module.scss';
import Avatar from '~/components/Avatar';
import Button from '~/components/Button';
import Login from '~/components/Login';
import Loading from '~/components/Loading';
import Comment from './Comment';
import Player from './Player';
import { userServices, videoServices, commentServices } from '~/services';
import auth from '~/auth';
import { useModal } from '~/hooks';

const cx = classNames.bind(styles);

function Video() {
  const params = useParams();
  const commentInputRef = useRef(null);
  const { isShowing, toggle } = useModal();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [comments, setComments] = useState([]); // list of comments
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [commentText, setCommentText] = useState(''); // comment text in input

  const isLoged = !!auth.getCurrentUser();
  const fullname = `${data.user?.first_name} ${data.user?.last_name}`.trim() || data.user?.nickname;
  const createdAtDate = data?.created_at?.split(' ')?.shift();
  const profileLink = `/@${data.user?.nickname}`;


  const reloadCommentList = (videoId = data.id) => {
    commentServices.getCommentListOfAPost(videoId).then((response) => {
      setComments(response);
    });
  };

  useEffect(() => {
    setLoading(true);
    videoServices.getVideo(params.uuid).then((response) => {
      setData(response);
      setIsFollowing(response.user.is_followed);
      setIsLiked(response.is_liked);
      setLikeCount(response.likes_count);
      setCommentCount(response.comments_count);
      setLoading(false);

      reloadCommentList(response.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.uuid]);

  const handleFollowPostUser = () => {
    if (!isLoged) {
      toggle();
      return;
    }

    userServices.followUser(data.user?.id);
    setIsFollowing(true);
  };

  const handleUnfollowPostUser = () => {
    userServices.unfollowUser(data.user?.id);
    setIsFollowing(false);
  };

  const handleToggleLikePost = () => {
    if (!isLoged) {
      toggle();
      return;
    }

    if (isLiked) {
      videoServices.unlike(data.id);
      setLikeCount(likeCount - 1);
    } else {
      videoServices.like(data.id);
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handlePostComment = () => {
    if (commentText === '') return;
    if (!isLoged) {
      toggle();
      return;
    }

    commentServices.createCommentPost(data.uuid, commentText).then(() => {
      setCommentText('');
      reloadCommentList(data.id);
      setCommentCount(commentCount + 1);
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleReplyComment = (username) => {
    setCommentText(`@${username} `);
    commentInputRef.current.focus();
  };

  const handleDeleteComment = (commentId) => {
    commentServices._delete(commentId).then(() => {
      reloadCommentList();
    });
  };


  if (loading) {
    return <Loading />;
  }

  return (



    <div className={cx('wrapper')}>
      <div className={cx('left')}>
        <Player data={data} />
      </div>

      <div className={cx('right')}>
        <div className={cx('account')}>
          <Link className={cx('avatar-link')} to={profileLink}>
            <Avatar className={cx('avatar')} src={data.user?.avatar} alt={data.user?.nickname} />
          </Link>
          <Link className={cx('name-link')} to={profileLink}>
            <div className={cx('name')}>
              <strong className={cx('nickname')}>
                {data.user?.nickname}
                {data.user?.tick && <FontAwesomeIcon icon={faCheckCircle} />}
              </strong>
              <p className={cx('fullname')}>{fullname} · {createdAtDate}</p>
            </div>
          </Link>
          {isFollowing ? (
            <Button className={cx('follow-btn')} type="border" onClick={handleUnfollowPostUser}>
              Following
            </Button>
          ) : (
            <Button className={cx('follow-btn')} type="border" color="primary" onClick={handleFollowPostUser}>
              Follow
            </Button>
          )}
        </div>

        <div className={cx('content')}>
          <p className={cx('desc')}>{data.description}</p>
          <Link to="#" className={cx('music')}>
            <FontAwesomeIcon className={cx('music-icon')} icon={faMusic} />
            {data.music || data.user?.nickname}
          </Link>
        </div>

        <div className={cx('actions')}>
          <div className={cx('icon-btns')}>
            <div className={cx('post-actions')}>
              <div className={cx('post-action', 'like')}>
                <div className={cx('icon-wrapper')} onClick={handleToggleLikePost}>
                  <FontAwesomeIcon className={cx('action-icon', { liked: isLiked })} icon={faHeart} />
                </div>
                <span className={cx('action-count')}>{likeCount}</span>
              </div>
              <div className={cx('post-action')}>
                <div className={cx('icon-wrapper')}>
                  <FontAwesomeIcon className={cx('action-icon')} icon={faComment} />
                </div>
                <span className={cx('action-count')}>{commentCount}</span>
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
              {window.location.href}
            </span>
            <div className={cx('copy-button')} onClick={handleCopyLink}>Copy link</div>
          </div>
        </div>

        <div className={cx('comments')}>
          {comments?.length ? (
            comments.map((comment) => {
              const isCreater = data.user?.id === comment.user?.id;
              return <Comment
                key={comment.id}
                data={comment}
                isCreater={isCreater}
                onReply={handleReplyComment}
                onDelete={handleDeleteComment}
              />;
            })
          ) : (
            <p className={cx('no-comment')}>No comments</p>
          )}
        </div>

        <div className={cx('post-comment')}>
          <input
            className={cx('comment-input')}
            ref={commentInputRef}
            text="text-area"
            placeholder="Add comment..."
            value={commentText}
            onChange={handleCommentChange}
            onKeyDown={(e) => e.key === 'Enter' && handlePostComment()}
          />
          <span className={cx('comment-button')} onClick={handlePostComment}>Post</span>
        </div>
      </div>


      {/* Modal Login form will appear if not login yet */}
      <Login isShowing={isShowing} hide={toggle} />
    </div>



  );
}

export default Video;
