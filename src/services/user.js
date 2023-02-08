import * as httpRequest from '~/utils/httpRequest';

export const getUser = async (nickname) => {
  try {
    const res = await httpRequest.get(`users/@${nickname}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const suggested = async (page = 1, per_page = 5) => {
  try {
    const res = await httpRequest.get('users/suggested', {
      params: {
        page,
        per_page,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
