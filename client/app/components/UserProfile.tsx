import ShownUser from "@/models/ShownUser";
import React, { useEffect, useState } from "react";

interface Props {
  user?: ShownUser | null;
  loggedInUser?: ShownUser | null;
}

const UserProfile = ({ user, loggedInUser }: Props) => {
  const [isFollowing, setIsFollowing] = useState(false);
  useEffect(() => {
    const check =
      (user &&
        loggedInUser?.following?.some(
          (followedUser) => followedUser.id === user.id
        )) ??
      false;
    console.log(check);
    setIsFollowing(check);
  }, [user, loggedInUser]);

  return (
    <div className="w-full p-4 my-10">
      <div className="text-3xl font-extrabold text-accent">
        {user?.username}
      </div>
      <div className="my-2">
        {isFollowing ? (
          <button className="btn btn-outline btn-info">Following</button>
        ) : (
          <button className="btn">Follow</button>
        )}
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default UserProfile;
