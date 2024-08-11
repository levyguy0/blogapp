"use client";
import React, { useRef, useState } from "react";
import axios from "axios";
import { redirect, useRouter } from "next/navigation";

interface FieldError {
  msg: string;
  path: string;
}

const SignupCard = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  const handleSignup = () => {
    setUsernameError("");
    setNameError("");
    setPasswordError("");
    setEmailError("");

    const username = usernameRef.current?.value;
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const user = {
      username: username,
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("/api/users/signup", user)
      .then((res) => {
        router.replace("/login");
      })
      .catch((error: any) => {
        // error.response.data.error.forEach((err: FieldError) => {
        //   switch (err.path) {
        //     case "username":
        //       setUsernameError(err.msg);
        //       break;
        //     case "name":
        //       setNameError(err.msg);
        //       break;
        //     case "email":
        //       setEmailError(err.msg);
        //       break;
        //     case "password":
        //       setPasswordError(err.msg);
        //       break;
        //   }
        // });
        try {
          error.response.data.issues.forEach((err: any) => {
            switch (err.path[0]) {
              case "username":
                setUsernameError(err.message);
                break;
              case "name":
                setNameError(err.message);
                break;
              case "email":
                setEmailError(err.message);
                break;
              case "password":
                setPasswordError(err.message);
                break;
            }
          });
        } catch {
          console.log(error.response.data);
          if (error.response.data.path == "email") {
            setEmailError(error.response.data.error);
          } else if (error.response.data.path == "username") {
            setUsernameError(error.response.data.error);
          }
        }
      });
  };

  return (
    <div className="card w-96 p-4 bg-base-100 shadow-xl">
      <div className="card-body gap-4">
        <h2 className="text-lg font-bold">Signup</h2>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            autoComplete="name"
            id="name"
            ref={nameRef}
            type="text"
            className="grow"
            placeholder="Name"
          />
        </label>
        {nameError && <p className="text-sm text-error">{nameError}</p>}
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            autoComplete="off"
            id="username"
            ref={usernameRef}
            type="text"
            className="grow"
            placeholder="Username"
          />
        </label>
        {usernameError && <p className="text-sm text-error">{usernameError}</p>}
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
            autoComplete="email"
            id="email"
            ref={emailRef}
            type="email"
            className="grow"
            placeholder="Email"
          />
        </label>
        {emailError && <p className="text-sm text-error">{emailError}</p>}
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
            autoComplete="off"
            id="password"
            ref={passwordRef}
            type="password"
            className="grow"
            placeholder="Password"
          />
        </label>
        {passwordError && <p className="text-sm text-error">{passwordError}</p>}
        <button onClick={handleSignup} className="btn btn-primary">
          Signup
        </button>
      </div>
    </div>
  );
};

export default SignupCard;
