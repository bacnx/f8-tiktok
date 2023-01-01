import * as httpRequest from '~/utils/httpRequest';

// bugggg: don't post logout request <--------
const logout = async (token) => {
  try {
    await httpRequest.post('auth/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export default logout;
