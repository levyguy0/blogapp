import ShownUser from "@/models/ShownUser";
import React from "react";
import FollowersModal from "./FollowersModal";

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
        onClick={() => document.getElementById("my_modal_2")?.showModal()}
        className="badge badge-sm lg:badge-md badge-info"
      >
        {user?.followers.length}{" "}
        {user?.followers.length !== 1 ? "followers" : "follower"}
      </button>
      <span className="badge badge-sm lg:badge-md badge-info">
        {user?.following.length} following
      </span>
    </div>
  );
};

export default FollowInfo;
