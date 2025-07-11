import ShownUser from "@/models/ShownUser";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface Props {
  user?: ShownUser | null;
  logout: () => void;
}

const LoggedInNav = ({ user, logout }: Props) => {
  const path = usePathname();
  return (
    <>
      <div
        className={`navbar bg-base-100 ${
          path == "/login" || path == "/signup" || path == "/" ? "absolute" : ""
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
            blabble
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
  );
};

export default LoggedInNav;
