import { loginService } from '~/services';

const handleLogin = async (email, password, setLoading) => {
  // email: 'abcd@f8.edu',
  // password: '123456',

  if (setLoading) setLoading(true);
  const { token } = await loginService(email, password);

  if (setLoading) setLoading(false);
  document.cookie = 'token=' + token; // set token to cookie
  document.location.reload(); // reload page
};

export default handleLogin;
