import * as httpRequest from '~/utils/httpRequest';
import getToken from '~/auth/getToken';

export const getCommentListOfAPost = async (postId) => {
  try {
    const token = getToken();
    const res = await httpRequest.get(`videos/${postId}/comments`, {
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

export const createCommentPost = async (postUuid, content) => {
  try {
    const token = getToken();
    const res = await httpRequest.post(`videos/${postUuid}/comments`,
      {
        comment: content,
      },
      {
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

export const _delete = async (commentId) => {
  try {
    const token = getToken();
    const res = await httpRequest._delete(`comments/${commentId}`, {
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

export const like = async (commentId) => {
  try {
    const token = getToken();
    const res = await httpRequest.post(`comments/${commentId}/like`, {}, {
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

export const unlike = async (commentId) => {
  try {
    const token = getToken();
    const res = await httpRequest.post(`comments/${commentId}/unlike`, {}, {
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

