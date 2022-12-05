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

const cx = classNames.bind(styles);

function SideBar() {
  return (
    <aside className={cx('wrapper')}>
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

      <span className={cx('line')}></span>
      <SuggestedAccounts label="Suggested accounts" />

      <span className={cx('line')}></span>
      <SuggestedAccounts label="Following accounts" moreBtnLabel="See more" />
    </aside>
  );
}

export default SideBar;
