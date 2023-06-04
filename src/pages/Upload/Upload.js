import classnames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import styles from './Upload.module.scss';

const cx = classnames.bind(styles);

function Upload() {
  const hasFile = true;

  return <div className={cx('wrapper')}>{hasFile ? <ConfigVideo /> : <SelectFile />}</div>;
}

function SelectFile() {
  return (
    <div className={cx('container', 'select-box')}>
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

        <Button className={cx('btn')} type="fill" color="primary" block>
          Select file
        </Button>
      </div>
    </div>
  );
}

function ConfigVideo() {
  return (
    <div className={cx('container', 'config-box')}>
      <h2 className={cx('header')}>Upload video</h2>
      <p className={cx('desc')}>Post a video to your accout</p>

      <div className={cx('content')}>
        <div className={cx('preview')}></div>
        <div className={cx('detail')}>
          <div className={cx('group')}>
            <h3 className={cx('label')}>Caption</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;
