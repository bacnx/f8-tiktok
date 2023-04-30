import { authServices } from '~/services';
import getToken from './getToken';

// save current user to localStorage
function setCurrentUser(setLoading) {
  const token = getToken();
  localStorage.removeItem('currentUser'); // remove old currentUser

  if (token) {
    setLoading(true);
    authServices.currentUser(token).then((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res) || '');

      setLoading(false);
    });
  } else {
    setLoading(false);
  }
}

export default setCurrentUser;
