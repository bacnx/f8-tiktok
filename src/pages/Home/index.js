import { useState, useEffect } from 'react';
import VideoPost from '~/components/VideoPost';
import { videosListService } from '~/services';

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    videosListService().then((res) => {
      setVideos(res);
    });
  }, []);

  return (
    <div style={{ maxWidth: '692px', marginLeft: 'auto' }}>
      {videos?.map((video) => {
        return <VideoPost key={video.id} data={video} />;
      })}
    </div>
  );
}

export default Home;
