import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './forms.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isValid = () => !!username && !!password;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    // handle submit here...
    console.log({
      username,
      password,
    });
  };

  return (
    <form className={cx('wrapper')} onSubmit={handleSubmit}>
      <input
        className={cx('input')}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        className={cx('input')}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        className={cx('submit')}
        disable={!isValid() && cx('disable')}
        type="fill"
        color="primary"
        size="large"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </form>
  );
}

export default Login;
