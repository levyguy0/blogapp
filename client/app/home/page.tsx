"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import ShownUser from "@/models/ShownUser";
import BlogFeed from "../components/BlogFeed";
import FilterFeed from "../components/FilterFeed";

const page = () => {
  const [user, setUser] = useState<ShownUser | null>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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
      <div className="grid grid-cols-4 gap-10 p-4 relative">
        <FilterFeed
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        ></FilterFeed>
        <BlogFeed
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        ></BlogFeed>
      </div>
    </main>
  );
};

export default page;
