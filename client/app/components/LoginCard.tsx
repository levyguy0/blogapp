"use client";
import axios from "axios";
import React, { useRef, useState } from "react";

const LoginCard = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const password = passwordRef.current?.value;
    const email = emailRef.current?.value;

    const user = {
      password: password,
      email: email,
    };

    if (!email) {
      setError("Please enter account details.");
      return;
    }

    await axios
      .post("http://localhost:8080/users/login", user, {
        withCredentials: true,
      })
      .then(() => {
        location.replace("/home");
      })
      .catch((error: any) => {
        setError(error.response.data.error);
      });
  };

  return (
    <div className="card w-96 p-4 bg-base-100 shadow-xl">
      <div className="card-body gap-4">
        <h2 className="text-lg font-bold">Login</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            ref={emailRef}
            id="email"
            autoComplete="email"
            type="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input
            ref={passwordRef}
            id="password"
            autoComplete="current-password"
            type="password"
            className="grow"
            placeholder="Password"
          />
        </label>
        {error && <p className="text-sm text-error">{error}</p>}
        <button onClick={handleLogin} className="btn btn-primary">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginCard;
