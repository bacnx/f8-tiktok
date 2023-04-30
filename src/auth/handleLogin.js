import { authServices } from '~/services';

const handleLogin = async (email, password, setLoading) => {
  // email: 'abcd@f8.edu',
  // password: '123456',

  if (setLoading) setLoading(true);
  const res = await authServices.login(email, password);

  if (!res) {
    if (setLoading) setLoading(false);
    return false;
  }

  const token = res.token;
  if (setLoading) setLoading(false);
  localStorage.setItem('token', token);
  document.location.reload(); // reload page

  return true; // Logged in successfully
};

export default handleLogin;
