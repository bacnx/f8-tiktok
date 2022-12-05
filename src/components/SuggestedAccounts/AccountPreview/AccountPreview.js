import classNames from 'classnames/bind';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function AccountPreview() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('header')}>
        <img
          className={cx('avatar')}
          src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6ae2b0d5129c22fc8d7799d6951bbf29~c5_100x100.jpeg?x-expires=1668009600&x-signature=p8qAAyME%2FRu1blVUvtZWhl1IaL8%3D"
          alt=""
        />

        <Button className={cx('button')} color="primary" type="fill">
          Follow
        </Button>
      </div>
      <div className={cx('body')}>
        <p className={cx('username')}>
          <strong>us_wintay</strong>
          <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
        </p>
        <p className={cx('name')}>US Wintay</p>
        <p className={cx('statistical')}>
          <strong className={cx('value')}>1.4M </strong>
          <span className={cx('label')}>Followers</span>
          <strong className={cx('value')}>1.4M </strong>
          <span className={cx('label')}>Like</span>
        </p>
      </div>
    </div>
  );
}

export default AccountPreview;
