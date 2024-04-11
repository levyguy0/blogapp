"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

const page = () => {
  const [user, setUser] = useState<ShownUser | null>();
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
      <div>page</div>
    </main>
  );
};

export default page;
