import axiosInstance from "@/api/axios";
import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [passwordShown, setPasswordShown] = useState(false);

  const initialFormData = Object.freeze({
    email: "",
    username: "",
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
      .post(`user/register/`, {
        email: formData.email,
        username: formData.email,
        password: formData.password,
      })
      .then((res) => {
        navigate("/signin");
        console.log(res);
        console.log(res.data);
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
                Register your account
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
                    autoComplete="email"
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
                      autoComplete="current-password"
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
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Create account
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Already have an account?{" "}
                <NavLink
                  to="/signin"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign in
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

/**
 * 
 * <p className="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <NavLink
                  to="/register"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Register
                </NavLink>
                .
              </p>
 */
