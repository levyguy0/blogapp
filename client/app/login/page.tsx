"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import LoginCard from "../components/LoginCard";
import ShownUser from "@/models/ShownUser";
import axios from "axios";

const page = () => {
  const [user, setUser] = useState<ShownUser | null>(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("http://localhost:8080/users/me", { withCredentials: true })
        .then((res) => setUser(res.data.user));
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (user) {
      location.replace("/home");
    }
  }, [user]);

  return (
    <main>
      <NavBar></NavBar>
      <div className="flex w-screen h-screen justify-center items-center">
        <LoginCard></LoginCard>
      </div>
    </main>
  );
};

export default page;
