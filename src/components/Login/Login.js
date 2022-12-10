import PropTypes from 'prop-types';
import { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { faApple, faFacebook, faGoogle, faInstagram, faLine, faTwitter } from '@fortawesome/free-brands-svg-icons';

import styles from './Login.module.scss';
import Modal from '~/components/Modal';
import { UserIcon } from '~/components/Icons';
import Button from '~/components/Button';
import { Link } from 'react-router-dom';
import { SignupForm } from './forms';

const cx = classNames.bind(styles);

const LOGIN_CONTENTS = {
  title: 'Log in to Tiktok',
  type: 'buttons',
  buttons: [
    {
      icon: <FontAwesomeIcon icon={faQrcode} />,
      title: 'Use QR code',
      subContent: {
        title: 'Log in with QR code',
        type: 'render',
        render: <>Log in with QR code content</>,
      },
    },
    {
      icon: <UserIcon width="2rem" height="2rem" />,
      title: 'Use phone / email / username',
      subContent: {
        title: 'Log in',
        type: 'render',
        render: <>Log in form</>,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faFacebook} />,
      title: 'Continue with Facebook',
      // to somewhere
    },
    {
      icon: <FontAwesomeIcon icon={faGoogle} />,
      title: 'Continue with Google',
    },
    {
      icon: <FontAwesomeIcon icon={faTwitter} />,
      title: 'Continue with Twitter',
    },
    {
      icon: <FontAwesomeIcon icon={faLine} />,
      title: 'Continue with LINE',
    },
    {
      icon: <FontAwesomeIcon icon={faApple} />,
      title: 'Continue with Apple',
    },
    {
      icon: <FontAwesomeIcon icon={faInstagram} />,
      title: 'Continue with Instagram',
    },
  ],
};

const SiGNUP_CONTENTS = {
  title: 'Sign up for Tiktok',
  type: 'buttons',
  buttons: [
    {
      icon: <UserIcon width="2rem" height="2rem" />,
      title: 'Use phone or email',
      subContent: {
        title: 'Sign up',
        type: 'render',
        render: <SignupForm />,
      },
    },
    {
      icon: <FontAwesomeIcon icon={faFacebook} />,
      title: 'Continue with Facebook',
      // to somewhere
    },
    {
      icon: <FontAwesomeIcon icon={faGoogle} />,
      title: 'Continue with Google',
    },
    {
      icon: <FontAwesomeIcon icon={faTwitter} />,
      title: 'Continue with Twitter',
    },
    {
      icon: <FontAwesomeIcon icon={faLine} />,
      title: 'Continue with LINE',
    },
  ],
};

function Login({ isShowing, hide }) {
  const [isLogin, setIsLogin] = useState(true);
  const [history, setHistory] = useState([LOGIN_CONTENTS]);
  const current = history[history.length - 1];

  const resetHistory = () => {
    setHistory(() => [LOGIN_CONTENTS]);
    setIsLogin(true);
  };

  const addNewHistory = (subContent) => {
    setHistory((prev) => [...prev, subContent]);
  };

  const removeLastHistory = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  const handleToSignup = () => {
    setIsLogin(false);
    setHistory([SiGNUP_CONTENTS]);
  };

  const handleToLogin = () => {
    setIsLogin(true);
    setHistory([LOGIN_CONTENTS]);
  };

  const render = (() => {
    if (current.type === 'buttons') {
      return current.buttons.map((button, index) => (
        <Button
          className={cx('button')}
          beforeIcon={button.icon}
          block
          space
          type="border"
          onClick={button.subContent && (() => addNewHistory(button.subContent))}
          key={index}
        >
          {button.title}
        </Button>
      ));
    } else if (current.type === 'render') {
      return current.render;
    }
  })();

  return (
    <Modal
      className={cx('modal')}
      isShowing={isShowing}
      hide={() => {
        resetHistory();
        hide();
      }}
      onBack={history.length > 1 ? removeLastHistory : undefined}
    >
      <div className={cx('wrapper')}>
        <div className={cx('body')}>
          <h2 className={cx('heading')}>{current.title}</h2>
          <div className={cx('content')}>{render}</div>
        </div>

        {!isLogin && (
          <p className={cx('term')}>
            By continuing, you agree to TikTok's{' '}
            <Link className={cx('term-link')} to="#">
              Terms of Service
            </Link>{' '}
            and confirm that you have read TikTok's{' '}
            <Link className={cx('term-link')} to="#">
              Privacy Policy
            </Link>
            .
          </p>
        )}

        <div className={cx('footer')}>
          {isLogin ? (
            <>
              Don't have an account?{' '}
              <span className={cx('swap-btn')} onClick={handleToSignup}>
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className={cx('swap-btn')} onClick={handleToLogin}>
                Log In
              </span>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

Login.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Login;
