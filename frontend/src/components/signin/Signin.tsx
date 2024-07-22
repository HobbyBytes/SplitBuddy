import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import axiosInstance from "@/api/axios";

function Signin() {
  const [passwordShown, setPasswordShown] = useState(false);

  const initialFormData = Object.freeze({
    email: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const navigate = useNavigate();

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`auth/token/`, {
        username: formData.email,
        password: formData.password,
        grant_type: "password",
        client_id: "FbFA2V1g18ufQxkflrF27J24KNRA0pYs0mSlI7ZE",
        client_secret:
          "wE2GiEcfPdV2SogigJEyPwqsNzSzG0pF5l8Yxprv8WF4X6egBonBuCIEMquEcUoUuZciiIAGb6w7zQlxHtOX9vQnFFmcHDU0YyzkDjoxzktZAINgoK9uMDQqhXr9Xngi",
      })
      .then((res) => {
        console.log(res);

        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        axiosInstance.defaults.headers["Authorization"] =
          "Bearer" + " " + localStorage.getItem("access_token");
        navigate("/");
      });
  };

  return (
    <div
      className=""
      style={{
        height: "-webkit-fill-available",
      }}
    >
      <div className="flex justify-center h-full">
        <div
          className="hidden bg-cover lg:block lg:w-3/5"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-3xl font-bold text-white">Brand</h2>

              <p className="max-w-xl mt-3 text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                autem ipsa, nulla laboriosam dolores, repellendus perferendis
                libero suscipit nam temporibus molestiae
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/5">
          <div className="flex-1">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-300">
                Sign in
              </h2>

              {/* <p className="mt-2 text-gray-600">Create an account</p> */}
            </div>

            <div className="mt-6">
              <form>
                <div>
                  <label className="block mb-1 text-sm text-gray-800 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-1.5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    onChange={handleChange}
                  />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <label className="text-sm text-gray-800 dark:text-gray-200">
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-sm text-gray-600 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <div className="relative">
                    <input
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Your Password"
                      className="block w-full px-4 py-2 mt-1.5 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                      onChange={handleChange}
                    />
                    <i
                      className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                      onClick={togglePasswordVisiblity}
                    >
                      {passwordShown ? (
                        <FaRegEye className="h-5 w-5" />
                      ) : (
                        <FaEyeSlash className="h-5 w-5" />
                      )}
                    </i>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    className="w-full px-4 py-2 tracking-wide text-gray-100 transition-colors duration-200 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50 select-none"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <NavLink
                  to="/register"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Register
                </NavLink>
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="border-b w-5/12 dark:border-gray-800"></span>
              <a className="text-xs text-center text-gray-600 uppercase">or</a>
              <span className="border-b w-5/12 dark:border-gray-800"></span>
            </div>

            <button className="w-full select-none flex items-center justify-center mt-4 border border-gray-800 dark:border-gray-200 text-center rounded-lg text-gray-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none transition-all hover:opacity-75 active:opacity-[0.85] tracking-wide focus:ring focus:ring-blue-300 focus:ring-opacity-50 hover:bg-gray-100/30 dark:hover:bg-gray-800/30">
              <div className="px-4 py-3">
                <svg className="h-6 w-6" viewBox="0 0 40 40">
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#FFC107"
                  />
                  <path
                    d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                    fill="#FF3D00"
                  />
                  <path
                    d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                    fill="#4CAF50"
                  />
                  <path
                    d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                    fill="#1976D2"
                  />
                </svg>
              </div>
              <span className="px-4 py-3 w-5/6 tracking-wide dark:text-gray-400 text-gray-700 hover:text-gray-800 dark:hover:text-gray-300 transition-colors">
                Continue with Google
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
