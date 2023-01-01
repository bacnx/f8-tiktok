import { registerService } from '~/services';

const handleRegister = async (email, password, setLoading) => {
  if (setLoading) setLoading(true);
  const { token } = await registerService(email, password);

  if (setLoading) setLoading(false);
  document.cookie = 'token=' + token; // set token to cookie
  document.location.reload(); // reload page
};

export default handleRegister;
