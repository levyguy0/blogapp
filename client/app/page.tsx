"use client";
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import { useEffect, useState } from "react";
import axios from "axios";
import ShownUser from "@/models/ShownUser";
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = useState<ShownUser>();
  const router = useRouter();
  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
        .then((res) => {
          if (res.data.user) {
            router.replace("/home");
          } else {
            return;
          }
        })
        .catch((err) => {
          return;
        });
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
