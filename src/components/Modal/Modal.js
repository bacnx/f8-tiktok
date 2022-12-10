import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ isShowing, hide, onBack, className, children }) {
  return isShowing
    ? ReactDOM.createPortal(
        <div className={cx('wrapper')}>
          <div className={cx('overlay')}></div>
          <div className={cx('box', className)}>
            {onBack && (
              <span className={cx('back')} onClick={onBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
            )}
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
  onBack: PropTypes.func,
  classNames: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Modal;
