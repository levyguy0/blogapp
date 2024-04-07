"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import ShownUser from "@/models/ShownUser";
import BlogFeed from "../components/BlogFeed";

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
      <div className="grid grid-cols-4 relative">
        <div className="sort col-span-1">hello</div>
        <BlogFeed></BlogFeed>
      </div>
    </main>
  );
};

export default page;
