"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import router from "next/router";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";

const SettingsPage = () => {
  const [user, setUser] = useState<ShownUser | null>();
  // const username = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState(user?.username);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          } else {
            router.replace("/login");
          }
        })
        .catch((err) => {
          router.replace("/login");
        });
    };

    checkLoggedIn();
  }, []);

  const updateUsername = async function () {
    const res = await axios
      .put("/api/users/update", {
        username: username,
      })
      .then((res) => {
        setError("");
        setMessage(res.data["message"]);
      })
      .catch((err) => {
        console.log(err.status);
        if (err.status == 409) {
          setError(err.response.data.error);
        } else {
          setError(err.response.data.issues[0].message);
        }
      });
  };

  return (
    <main>
      <NavBar optionalUser={user}></NavBar>
      <div className="p-4 flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="flex flex-col gap-12 mt-10 w-full">
          <div className="card bg-transparent border-accent border-2 w-[100%] lg:w-[50%]">
            <div className="card-body flex-col flex gap-4">
              <h2 className="card-title">Change username</h2>
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                defaultValue={user?.username}
                className="input input-bordered input-info w-full max-w-xs"
              />
              {error && <div className="text-error text-sm">{error}</div>}
              {message && <div className="text-success text-sm">{message}</div>}
              <div className="card-actions lg:justify-end">
                <button
                  className={`btn ${
                    user?.username == username && "btn-disabled"
                  }`}
                  onClick={updateUsername}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
