import classNames from 'classnames/bind';

import configs from '~/configs';
import styles from './SideBar.module.scss';
import {
  HomeActiveIcon,
  HomeIcon,
  LiveActiveIcon,
  LiveIcon,
  UserGroupActiveIcon,
  UserGroupIcon,
} from '~/components/Icons';
import Menu, { MenuItem } from './Menu';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import Button from '~/components/Button';
import { useModal } from '~/hooks';
import Login from '~/components/Login';
import auth from '~/auth';

const cx = classNames.bind(styles);

function SideBar({ small }) {
  const { isShowing, toggle } = useModal();
  const currentUser = auth.getCurrentUser();

  return (
    <aside className={cx('wrapper', { small })}>
      <Menu className={cx('menu')}>
        <MenuItem title="For You" to={configs.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
        <MenuItem
          title="Following"
          to={configs.routes.following}
          icon={<UserGroupIcon />}
          activeIcon={<UserGroupActiveIcon />}
        />
        <MenuItem title="LIVE" to={configs.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
      </Menu>

      {!currentUser && (
        <>
          <span className={cx('line')}></span>
          <div className={cx('login')}>
            <p className={cx('login-desc')}>Log in to follow creators, like videos, and view comments.</p>
            <Button className={cx('login-button')} size="large" type="border" color="primary" block onClick={toggle}>
              Login
            </Button>
          </div>

          <Login isShowing={isShowing} hide={toggle} />
        </>
      )}

      <span className={cx('line')}></span>
      <SuggestedAccounts label="Suggested accounts" />

      <span className={cx('line')}></span>
      <SuggestedAccounts label="Following accounts" moreBtnLabel="See more" type="following" />
    </aside>
  );
}

export default SideBar;
