import * as httpRequest from '~/utils/httpRequest';
import getToken from '~/auth/getToken';

export const getVideosList = async (type = 'for-you', page = 1) => {
  try {
    const token = getToken();
    const res = await httpRequest.get('videos', {
      params: {
        type,
        page,
      },
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const like = async (videoId) => {
  try {
    const token = getToken();
    const res = await httpRequest.post(
      `videos/${videoId}/like`,
      {},
      {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const unlike = async (videoId) => {
  try {
    const token = getToken();
    const res = await httpRequest.post(
      `videos/${videoId}/unlike`,
      {},
      {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
