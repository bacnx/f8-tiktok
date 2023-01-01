import * as httpRequest from '~/utils/httpRequest';

const currentUser = async (token) => {
  try {
    const res = await httpRequest.get('auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);

    // delete token and currentUser
    document.cookie = 'token=';
    localStorage.removeItem('currentUser');
  }
};

export default currentUser;
