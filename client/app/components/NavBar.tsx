"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  optionalUser?: ShownUser | null;
}

const NavBar = ({ optionalUser }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<ShownUser>();

  const logout = async () => {
    await axios.get("/api/users/logout", {
      withCredentials: true,
    });
    router.replace("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios
        .get("/api/users/me")
        .then((res) => {
          if (res.data.user) {
            setUser(res.data.user);
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          return;
        });
    };

    if (optionalUser) {
      setUser(optionalUser);
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  return (
    <div>
      {!loading && !user && (
        <div
          className={`navbar bg-base-100 ${
            path == "/login" || path == "/signup" || path == "/"
              ? "absolute"
              : ""
          }`}
        >
          <div className="flex-1">
            <Link
              href={
                path == "/login" || path == "/signup" || path == "/"
                  ? "/"
                  : "/home"
              }
              className="btn btn-ghost text-xl"
            >
              blogify
            </Link>
          </div>
          <div className="flex-none">
            <ul className="flex px-2">
              <li>
                <Link href="/login">
                  <button className="btn btn-ghost">Login</button>
                </Link>
              </li>
              <li>
                <Link href="/signup">
                  <button className="btn btn-ghost">Signup</button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      {loading ? (
        <div
          className={`navbar bg-base-100 ${
            path == "/login" || path == "/signup" || path == "/"
              ? "absolute"
              : ""
          }`}
        >
          <div className="flex-1">
            <Link
              href={
                path == "/login" || path == "/signup" || path == "/"
                  ? "/"
                  : "/home"
              }
              className="btn btn-ghost text-xl"
            >
              blogify
            </Link>
          </div>
        </div>
      ) : (
        user &&
        !loading && (
          <>
            <div
              className={`navbar bg-base-100 ${
                path == "/login" || path == "/signup" || path == "/"
                  ? "absolute"
                  : ""
              }`}
            >
              <div className="flex-1">
                <Link
                  href={
                    path == "/login" || path == "/signup" || path == "/"
                      ? "/"
                      : "/home"
                  }
                  className="btn btn-ghost text-xl"
                >
                  blogify
                </Link>
              </div>
              <div className="flex justify-end flex-1 lg:px-2">
                <div className="flex items-center">
                  <Link href={"/write"} className="">
                    <button className="btn btn-ghost">Write</button>
                  </Link>
                  <div className="dropdown dropdown-end ">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost rounded-btn"
                    >
                      {user?.username}
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4"
                    >
                      <li>
                        <Link href={`/user/${user?.username}`}>Profile</Link>
                      </li>
                      <li>
                        <Link href={"/settings"}>Settings</Link>
                      </li>
                      <li>
                        <button onClick={logout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default NavBar;
