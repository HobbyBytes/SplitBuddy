function isAuthenticated() {
  if (
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token")
  ) {
    return true;
  }
  return false;
}
export default isAuthenticated;
