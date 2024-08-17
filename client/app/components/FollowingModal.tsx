import ShownUser from "@/models/ShownUser";
import React, { useState } from "react";
import FollowButton from "./FollowButton";
import Link from "next/link";

interface Props {
  user?: ShownUser | null;
  loggedInUser?: ShownUser | null;
}

const FollowingModal = ({ loggedInUser, user }: Props) => {
  const checkFollowing = (id: string) => {
    const check = loggedInUser?.following?.some((f) => f.id == id) ?? false;

    return check;
  };

  return (
    <div>
      <dialog id="following_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{user?.username}'s following</h3>
          <ul className="py-4">
            {user?.following && user?.following.length > 0 ? (
              user?.following.map((f) => (
                <li key={f.id}>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/user/${f.username}`}
                      className="hover:underline"
                    >
                      @{f.username}
                    </Link>
                    {!(f.id == loggedInUser?.id) && (
                      <FollowButton
                        isFollowing={checkFollowing(f.id)}
                        certainUser={f}
                        user={user}
                      ></FollowButton>
                    )}
                  </div>
                  <div className="divider"></div>
                </li>
              ))
            ) : (
              <div>No following yet</div>
            )}
          </ul>
        </div>
      </dialog>
    </div>
  );
};

export default FollowingModal;
