"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Props {
  user?: ShownUser | null;
}

const NavBar = ({ user }: Props) => {
  const router = useRouter();
  const path = usePathname();
  const logout = async () => {
    await axios.get("/api/users/logout", {
      withCredentials: true,
    });
    router.replace("/");
  };

  return (
    <div>
      {!user ? (
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
      ) : (
        // -------------------------------
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
                    {user.username}
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4"
                  >
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
