import UserAvatar from "./UserAvatar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import React from "react";

const PostCard = ({ post, onDelete }) => {
  const { token, user } = useAuth();

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete?.(post._id);
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <UserAvatar src={post.userId.avatar} size="w-10 h-10" />
          <h3 className="font-semibold text-white">{post.userId.name}</h3>
        </div>
        {user?._id === post.userId._id && (
          <button
            onClick={handleDelete}
            className="text-sm text-red-400 hover:text-red-600"
          >
            Delete
          </button>
        )}
      </div>
      <p className="text-gray-200">{post.content}</p>
      <p className="text-xs text-gray-500 mt-2">{new Date(post.createdAt).toLocaleString()}</p>
    </div>
  );
};

export default PostCard;