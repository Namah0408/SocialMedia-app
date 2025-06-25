import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { ThumbsUp } from "lucide-react";

const LikeButton = ({ postId, likes }) => {
  const { token, user } = useAuth();
  const [isLiked, setIsLiked] = useState(likes.includes(user?._id));
  const [likeCount, setLikeCount] = useState(likes.length);

  const toggleLike = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API}/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Failed to like/unlike post", err);
    }
  };

  return (
    <button
      onClick={toggleLike}
      className={`flex items-center gap-2 text-sm ${
        isLiked ? "text-blue-400" : "text-gray-400"
      } hover:text-white`}
    >
      <ThumbsUp size={18} />
      {likeCount}
    </button>
  );
};

export default LikeButton;