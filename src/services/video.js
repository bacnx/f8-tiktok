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
