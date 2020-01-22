export const loginRegisterTest = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return token && token.length !== 0 && role && role.length !== 0;
};