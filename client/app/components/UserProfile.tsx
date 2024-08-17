import ShownUser from "@/models/ShownUser";
import React, { useEffect, useState } from "react";
import FollowButton from "./FollowButton";

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

    setIsFollowing(check);
  }, [user, loggedInUser]);

  return (
    <div className="w-full p-4 my-10">
      <div className="flex gap-2 items-center">
        <div className="text-2xl lg:text-3xl font-extrabold text-accent">
          {user?.username}
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="flex flex-col md:flex-row gap-2">
          <span className="badge badge-sm lg:badge-md badge-info">
            {user?.followers.length}{" "}
            {user?.followers.length !== 1 ? "followers" : "follower"}
          </span>
          <span className="badge badge-sm lg:badge-md badge-info">
            {user?.following.length} following
          </span>
        </div>
      </div>
      <div className="divider"></div>
      {!(user?.id == loggedInUser?.id) && (
        <FollowButton
          setIsFollowing={setIsFollowing}
          isFollowing={isFollowing}
          user={user}
        ></FollowButton>
      )}
      <div className="divider"></div>
    </div>
  );
};

export default UserProfile;
