import { currentUserService } from '~/services';

function getCurrentUser(setCurrentUser) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!setCurrentUser) return currentUser;

  if (currentUser) {
    setCurrentUser(currentUser);
  } else {
    const token = document.cookie
      ?.split(';')
      .find((item) => item.trim().startsWith('token'))
      ?.split('=')[1];

    if (token) {
      currentUserService(token).then((res) => {
        setCurrentUser(res);
      });
    }
  }
}

export default getCurrentUser;
