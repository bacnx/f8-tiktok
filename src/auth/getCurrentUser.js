function getCurrentUser() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // currentUser always at localStorage because setLoading before render App(App.js: 15)
  return currentUser;
}

export default getCurrentUser;
