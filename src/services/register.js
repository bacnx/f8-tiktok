import * as httpRequest from '~/utils/httpRequest';

const register = async (email, password) => {
  try {
    const res = await httpRequest.post('auth/register', {
      type: 'email',
      email: email,
      password: password,
    });

    return {
      data: res.data,
      token: res.meta.token,
    };
  } catch (err) {
    console.log(err);
  }
};

export default register;
