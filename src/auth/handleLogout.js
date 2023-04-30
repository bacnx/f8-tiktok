import { authServices } from '~/services';
import getToken from './getToken';

function handleLogout() {
  const token = getToken();
  authServices.logout(token).then(() => {
    localStorage.removeItem('token');
    document.location.reload(); // reload page
  });
}

export default handleLogout;
