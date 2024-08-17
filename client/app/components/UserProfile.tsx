import ShownUser from "@/models/ShownUser";
import React, { useEffect, useState } from "react";
import FollowButton from "./FollowButton";
import FollowInfo from "./FollowInfo";

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
    <div className="p-4">
      <div className="w-full p-4 my-10">
        <div className="flex gap-2 items-center">
          <div className="text-2xl lg:text-3xl font-extrabold text-accent">
            {user?.username}
          </div>
          <div className="divider divider-horizontal"></div>
          <FollowInfo
            loggedInUser={loggedInUser}
            user={user}
            isFollowing={isFollowing}
            setIsFollowing={setIsFollowing}
          ></FollowInfo>
        </div>
        {!(user?.id == loggedInUser?.id) && (
          <div>
            <div className="divider"></div>
            <FollowButton
              setIsFollowing={setIsFollowing}
              isFollowing={isFollowing}
              user={user}
            ></FollowButton>
          </div>
        )}
        <div className="divider"></div>
      </div>
    </div>
  );
};

export default UserProfile;
