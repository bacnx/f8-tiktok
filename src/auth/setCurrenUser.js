import { currentUserService } from '~/services';

// save current user from token(cookie) to localStorage
function setCurrentUser(setLoading) {
  const token = document.cookie
    ?.split(';')
    .find((item) => item.trim().startsWith('token'))
    ?.split('=')[1];

  if (token) {
    setLoading(true);
    currentUserService(token).then((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));

      // setTimeout(() => {
      setLoading(false);
      // }, 200);
    });
  } else {
    localStorage.removeItem('currentUser');
    setLoading(false);
  }
}

export default setCurrentUser;
