import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import React from "react";

const LoggedOutNav = () => {
  const path = usePathname();
  return (
    <div
      className={`navbar bg-base-100 ${
        path == "/login" || path == "/signup" || path == "/" ? "absolute" : ""
      }`}
    >
      <div className="flex-1">
        <Link
          href={
            path == "/login" || path == "/signup" || path == "/" ? "/" : "/home"
          }
          className="btn btn-ghost text-xl"
        >
          blabble
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
  );
};

export default LoggedOutNav;
