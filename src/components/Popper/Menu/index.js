import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Box as PopperBox } from '~/components/Popper';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

function Menu({ children, items = [] }) {
  const renderItems = () => {
    return items.map((item, index) => <MenuItem key={index} data={item} />);
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      render={(attrs) => (
        <PopperBox className={cx('menu-list')} tabIndex="-1" {...attrs}>
          {renderItems()}
        </PopperBox>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
