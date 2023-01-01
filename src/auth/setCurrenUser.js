import { currentUserService } from '~/services';

// save current user from token(cookie) to localStorage
function setCurrentUser() {
  const token = document.cookie
    ?.split(';')
    .find((item) => item.trim().startsWith('token'))
    ?.split('=')[1];

  if (token) {
    currentUserService(token).then((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
    });
  } else {
    localStorage.removeItem('currentUser');
  }
}

export default setCurrentUser;
