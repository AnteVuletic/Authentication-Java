import axios from "axios";

const base = "http://localhost:8080/api";

const baseUser = `${base}/user`;
const securityProfileBase = `${base}/security-profile`;
const claimBase = `${base}/claim`;

const userEndpoints = {
  register: `${baseUser}/register`,
  authenticate: `${baseUser}/authenticate`,
  refreshToken: `${baseUser}/refresh-token`,
  updateClaims: `${baseUser}/edit-user-claims`,
  getFiltered: `${baseUser}/filter-user`
};

const securityProfileEndpoints = {
  getAll: securityProfileBase,
  get: `${securityProfileBase}/get`,
  editUser: `${securityProfileBase}/edit-user`,
  add: `${securityProfileBase}/add`
};

const claimEndpoints = {
  add: `${claimBase}/add`,
  delete: `${claimBase}/delete`,
  get: `${claimBase}/get`
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
export const addClaim = (claim, user) => {
  return axios.post(claimEndpoints.add, { claim, user });
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
