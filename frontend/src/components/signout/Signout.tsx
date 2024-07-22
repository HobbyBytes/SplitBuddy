import axiosInstance from "@/api/axios";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signout() {
  const navigate = useNavigate();

  useEffect(() => {
    const response = axiosInstance.post("user/logout/blacklist/", {
      refresh_token: localStorage.getItem("refresh_token"),
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    axiosInstance.defaults.headers["Authorization"] = null;
    navigate("/signin");
  });
  return <div>Signout</div>;
}

export default Signout;
