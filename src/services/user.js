import * as httpRequest from '~/utils/httpRequest';

const user = async (nickname) => {
  try {
    const res = await httpRequest.get(`users/@${nickname}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export default user;
