//TODO functionality of follow button and then display numbers and list on profile
"use client";
import NavBar from "@/app/components/NavBar";
import UserProfile from "@/app/components/UserProfile";
import ShownUser from "@/models/ShownUser";
import updateDate from "@/utils/updateDate";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserPage = ({ params }: { params: { username: string } }) => {
  const [user, setUser] = useState<ShownUser | null>();
  const [none, setNone] = useState<boolean>(false);
  const [viewedUser, setViewedUser] = useState<ShownUser | null>();
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      await axios
        .get("/api/users/me", { withCredentials: true })
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

    const getViewedUser = async () => {
      await axios
        .get(`/api/users/byusername?username=${params.username}`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.user) {
            setViewedUser(res.data.user);
          }
        })
        .catch((err) => {
          if (err.response.status == 404) {
            setNone(true);
          }
        });
    };

    getViewedUser();
  }, []);

  return (
    <main>
      <NavBar optionalUser={user}></NavBar>
      {!none ? (
        <div className="">
          <UserProfile user={viewedUser} loggedInUser={user}></UserProfile>
          {viewedUser?.message && (
            <div className="flex flex-col text-center gap-4 p-4 w-screen items-center">
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
              <div className="p-4">
                <div className="flex flex-col gap-4 p-4" key={p.id}>
                  <div className="flex gap-2 justify-between">
                    <div className="flex gap-2">
                      <span className="badge badge-sm lg:badge-md badge-primary">
                        {p.category}
                      </span>
                      <span className="badge badge-sm lg:badge-md badge-secondary">
                        <div>{p.authorName}</div>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="badge badge-info badge-sm lg:badge-md">
                        {updateDate(p.createdAt)[0]}
                      </span>
                      <span className="hidden lg:block badge badge-info">
                        {updateDate(p.createdAt)[1]}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold text-md lg:text-lg overflow-hidden text-ellipsis whitespace-nowrap max-w-[30ch] md:max-w-full">
                      <Link
                        key={p.id}
                        href={`/post/${p.id}`}
                        className="w-[60%] hover:underline"
                      >
                        {p.title}{" "}
                      </Link>
                    </h1>
                    <div className="text-sm lg:text-md overflow-hidden text-ellipsis whitespace-nowrap max-w-[30ch] md:max-w-[70ch] lg:max-w-full">
                      {p.description}
                    </div>
                  </div>
                  <div className="divider divider-info"></div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="h-[80vh] w-screen justify-center items-center flex">
          <span className="badge badge-lg badge-error">No user found</span>
        </div>
      )}
    </main>
  );
};

export default UserPage;
