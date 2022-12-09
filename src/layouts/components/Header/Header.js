import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import {
  MessageIcon,
  InboxIcon,
  LanguageIcon,
  KeyboardIcon,
  UserIcon,
  LiveStudioIcon,
  QuestionIcon,
  CoinIcon,
  SettingIcon,
  LogOutIcon,
} from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import configs from '~/configs';
import { useModal } from '~/hooks';
import Login from '~/components/Login';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
  {
    icon: <LanguageIcon width="2rem" height="2rem" />,
    title: 'English',
    children: {
      title: 'Language',
      data: [
        {
          type: 'language',
          code: 'en',
          title: 'English',
        },
        {
          type: 'language',
          code: 'vi',
          title: 'Tiếng Việt',
        },
      ],
    },
  },
  {
    icon: <QuestionIcon width="2rem" height="2rem" />,
    title: 'Feedback and help',
    to: '/feedback',
  },
  {
    icon: <KeyboardIcon width="2rem" height="2rem" />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const currentUser = false;
  const { isShowing, toggle } = useModal();

  const userMenu = [
    {
      icon: <UserIcon width="2rem" height="2rem" />,
      title: 'View profile',
      to: '/@pttt1001',
    },
    {
      icon: <CoinIcon width="2rem" height="2rem" />,
      title: 'Get Coins',
      to: '/coin',
    },
    {
      icon: <LiveStudioIcon width="2rem" height="2rem" />,
      title: 'LIVE Studio',
    },
    {
      icon: <SettingIcon width="2rem" height="2rem" />,
      title: 'Settings',
      to: '/setting',
    },
    ...MENU_ITEMS,
    {
      icon: <LogOutIcon width="2rem" height="2rem" />,
      title: 'Log out',
      separate: true,
    },
  ];

  const handleMenuChange = (item) => {
    switch (item.type) {
      case 'language':
        // handle logic...
        console.log(item.code);
        break;
      default:
        console.warn("Haven't this type");
    }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link className={cx('logo')} to={configs.routes.home}>
          <img src={images.logo} alt="Tiktok" />
        </Link>

        <Search />

        <div className={cx('actions')}>
          <Button className={cx('upload-button')} type="border" beforeIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>

          {currentUser ? (
            <>
              <Tippy content="Messages">
                <button className={cx('action-icon')}>
                  <MessageIcon />
                </button>
              </Tippy>
              <Tippy content="Inbox">
                <button className={cx('action-icon')}>
                  <InboxIcon />
                  <span className={cx('icon-couter')}>12</span>
                </button>
              </Tippy>
            </>
          ) : (
            <>
              <Button type="fill" color="primary" onClick={toggle}>
                Log in
              </Button>
              <Login isShowing={isShowing} hide={toggle} />
            </>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <Image
                className={cx('action-avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6ae2b0d5129c22fc8d7799d6951bbf29~c5_100x100.jpeg?x-expires=1668009600&x-signature=p8qAAyME%2FRu1blVUvtZWhl1IaL8%3D"
                alt="Nguyen Van A"
                fallback={images.defaultAvatar}
              />
            ) : (
              <button className={cx('menu-icon')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>
            )}
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;
