import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

function Box({ children, className, ...props }) {
  return (
    <div className={cx('box', className)} {...props}>
      {children}
    </div>
  );
}

export default Box;
