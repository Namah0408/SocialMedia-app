import { Link } from "react-router-dom";
import UserAvatar from "./UserAvatar";
import React from "react";

const UserCard = ({ user }) => {
  return (
    <Link to={`/profile/${user._id}`} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded">
      <UserAvatar src={user.avatar} />
      <div>
        <h3 className="text-white font-medium">{user.name}</h3>
        <p className="text-sm text-gray-400">{user.email}</p>
      </div>
    </Link>
  );
};

export default UserCard;