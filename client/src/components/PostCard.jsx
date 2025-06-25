import UserAvatar from "./UserAvatar";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import React, { useState } from "react";

const PostCard = ({ post, onDelete }) => {
  const { token, user } = useAuth();
  const [comments, setComments] = useState(post.comments || []);

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

      <div className="flex items-center justify-between mt-3 text-sm">
        <LikeButton postId={post._id} likes={post.likes} />
        <span className="text-gray-400">{comments.length} comments</span>
      </div>

      <CommentSection postId={post._id} comments={comments} setComments={setComments} />
    </div>
  );
};

export default PostCard;