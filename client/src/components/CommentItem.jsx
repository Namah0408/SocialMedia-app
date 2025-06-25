import UserAvatar from "./UserAvatar";
import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 p-2 border-b border-gray-700">
      <UserAvatar src={comment.userId.avatar} size="w-8 h-8" />
      <div>
        <p className="text-sm text-white font-semibold">{comment.userId.name}</p>
        <p className="text-gray-300 text-sm">{comment.text}</p>
        <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default CommentItem;