import axios from "axios";
import { history } from "../utils/BrowserHistoryWrapper";
import { refreshToken } from "./common";

export const configureAxios = () => {
  axios.defaults.headers.post["Content-Type"] = "application/json";

  axios.interceptors.request.use(config => {
    const localStorageToken = localStorage.getItem("token");
    if (localStorageToken != null) {
      const token = localStorageToken;
      config.headers["Authorization"] = token;
    }

    return config;
  });

  const handleRedirectToLogin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    history.push("/login");
  };

  axios.interceptors.response.use(
    response => response,
    error => {
      let originalRequest = error.config;
      const token = localStorage.getItem("token");
      if (error.response && error.response.status === 403 && !token) {
        handleRedirectToLogin();

        return Promise.reject(error);
      } else if (
        error.response &&
        error.response.status === 403 &&
        originalRequest &&
        !originalRequest._isRetryRequest &&
        token
      ) {
        originalRequest._isRetryRequest = true;

        return refreshToken(token).then(({ data }) => {
          if (!data) {
            handleRedirectToLogin();

            return;
          }
          localStorage.setItem("token", data);

          return axios(originalRequest);
        });
      } else if (
        error.response &&
        error.response.status === 403 &&
        originalRequest &&
        originalRequest._isRetryRequest
      ) {
        handleRedirectToLogin();
      }

      return Promise.reject(error);
    }
  );
};
