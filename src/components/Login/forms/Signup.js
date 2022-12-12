import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './forms.module.scss';
import Button from '~/components/Button';
import { validateEmail, validatePassword, validateConfirmPassword } from './validators';

const cx = classNames.bind(styles);

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [messageEmail, setMessageEmail] = useState('');
  const [messagePassword, setMessagePassword] = useState('');
  const [messageConfirmPassword, setMessageConfirmPassword] = useState('');

  const isValid = () =>
    !!email &&
    !!username &&
    !!password &&
    !!confirmPassword &&
    !validateEmail(email) &&
    !validatePassword(password) &&
    !validateConfirmPassword(password, confirmPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid()) return;

    // handle submit here...
    console.log({
      email,
      username,
      password,
      confirmPassword,
    });
  };

  return (
    <form className={cx('wrapper')} onSubmit={handleSubmit}>
      <input
        className={cx('input', { validate: messageEmail })}
        type="email"
        placeholder="Email"
        value={email}
        onFocus={() => setMessageEmail('')}
        onBlur={() => setMessageEmail(validateEmail(email))}
        onChange={(e) => setEmail(e.target.value)}
      />
      {messageEmail && <p className={cx('message-error')}>{messageEmail}</p>}

      <input
        className={cx('input')}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <span className={cx('space')}></span>

      <input
        className={cx('input', { validate: messagePassword })}
        type="password"
        placeholder="Password"
        value={password}
        onFocus={() => setMessagePassword('')}
        onBlur={() => {
          setMessagePassword(validatePassword(password));
          setMessageConfirmPassword(validateConfirmPassword(password, confirmPassword));
        }}
        onChange={(e) => setPassword(e.target.value)}
      />
      {messagePassword && <p className={cx('message-error')}>{messagePassword}</p>}

      <input
        className={cx('input', { validate: messageConfirmPassword })}
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onFocus={() => setMessageConfirmPassword('')}
        onBlur={() => setMessageConfirmPassword(validateConfirmPassword(password, confirmPassword))}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {messageConfirmPassword && <p className={cx('message-error')}>{messageConfirmPassword}</p>}

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

export default Signup;
