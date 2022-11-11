import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleNotch,
  faEllipsisVertical,
  faMagnifyingGlass,
  faPlus,
  faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import styles from './Header.module.scss';
import images from '~/assets/images';
import { Box as PopperBox } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
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
    to: 'feedback',
  },
  {
    icon: <KeyboardIcon width="2rem" height="2rem" />,
    title: 'Keyboard shortcuts',
  },
];

function Header() {
  const [searchResult, setSearchResult] = useState([]);
  const currentUser = true;

  const userMenu = [
    {
      icon: <UserIcon width="2rem" height="2rem" />,
      title: 'View profile',
      to: '@pttt1001',
    },
    {
      icon: <CoinIcon width="2rem" height="2rem" />,
      title: 'Get Coins',
      to: 'coin',
    },
    {
      icon: <LiveStudioIcon width="2rem" height="2rem" />,
      title: 'LIVE Studio',
    },
    {
      icon: <SettingIcon width="2rem" height="2rem" />,
      title: 'Settings',
      to: 'setting',
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

  useEffect(() => {
    setSearchResult([]);
  }, []);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <a href=".">
          <img src={images.logo} alt="Tiktok" />
        </a>

        <HeadlessTippy
          interactive={true}
          visible={searchResult.length > 0}
          render={(attrs) => (
            <PopperBox tabIndex="-1" {...attrs}>
              <div className={cx('search-result')}>
                <h4 className={cx('search-title')}>Accounts</h4>

                <AccountItem />
                <AccountItem />
                <AccountItem />
              </div>
            </PopperBox>
          )}
        >
          <div className={cx('search')}>
            <input type="text" placeholder="Search accounts and videos" spellCheck={false} />

            <FontAwesomeIcon className={cx('icon')} icon={faCircleNotch} />
            <button>
              <FontAwesomeIcon className={cx('icon')} icon={faXmarkCircle} />
            </button>

            <span className={cx('line')}></span>

            <button className={cx('search-btn')}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </HeadlessTippy>

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
                </button>
              </Tippy>
            </>
          ) : (
            <Button type="fill" color="primary">
              Log in
            </Button>
          )}

          <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
            {currentUser ? (
              <img
                className={cx('action-avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6ae2b0d5129c22fc8d7799d6951bbf29~c5_100x100.jpeg?x-expires=1668009600&x-signature=p8qAAyME%2FRu1blVUvtZWhl1IaL8%3D"
                alt="Nguyen Van A"
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
