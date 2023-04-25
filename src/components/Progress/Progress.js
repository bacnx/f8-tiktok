import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import styles from './Progress.module.scss';

const cx = classnames.bind(styles);

function Progress(
  {
    min = 0,
    max = 100,
    step = 1,
    value,
    scale,
    thumb,
    border,
    className,
    onChange
  }
) {
  const classes = cx('wrapper', {
    [className]: className,
    scale,
    thumb,
    border,
  });

  const progress = max ? (value / max) * 100 : 0;

  return (
    <div className={classes} style={{ '--progress': `${Math.floor(progress)}%` }}>
      <input
        className={cx('input')}
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
      />

      <div className={cx('track')}></div>
      <div className={cx('progress')}></div>
    </div>
  );
}


Progress.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  scale: PropTypes.bool,
  thumb: PropTypes.bool,
  border: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

export default Progress;
