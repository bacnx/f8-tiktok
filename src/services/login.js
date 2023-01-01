import * as httpRequest from '~/utils/httpRequest';

// post api login and save token to cookie
const login = async (email, password) => {
  try {
    const res = await httpRequest.post('auth/login', {
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

export default login;
