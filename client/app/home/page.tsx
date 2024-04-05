"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import ShownUser from "@/models/ShownUser";

const page = () => {
  const [user, setUser] = useState<ShownUser | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("http://localhost:8080/users/me", { withCredentials: true })
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
          } else {
            location.replace("/login");
          }
        })
        .catch((err) => {
          location.replace("/login");
        });
    };

    checkLoggedIn();
  }, []);

  return (
    <main>
      <NavBar user={user}></NavBar>
      <div className="flex w-screen h-screen justify-center items-center">
        <div>hello</div>
      </div>
    </main>
  );
};

export default page;
