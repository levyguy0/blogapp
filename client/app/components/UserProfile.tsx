import ShownUser from "@/models/ShownUser";
import React, { useEffect, useState } from "react";
import FollowButton from "./FollowButton";
import FollowInfo from "./FollowInfo";
import UserPageSkeletons from "./UserPageSkeletons";

interface Props {
  user?: ShownUser | null;
  loggedInUser?: ShownUser | null;
  loading: boolean;
}

const UserProfile = ({ user, loggedInUser, loading }: Props) => {
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
    <div>
      {!loading ? (
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
      ) : (
        <UserPageSkeletons />
      )}
    </div>
  );
};

export default UserProfile;
