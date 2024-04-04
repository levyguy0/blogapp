import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
