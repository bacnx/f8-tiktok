import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Box as PopperBox } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { useDebounce } from '~/hooks';
import { searchService } from '~/services';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
    }
  }, [searchValue]);

  useEffect(() => {
    if (!debounceValue.trim()) {
      setSearchResult([]);
      return;
    }

    const fetchApi = async () => {
      setLoading(true);

      const res = await searchService(debounceValue);

      setSearchResult(res);
      setLoading(false);
    };

    fetchApi();
  }, [debounceValue]);

  const handleClear = () => {
    setSearchValue('');
    setSearchResult([]);
    inputRef.current.focus();
  };

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  return (
    // Using a wrapper <div> or <span> tag around the reference element solves
    // this by creating a new parentNode context.
    <div>
      <HeadlessTippy
        interactive={true}
        visible={showResult && searchResult.length > 0}
        render={(attrs) => (
          // Problem: not show scrollbar in result box
          <PopperBox tabIndex="-1" {...attrs}>
            <div className={cx('search-result')}>
              <h4 className={cx('search-title')}>Accounts</h4>
              {searchResult.map((result) => (
                <AccountItem key={result.id} data={result} />
              ))}
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
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />

          {loading && <FontAwesomeIcon className={cx('icon', 'loading')} icon={faCircleNotch} />}
          {searchValue && !loading && (
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
    </div>
  );
}

export default Search;
