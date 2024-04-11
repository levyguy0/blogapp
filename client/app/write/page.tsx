"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";

const page = () => {
  const [user, setUser] = useState<ShownUser | null>();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

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
      <div className="p-4 flex flex-col gap-4 w-[80%]">
        <h1>Create a Blog Post</h1>
        <textarea
          ref={titleRef}
          className="textarea textarea-bordered"
          placeholder="Title"
        ></textarea>
        <textarea
          ref={descRef}
          className="textarea textarea-bordered"
          placeholder="Description"
        ></textarea>
      </div>
    </main>
  );
};

export default page;
