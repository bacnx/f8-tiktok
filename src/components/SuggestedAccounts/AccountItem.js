import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './SuggestedAccounts.module.scss';
import { Box as PopperBox } from '~/components/Popper';
import AccountPreview from './AccountPreview';
import Avatar from '~/components/Avatar';

const cx = classNames.bind(styles);

function AccountItem({ preview, data }) {
  const renderPreview = (attrs) =>
    preview ? (
      <PopperBox tabIndex="-1" {...attrs}>
        <AccountPreview data={data} />
      </PopperBox>
    ) : (
      <></>
    );

  const full_name = data.first_name + ' ' + data.last_name;

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves this by creating a new parentNode context.
    <div>
      <Tippy interactive placement="bottom" zIndex={8} offset={[-10, 0]} delay={[800, 0]} render={renderPreview}>
        <Link className={cx('account-item')} to={`/@${data.nickname}`}>
          <Avatar src={data.avatar} alt={full_name} className={cx('avatar')} />
          <div className={cx('info')}>
            <p className={cx('username')}>
              <strong>{data.nickname}</strong>
              {data.tick && <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} />}
            </p>
            <p className={cx('fullname')}>{full_name}</p>
          </div>
        </Link>
      </Tippy>
    </div>
  );
}

AccountItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AccountItem;
