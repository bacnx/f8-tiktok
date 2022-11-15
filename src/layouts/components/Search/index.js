import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Box as PopperBox } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(true);

  const inputRef = useRef();

  useEffect(() => {
    setSearchResult([1, 2]);
  }, []);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  return (
    <HeadlessTippy
      interactive={true}
      visible={showResult && searchResult.length > 0}
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
      onClickOutside={() => setShowResult(false)}
    >
      <div className={cx('search')}>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search accounts and videos"
          spellCheck={false}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setShowResult(true)}
        />

        {/* <FontAwesomeIcon className={cx('icon')} icon={faCircleNotch} /> */}
        {searchValue && (
          <button onClick={handleClear}>
            <FontAwesomeIcon className={cx('icon')} icon={faXmarkCircle} />
          </button>
        )}

        <span className={cx('line')}></span>

        <button className={cx('search-btn')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </HeadlessTippy>
  );
}

export default Search;
