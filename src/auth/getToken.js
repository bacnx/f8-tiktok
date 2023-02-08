const getToken = () => {
  const token = document.cookie
    ?.split(';')
    .find((item) => item.trim().startsWith('token'))
    ?.split('=')[1];
  return token || undefined;
};

export default getToken;
