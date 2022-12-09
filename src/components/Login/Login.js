import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

function Login({ isShowing, hide }) {
  return (
    <Modal className={cx('cx_hello_modal')} isShowing={isShowing} hide={hide}>
      Login
    </Modal>
  );
}

Login.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
};

export default Login;
