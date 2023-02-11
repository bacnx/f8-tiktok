import getToken from '~/auth/getToken';
import * as httpRequest from '~/utils/httpRequest';

export const getUser = async (nickname) => {
  try {
    const token = getToken();
    const res = await httpRequest.get(`users/@${nickname}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const suggested = async (page = 1, per_page = 5) => {
  try {
    const token = getToken();
    const res = await httpRequest.get('users/suggested', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const following = async (page = 1) => {
  try {
    const token = getToken();
    const res = await httpRequest.get('me/followings', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
      },
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const followUser = async (userId) => {
  try {
    const token = getToken();
    const res = await httpRequest.post(
      `users/${userId}/follow`,
      {},
      {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const unfollowUser = async (userId) => {
  try {
    const token = getToken();
    const res = await httpRequest.post(
      `users/${userId}/unfollow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getLikedVideos = async (userId) => {
  try {
    const token = getToken();
    const res = await httpRequest.get(
      `users/${userId}/liked-videos`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  } catch (err) {
    console.log(err);
  }
};
