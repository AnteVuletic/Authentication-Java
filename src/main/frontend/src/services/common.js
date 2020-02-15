import axios from "axios";

const base = "http://localhost:8080/api";

const baseUser = `${base}/user`;
const securityProfileBase = `${base}/security-profile`;
const claimBase = `${base}/claim`;
const userClaimBase = `${base}/user-claim`;

const userEndpoints = {
  register: `${baseUser}/register`,
  getAll: `${baseUser}/get`,
  authenticate: `${baseUser}/authenticate`,
  refreshToken: `${baseUser}/refresh-token`,
  getUserData: `${baseUser}/get-user-data`,
  getFiltered: `${baseUser}/filter-user`,
  getByClaimId: `${baseUser}/get-by-claim`,
  editUserData: `${baseUser}/edit-user-data`,
  changePassword: `${baseUser}/change-password`,
  updateClaims: `${baseUser}/edit-user-claims`
};

const securityProfileEndpoints = {
  getAll: securityProfileBase,
  get: `${securityProfileBase}/get`,
  editUser: `${securityProfileBase}/edit-user`,
  add: `${securityProfileBase}/add`
};

const claimEndpoints = {
  add: `${claimBase}/create`,
  delete: `${claimBase}/delete`,
  get: `${claimBase}/get`
};

const userClaimEndpoints = {
  add: `${userClaimBase}/add`,
  delete: `${userClaimBase}/delete`
};

export const register = ({
  email,
  password,
  firstName,
  lastName,
  dateOfBirth
}) => {
  return axios.post(userEndpoints.register, {
    email,
    password,
    firstName,
    lastName,
    dateOfBirth
  });
};

export const authenticate = (email, password) => {
  return axios.post(userEndpoints.authenticate, { email, password });
};

export const getUserData = () => {
  return axios.get(userEndpoints.getUserData);
};

export const getAllUsers = () => {
  return axios.get(userEndpoints.getAll);
};

export const editUserData = (user) => {
  return axios.post(userEndpoints.editUserData,  user );
};

export const changePassword = (userId, oldPassword, newPassword) => {
  return axios.post(userEndpoints.changePassword, {userId, oldPassword, newPassword });
};

export const refreshToken = () => {
  return axios.get(userEndpoints.refreshToken);
};

export const getAllSecurityProfiles = () => {
  return axios.get(securityProfileEndpoints.getAll);
};

export const getAllUsersBySecurityProfileId = id => {
  return axios.get(securityProfileEndpoints.get + `?id=${id}`);
};

// user: { userId, email, securityProfile },
// securityProfile: { securityProfileId, name }
export const editUserSecurityProfile = (user, securityProfile) => {
  return axios.post(securityProfileEndpoints.editUser, {
    user: { ...user },
    securityProfile: { ...securityProfile }
  });
};

// { securityProfile: { name } }
export const addSecurityProfile = securityProfile => {
  return axios.post(securityProfileEndpoints.add, securityProfile);
};

// { claim: { resourceId }, user }
export const addClaim = ({ name, description }) => {
  return axios.post(claimEndpoints.add, { name, description });
};

export const deleteClaim = claim => {
  return axios.post(claimEndpoints.delete, claim);
};

export const getAllUserClaims = ({ userId }) => {
  return axios.get(claimEndpoints.get + `-by-user?userId=${userId}`);
};

export const getAllClaims = () => {
  return axios.get(claimEndpoints.get);
};

export const updateUserClaims = (user, claims) => {
  return axios.post(userEndpoints.updateClaims, { user, claims });
};

export const getFilteredUsers = ({ firstName, lastName, email }) => {
  return axios.post(userEndpoints.getFiltered, { firstName, lastName, email });
};

export const getUsersByClaimId = claimId => {
  return axios.post(userEndpoints.getByClaimId, { claimId });
};

export const addUserClaim = ({ claim, user }) => {
  return axios.post(userClaimEndpoints.add, { claim, user });
};

export const deleteUserClaim = ({ claim, user }) => {
  return axios.post(userClaimEndpoints.delete, { claim, user });
};
