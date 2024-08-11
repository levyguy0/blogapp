"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SignupCard from "../components/SignupCard";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [user, setUser] = useState<ShownUser>();
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
        .then((res) => setUser(res.data.user))
        .catch((err) => {
          return;
        });
    };

    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [user]);

  return (
    <main>
      <NavBar></NavBar>
      <div className="flex w-screen h-screen justify-center items-center">
        <SignupCard></SignupCard>
      </div>
    </main>
  );
};

export default page;
