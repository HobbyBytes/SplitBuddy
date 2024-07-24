import axiosInstance from "@/api/axios";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  const navigate = useNavigate();
  const emailPasswordAuthClientID = import.meta.env
    .VITE_EMAIL_PASSWORD_AUTH_CLIENT_ID;
  const socialAuthClientID = import.meta.env.VITE_SOCIAL_AUTH_CLIENT_ID;

  const authRevokeRefreshTokensEndpoint = import.meta.env
    .VITE_AUTH_REVOKE_REFRESH_TOKENS_ENDPOINT;

  const authRevokeAccessTokensEndpoint = import.meta.env
    .VITE_AUTH_REVOKE_ACCESS_TOKENS_ENDPOINT;

  useEffect(() => {
    axiosInstance
      .post(authRevokeAccessTokensEndpoint, {
        // refresh_token: localStorage.getItem("refresh_token"),
        client_id:
          localStorage.getItem("login_type") === "email_password"
            ? emailPasswordAuthClientID
            : socialAuthClientID,
      })
      .then((response) => console.log(response));
    axiosInstance
      .post(authRevokeRefreshTokensEndpoint, {
        // refresh_token: localStorage.getItem("refresh_token"),
        client_id:
          localStorage.getItem("login_type") === "email_password"
            ? emailPasswordAuthClientID
            : socialAuthClientID,
      })
      .then((response) => console.log(response));

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("login_type");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/signin");
  });
  return <div>Signout</div>;
}

export default Signout;
