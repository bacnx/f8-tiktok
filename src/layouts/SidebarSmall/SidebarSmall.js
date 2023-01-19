import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SidebarSmall.module.scss';
import Header from '../components/Header';
import SideBar from '../components/SideBar';

const cx = classNames.bind(styles);

function SidebarSmall({ children }) {
  return (
    <div className={cx('wrapper')}>
      <Header />
      <div className={cx('container')}>
        <SideBar small />
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  );
}

SidebarSmall.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SidebarSmall;
