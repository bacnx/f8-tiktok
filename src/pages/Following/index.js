import { useState, useEffect } from 'react';
import { videoServices } from '~/services';
import VideoPost from '~/components/VideoPost';
import Loading from '~/components/Loading';

function Following() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    videoServices.getVideosList('following').then((res) => {
      setVideos(res || []);
      setIsLoading(false);
    });
  }, []);

  const render = () => {
    if (isLoading) {
      return <Loading />;
    } else if (videos.length) {
      return (
        <>
          {videos?.map((video) => {
            return <VideoPost key={video.id} data={video} />;
          })}
        </>
      );
    } else {
      return <div>You have to login to view this page</div>;
    }
  };

  return render();
}

export default Following;
