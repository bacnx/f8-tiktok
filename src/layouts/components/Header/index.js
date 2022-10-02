import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Header() {
  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <a href=".">
          <img src={images.logo} alt="Tiktok" />
        </a>

        <div className={cx('search')}>
          <input type="text" placeholder="Search accounts and videos" spellCheck={false} />

          <FontAwesomeIcon className={cx('icon')} icon={faCircleNotch} />
          <button>
            <FontAwesomeIcon className={cx('icon')} icon={faXmarkCircle} />
          </button>

          <span className={cx('line')}></span>

          <div className={cx('search-btn')}>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </div>
        </div>

        <div className={cx('actions')}></div>
      </div>
    </header>
  );
}

export default Header;
