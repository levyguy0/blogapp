import ShownUser from "@/models/ShownUser";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  isFollowing: boolean;
  user?: ShownUser | null;
  setIsFollowing?: (state: boolean) => void;
  certainUser?: ShownUser;
}

const FollowButton = ({
  certainUser,
  setIsFollowing,
  isFollowing,
  user,
}: Props) => {
  const unFollow = async () => {
    setIsFollowing && setIsFollowing(false);

    await axios
      .delete("/api/users/follow", {
        data: certainUser ? { id: certainUser.id } : { id: user?.id },
        withCredentials: true,
      })
      .then((res) => {
        location.reload();
      })
      .catch(() => {
        setIsFollowing && setIsFollowing(true);
      });
  };

  const follow = async () => {
    setIsFollowing && setIsFollowing(true);

    await axios
      .post(
        "/api/users/follow",
        { id: certainUser ? certainUser.id : user?.id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        location.reload();
      })
      .catch(() => {
        setIsFollowing && setIsFollowing(false);
      });
  };

  return (
    <div className="my-2">
      {isFollowing ? (
        <button className="btn btn-outline btn-info" onClick={() => unFollow()}>
          Following
        </button>
      ) : (
        <button className="btn" onClick={() => follow()}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
