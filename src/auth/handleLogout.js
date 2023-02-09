import { authServices } from '~/services';
import getToken from './getToken';

function handleLogout() {
  const token = getToken();
  authServices.logout(token);
  document.cookie = 'token='; // delete token from cookie
  document.location.reload(); // reload page
}

export default handleLogout;
