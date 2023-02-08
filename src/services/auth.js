import * as httpRequest from '~/utils/httpRequest';

export const register = async (email, password) => {
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

// post api login and save token to cookie
export const login = async (email, password) => {
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

// bugggg: don't post logout request <--------
export const logout = async (token) => {
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

export const currentUser = async (token) => {
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
