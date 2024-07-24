import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const socialAuthTokenExEndpoint = import.meta.env
  .VITE_SOCIAL_AUTH_TOKEN_EX_ENDPOINT;

const emailPasswordAuthClientID = import.meta.env
  .VITE_EMAIL_PASSWORD_AUTH_CLIENT_ID;
const emailPasswordAuthClientSecret = import.meta.env
  .VITE_EMAIL_PASSWORD_AUTH_CLIENT_SECRET;

const socialAuthClientID = import.meta.env.VITE_SOCIAL_AUTH_CLIENT_ID;
const socialAuthClientSecret = import.meta.env.VITE_SOCIAL_AUTH_CLIENT_SECRET;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer" + " " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert(
        "A server/network error occurred." +
          " Looks like CORS might be the problem." +
          " Sorry about this - we will get this fixed shortly.",
      );
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      originalRequest.url == baseURL + socialAuthTokenExEndpoint
    ) {
      window.location.href = "/signin";
      return Promise.reject(error);
    }

    if (
      error.response.data.code === "token_not_valid" &&
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        console.log(`Refresh token in axios: ${refreshToken}`);

        const tokenParts = JSON.parse(atob(refreshToken.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          // the endpoint to use here is socialAuthTokenEndpoint only as we only need to convert the token
          return axiosInstance
            .post(socialAuthTokenExEndpoint, {
              grant_type: "refresh_token",
              // setting the client ID and client secret based on the type of authentication
              client_id:
                localStorage.getItem("login_type") === "email_password"
                  ? emailPasswordAuthClientID
                  : socialAuthClientID,
              client_secret:
                localStorage.getItem("login_type") === "email_password"
                  ? emailPasswordAuthClientSecret
                  : socialAuthClientSecret,
              refresh_token: refreshToken,
            })
            .then((response) => {
              localStorage.setItem("access_token", response.data.access_token);
              localStorage.setItem(
                "refresh_token",
                response.data.refresh_token,
              );

              axiosInstance.defaults.headers["Authorization"] =
                "Bearer " + response.data.access;
              originalRequest.headers["Authorization"] =
                "Bearer " + response.data.access;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/signin/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "//";
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
