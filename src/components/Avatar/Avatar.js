import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Image from '~/components/Image';
import images from '~/assets/images';
import styles from './Avatar.module.scss';

const cx = classNames.bind(styles);

function Avatar({ src = images.defaultAvatar, alt, className, ...props }) {
  const classes = cx('avatar', { [className]: className });

  return <Image className={classes} src={src} alt={alt} fallback={images.defaultAvatar} {...props} />;
}

Avatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default Avatar;
