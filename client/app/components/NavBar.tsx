"use client";
import ShownUser from "@/models/ShownUser";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoggedOutNav from "./LoggedOutNav";
import LoadingNav from "./LoadingNav";
import LoggedInNav from "./LoggedInNav";

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
      {!loading && !user && <LoggedOutNav />}
      {loading ? (
        <LoadingNav />
      ) : (
        user && !loading && <LoggedInNav user={user} logout={logout} />
      )}
    </div>
  );
};

export default NavBar;
