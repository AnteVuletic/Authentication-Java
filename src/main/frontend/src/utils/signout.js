export const signout = () => {
  localStorage.removeItem("role");
  localStorage.removeItem("token");
  window.location.reload();
};