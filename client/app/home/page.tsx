"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import ShownUser from "@/models/ShownUser";
import BlogFeed from "../components/BlogFeed";
import FilterFeed from "../components/FilterFeed";
import { useRouter } from "next/navigation";

const page = () => {
  const [user, setUser] = useState<ShownUser | null>();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get(`/api/users/me`, { withCredentials: true })
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

  return (
    <main>
      <NavBar user={user}></NavBar>
      <div className="lg:grid lg:grid-cols-4 gap-10 p-4 relative">
        <FilterFeed
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
          setNumberOfPages={setNumberOfPages}
        ></FilterFeed>
        <BlogFeed
          page={page}
          setPage={setPage}
          numberOfPages={numberOfPages}
          setNumberOfPages={setNumberOfPages}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        ></BlogFeed>
      </div>
    </main>
  );
};

export default page;
