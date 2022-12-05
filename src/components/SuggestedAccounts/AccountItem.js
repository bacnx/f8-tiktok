import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SuggestedAccounts.module.scss';
import { Box as PopperBox } from '~/components/Popper';
import AccountPreview from './AccountPreview';

const cx = classNames.bind(styles);

function AccountItem() {
  const renderPreview = (attrs) => (
    <PopperBox tabIndex="-1" {...attrs}>
      <AccountPreview />
    </PopperBox>
  );

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <Tippy interactive placement="bottom" zIndex={8} offset={[-10, 0]} delay={[800, 0]} render={renderPreview}>
        <div className={cx('account-item')}>
          <img
            src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6ae2b0d5129c22fc8d7799d6951bbf29~c5_100x100.jpeg?x-expires=1668009600&x-signature=p8qAAyME%2FRu1blVUvtZWhl1IaL8%3D"
            alt=""
            className={cx('avatar')}
          />
          <div className={cx('info')}>
            <p className={cx('username')}>
              <strong>us_wintay</strong>
              <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />
            </p>
            <p className={cx('fullname')}>US Wintay</p>
          </div>
        </div>
      </Tippy>
    </div>
  );
}

export default AccountItem;
