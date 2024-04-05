import ShownUser from "@/models/ShownUser";
import Link from "next/link";
import React, { useEffect } from "react";

interface Props {
  user?: ShownUser;
}

const NavBar = ({ user }: Props) => {
  return (
    <div>
      {!user ? (
        <div className="navbar bg-base-100 absolute">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              blogify
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/signup">Signup</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar bg-base-100 absolute">
          <div className="flex-1">
            <Link href={"/"} className="text-xl btn btn-ghost">
              blogify
            </Link>
          </div>
          <div className="flex justify-end flex-1 px-2">
            <div className="flex items-stretch">
              <div className="dropdown dropdown-end">
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
                    <button>Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
