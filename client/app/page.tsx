"use client";
import Image from "next/image";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
import ShownUser from "@/models/ShownUser";

export default function Home() {
  const [user, setUser] = useState<ShownUser>();
  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("http://localhost:8080/users/me", { withCredentials: true })
        .then((res) => setUser(res.data.user));
    };

    checkLoggedIn();
  }, []);

  return (
    <main>
      <NavBar user={user}></NavBar>
      <Hero></Hero>
    </main>
  );
}
