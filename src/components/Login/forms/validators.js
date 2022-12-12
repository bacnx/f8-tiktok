export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    ? ''
    : 'Invalid email';
};

export const validatePassword = (password) => {
  return 8 <= password.length && password.length <= 20 ? '' : '8 to 20 characters';
};

export const validateConfirmPassword = (password, confirmPassword) => {
  return password === confirmPassword ? '' : 'Confirm password incorrect';
};
