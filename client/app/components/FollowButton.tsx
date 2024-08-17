import ShownUser from "@/models/ShownUser";
import axios from "axios";
import React, { useState } from "react";

interface Props {
  isFollowing: boolean;
  user?: ShownUser | null;
  setIsFollowing: (state: boolean) => void;
}

const FollowButton = ({ setIsFollowing, isFollowing, user }: Props) => {
  const unFollow = async () => {
    setIsFollowing(false);

    let payload = {
      id: user?.id,
    };

    await axios
      .delete("/api/users/follow", {
        data: payload,
        withCredentials: true,
      })
      .then((res) => {
        location.reload();
      })
      .catch(() => {
        setIsFollowing(true);
      });
  };

  const follow = async () => {
    setIsFollowing(true);

    await axios
      .post(
        "/api/users/follow",
        { id: user?.id },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        location.reload();
      })
      .catch(() => {
        setIsFollowing(false);
      });
  };

  return (
    <div className="my-2">
      {isFollowing ? (
        <button className="btn btn-outline btn-info" onClick={unFollow}>
          Following
        </button>
      ) : (
        <button className="btn" onClick={follow}>
          Follow
        </button>
      )}
    </div>
  );
};

export default FollowButton;
