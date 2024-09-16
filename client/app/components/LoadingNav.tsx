import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const LoadingNav = () => {
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
          blogify
        </Link>
      </div>
    </div>
  );
};

export default LoadingNav;
