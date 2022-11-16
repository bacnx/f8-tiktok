import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
  return (
    <Link className={cx('wrapper')} to={`/@${data.nickname}`}>
      <Image src={data.avatar} alt={data.full_name} className={cx('avatar')} fallback={images.defaultAvatar} />
      <div className={cx('info')}>
        <h4 className={cx('username')}>
          {data.nickname}
          {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
        </h4>
        <span className={cx('name')}>{data.full_name}</span>
      </div>
    </Link>
  );
}

export default AccountItem;
