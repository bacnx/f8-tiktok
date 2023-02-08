import getCurrentUser from './getCurrentUser';
import setCurrentUser from './setCurrenUser';
import handleLogin from './handleLogin';
import handleLogout from './handleLogout';
import handleRegister from './handleRegister';
import getToken from './getToken';

const auth = {
  getCurrentUser,
  setCurrentUser,
  handleLogin,
  handleLogout,
  handleRegister,
  getToken,
};

export default auth;
