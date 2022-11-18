import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
  href,
  to,
  type = 'text-style', // text-style(default), border, fill
  color, // text-color(default), primary
  size, // medium(default), small, large
  circle,
  disable,
  className,
  beforeIcon,
  afterIcon,
  children,
  onClick,
}) {
  let Comp = 'button';

  const allProps = {
    href,
    to,
    onClick,
  };

  const classes = cx('button', {
    [className]: className,
    [type]: type,
    [color]: color,
    [size]: size,
    circle,
    disable,
  });

  if (href) Comp = 'a';
  else if (to) Comp = Link;

  if (disable) {
    Object.keys(allProps).forEach((key) => {
      if (key.startsWith('on')) {
        delete allProps[key];
      }
    });
  }

  return (
    <Comp className={classes} {...allProps}>
      {beforeIcon ? <span className={cx('icon')}>{beforeIcon}</span> : <></>}
      <span className={cx('content')}>{children}</span>
      {afterIcon ? <span className={cx('icon')}>{afterIcon}</span> : <></>}
    </Comp>
  );
}

Button.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  type: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  circle: PropTypes.string,
  disable: PropTypes.string,
  className: PropTypes.string,
  beforeIcon: PropTypes.node,
  afterIcon: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default Button;
