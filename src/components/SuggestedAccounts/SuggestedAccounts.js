import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, moreBtnLabel = 'See all' }) {
  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>

      <AccountItem />
      <AccountItem />
      <AccountItem />

      <p className={cx('more-btn')}>{moreBtnLabel}</p>
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  moreBtnLabel: PropTypes.string,
};

export default SuggestedAccounts;
