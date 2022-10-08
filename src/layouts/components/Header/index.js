import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faMagnifyingGlass, faPlus, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

import styles from './Header.module.scss';
import images from '~/assets/images';
import { Box as PopperBox } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header() {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    setSearchResult([]);
  }, []);

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <a href=".">
          <img src={images.logo} alt="Tiktok" />
        </a>

        <Tippy
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
        </Tippy>

        <div className={cx('actions')}>
          <Button className={cx('upload-button')} type="border" beforeIcon={<FontAwesomeIcon icon={faPlus} />}>
            Upload
          </Button>
          <Button type="fill" color="primary">
            Log in
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
