import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ isShowing, hide, className, children }) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className={cx('wrapper')}>
          <div className={cx('overlay')}></div>
          <div className={cx('box', className)}>
            <div className={cx('close')} onClick={hide}>
              <FontAwesomeIcon className={cx('icon')} icon={faXmark} />
            </div>
            <div className={cx('content')}>{children}</div>
          </div>
        </div>,
        document.body,
      )
    : null;
}

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  classNames: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
