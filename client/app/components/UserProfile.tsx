import ShownUser from "@/models/ShownUser";
import React from "react";

interface Props {
  user?: ShownUser | null;
}

const UserProfile = ({ user }: Props) => {
  return (
    <div className="w-full p-4 my-10">
      <div className="text-3xl font-extrabold text-accent">
        {user?.username}
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default UserProfile;
