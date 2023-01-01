import getCurrentUser from './getCurrentUser';
import setCurrentUser from './setCurrenUser';
import handleLogin from './handleLogin';
import handleLogout from './handleLogout';
import handleRegister from './handleRegister';

const auth = {
  getCurrentUser,
  setCurrentUser,
  handleLogin,
  handleLogout,
  handleRegister,
};

export default auth;
