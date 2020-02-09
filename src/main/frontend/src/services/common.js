import axios from "axios";

const base = "http://localhost:8080/api";

const baseUser = `${base}/user`;
const securityProfileBase = `${base}/security-profile`;
const claimBase = `${base}/claim`;

const userEndpoints = {
  register: `${baseUser}/register`,
  authenticate: `${baseUser}/authenticate`,
  refreshToken: `${baseUser}/refresh-token`
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
  return axios.get(claimEndpoints.get + `?id=${userId}`);
};

export const getAllClaims = () => {
  return [
    { claimId: 2, name: "testClaim", description: "claim description" },
    { claimId: 6, name: "testClaim6", description: "claim description" },
    { claimId: 7, name: "testClaim7", description: "claim description" }
  ];
};
