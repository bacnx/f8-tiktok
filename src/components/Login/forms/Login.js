import classNames from 'classnames/bind';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

import styles from './forms.module.scss';
import Button from '~/components/Button';
import auth from '~/auth';
import { validateEmail } from './validators';

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageEmail, setMessageEmail] = useState('');

  const [messageLogin, setMessageLogin] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = () => !!email && !!password && !validateEmail(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    // handle login
    auth.handleLogin(email, password, setLoading).then((res) => {
      if (!res) setMessageLogin('Wrong email or password');
    });
  };

  return (
    <form className={cx('wrapper')} onSubmit={handleSubmit}>
      <input
        className={cx('input', { validate: messageEmail })}
        type="text"
        placeholder="Email"
        value={email}
        onFocus={() => setMessageEmail('')}
        onBlur={() => setMessageEmail(validateEmail(email))}
        onChange={(e) => setEmail(e.target.value)}
      />
      {messageEmail && <p className={cx('message-error')}>{messageEmail}</p>}

      <input
        className={cx('input')}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className={cx('submit')}
        disable={loading || (!isValid() && cx('disable'))}
        block
        type="fill"
        color="primary"
        size="large"
        onClick={handleSubmit}
      >
        {!loading ? 'Login' : <FontAwesomeIcon className={cx('loading')} icon={faCircleNotch} />}
      </Button>
      {messageLogin && <p className={cx('message-error', 'message-login')}>{messageLogin}</p>}
    </form>
  );
}

export default Login;
