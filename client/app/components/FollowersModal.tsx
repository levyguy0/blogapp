import ShownUser from "@/models/ShownUser";
import React from "react";

interface Props {
  user?: ShownUser | null;
}

const FollowersModal = ({ user }: Props) => {
  return (
    <div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{user?.username}'s followers</h3>
          <ul className="py-4"></ul>
        </div>
      </dialog>
    </div>
  );
};

export default FollowersModal;
