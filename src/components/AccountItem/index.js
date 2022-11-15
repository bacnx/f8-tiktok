import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function AccountItem() {
  return (
    <div className={cx('wrapper')}>
      <Image
        src="https://64.media.tumblr.com/6d732adc1c94c3c92f093123005591a7/c0ba5fa8f0008bdf-53/s640x960/67eb84203181891d59452142e41441dfaf433df7.jpg"
        alt="Avatar"
        className={cx('avatar')}
      />
      <div className={cx('info')}>
        <h4 className={cx('username')}>
          gaixinhchonloc
          <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />
        </h4>
        <span className={cx('name')}>Girls Collection</span>
      </div>
    </div>
  );
}

export default AccountItem;
