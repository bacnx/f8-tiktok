import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './Menu.module.scss';
import { Box as PopperBox } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';

const cx = classNames.bind(styles);

const defaultFn = () => {};

function Menu({ children, items = [], onChange = defaultFn }) {
  const [history, setHistory] = useState([{ data: items }]);
  const current = history[history.length - 1];

  const renderItems = () => {
    return current.data.map((item, index) => (
      <MenuItem
        key={index}
        data={item}
        onClick={() => {
          const isParent = !!item.children;

          if (isParent) {
            setHistory((prev) => [...prev, item.children]);
          } else {
            onChange(item);
          }
        }}
      />
    ));
  };

  return (
    <Tippy
      interactive
      delay={[0, 700]}
      placement="bottom-end"
      render={(attrs) => (
        <PopperBox className={cx('menu-list')} tabIndex="-1" {...attrs}>
          {history.length > 1 && (
            <Header
              onBack={() => {
                setHistory((prev) => prev.slice(0, prev.length - 1));
              }}
            >
              {current.title}
            </Header>
          )}

          {renderItems()}
        </PopperBox>
      )}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
