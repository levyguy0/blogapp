import ShownUser from "@/models/ShownUser";
import React from "react";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";

interface Props {
  user?: ShownUser | null;
  setIsFollowing: (value: boolean) => void;
  isFollowing: boolean;
  loggedInUser?: ShownUser | null;
}

const FollowInfo = ({
  isFollowing,
  setIsFollowing,
  loggedInUser,
  user,
}: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <FollowersModal user={user} loggedInUser={loggedInUser}></FollowersModal>
      <button
        onClick={() =>
          (
            document.getElementById("follower_modal") as HTMLFormElement
          )?.showModal()
        }
        className="badge badge-sm lg:badge-md badge-info"
      >
        {user?.followers.length}{" "}
        {user?.followers.length !== 1 ? "followers" : "follower"}
      </button>
      <FollowingModal user={user} loggedInUser={loggedInUser}></FollowingModal>
      <button
        onClick={() =>
          (
            document.getElementById("following_modal") as HTMLFormElement
          )?.showModal()
        }
        className="badge badge-sm lg:badge-md badge-info"
      >
        {user?.following.length} following
      </button>
    </div>
  );
};

export default FollowInfo;
