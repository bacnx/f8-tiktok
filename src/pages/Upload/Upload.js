import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import styles from './Upload.module.scss';

const cx = classnames.bind(styles);

function Upload() {
  return (


    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('upload-box')}>
          <FontAwesomeIcon className={cx('icon')} icon={faCloudArrowUp} />
          <h2 className={cx('header')}>Select video to upload</h2>

          <p className={cx('desc')}>Or drag and drop a file</p>
          <p className={cx('desc')}>Long videos can be split into multiple parts to get more exposure</p>

          <br />

          <p className={cx('desc-opacity')}>MP4 or WebM</p>
          <p className={cx('desc-opacity')}>720x1280 resolution or higher</p>
          <p className={cx('desc-opacity')}>Up to 30 minutes</p>
          <p className={cx('desc-opacity')}>Less than 20 GB</p>

          <br />

          <Button className={cx('btn')} type='fill' color='primary' block>Select file</Button>
        </div>
      </div>
    </div>


  );
}

export default Upload;
