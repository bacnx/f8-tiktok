import * as httpRequest from '~/utils/httpRequest';

const videosList = async (type = 'for-you', page = 1) => {
  try {
    const res = await httpRequest.get('videos', {
      params: {
        type,
        page,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default videosList;
