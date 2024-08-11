"use client";
import NavBar from "@/app/components/NavBar";
import UserProfile from "@/app/components/UserProfile";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: { username: string } }) => {
  const [user, setUser] = useState<ShownUser | null>();
  const [viewedUser, setViewedUser] = useState<ShownUser | null>();

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
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

    const getViewedUser = async () => {
      await axios
        .get(`/api/users/byusername?username=${params.username}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.user) {
            setViewedUser(res.data.user);
          }
        });
    };

    getViewedUser();
  }, []);

  return (
    <main>
      <NavBar user={user}></NavBar>
      <div className="p-4">
        <UserProfile user={viewedUser}></UserProfile>
        {viewedUser?.message && (
          <div className="flex flex-col gap-4 p-4 w-screen items-center">
            <h1 className="font-bold text-3xl">{viewedUser?.message}</h1>
            <div>
              It seems rather quiet in here... come back soon to see if{" "}
              <span className="badge badge-neutral text-secondary">
                {viewedUser?.username}
              </span>{" "}
              posts something.
            </div>
          </div>
        )}
        {viewedUser?.posts &&
          viewedUser?.posts.map((p) => (
            <div className="flex flex-col gap-4 p-4" key={p.id}>
              <div className="flex gap-2 justify-between">
                <div className="flex gap-2">
                  <span className="badge badge-primary">{p.category}</span>
                  <span className="badge badge-secondary">
                    <div>{p.authorName}</div>
                  </span>
                </div>
                <span className="badge badge-info">{p.createdAt}</span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold text-lg">
                  <Link
                    key={p.id}
                    href={`/post/${p.id}`}
                    className="w-[60%] hover:underline"
                  >
                    {p.title}{" "}
                  </Link>
                </h1>
                <div>{p.description}</div>
              </div>
              <div className="divider divider-info"></div>
            </div>
          ))}
      </div>
    </main>
  );
};

export default page;
