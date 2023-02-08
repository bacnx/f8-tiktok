import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';

import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { userServices } from '~/services';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, moreBtnLabel = 'See all', type = 'suggested' }) {
  const [users, setUsers] = useState([]);
  const [moreUsers, setMoreUsers] = useState([]);
  const [isLess, setIsLess] = useState(true);

  useEffect(() => {
    if (type === 'suggested') {
      userServices.suggested().then((res) => {
        setUsers(res);
      });
    }
  }, [type]);

  const handleMore = () => {
    if (moreUsers.length === 0) {
      // get more suggested users in first time
      userServices.suggested(2).then((res) => {
        setMoreUsers(res);
        setUsers((preUsers) => [...preUsers, ...res]);
        setIsLess(false);
      });
    } else {
      setUsers((preUsers) => [...preUsers, ...moreUsers]);
      setIsLess(false);
    }
  };

  const handleLess = () => {
    setUsers((preUsers) => preUsers.splice(0, preUsers.length / 2));
    setIsLess(true);
  };

  return (
    <div className={cx('wrapper')}>
      <p className={cx('label')}>{label}</p>

      {users?.map((user) => (
        <AccountItem key={user.id} data={user} />
      ))}

      {users?.length ? (
        <p className={cx('more-btn')} onClick={isLess ? handleMore : handleLess}>
          {isLess ? moreBtnLabel : 'See less'}
        </p>
      ) : (
        <p className={cx('no-account')}>Accounts you follow will appear here</p>
      )}
    </div>
  );
}

SuggestedAccounts.propTypes = {
  label: PropTypes.string.isRequired,
  moreBtnLabel: PropTypes.string,
  type: PropTypes.string,
};

export default SuggestedAccounts;
