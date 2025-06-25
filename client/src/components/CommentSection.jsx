import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import CommentItem from "./CommentItem";

const CommentSection = ({ postId, comments, setComments }) => {
  const [text, setText] = useState("");
  const { token } = useAuth();

  const handleComment = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/posts/${postId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(res.data.comments);
      setText("");
    } catch (err) {
      console.error("Failed to add comment", err);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleComment} className="flex gap-2 mb-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 rounded bg-gray-700 text-white text-sm"
        />
        <button type="submit" className="bg-blue-600 px-4 rounded text-white text-sm">
          Post
        </button>
      </form>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;