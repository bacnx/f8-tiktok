import { useState, useEffect } from 'react';
import { videoServices } from '~/services';
import VideoPost from '~/components/VideoPost';
import Loading from '~/components/Loading';

function Home() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    videoServices.getVideosList().then((res) => {
      setVideos(res);
      setIsLoading(false);
    });
  }, []);

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      {videos?.map((video) => {
        return <VideoPost key={video.id} data={video} />;
      })}
    </div>
  );
}

export default Home;
