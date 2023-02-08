// import { authServices } from '~/services';

// buggg: don't request logout <---
function handleLogout() {
  // const token = document.cookie
  //   ?.split(';')
  //   .find((item) => item.trim().startsWith('token'))
  //   ?.split('=')[1];

  // authServices.logout(token);
  document.cookie = 'token='; // delete token from cookie
  document.location.reload(); // reload page
}

export default handleLogout;
