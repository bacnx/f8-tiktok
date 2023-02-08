import { authServices } from '~/services';
import getToken from './getToken';

// save current user from token(cookie) to localStorage
function setCurrentUser(setLoading) {
  const token = getToken();

  if (token) {
    setLoading(true);
    authServices.currentUser(token).then((res) => {
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
