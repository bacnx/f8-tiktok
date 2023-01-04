import classNames from 'classnames/bind';
import styles from './Loading.module.scss';

const cx = classNames.bind(styles);

function Loading() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('loading')}>
        <div className={cx('item', 'first')}></div>
        <div className={cx('item', 'second')}></div>
      </div>
    </div>
  );
}

export default Loading;
