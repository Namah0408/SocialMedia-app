import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const CreatePost = ({ onPostCreated }) => {
  const [content, setContent] = useState("");
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/posts`,
        { content },
        config
      );
      setContent("");
      onPostCreated?.(); // refresh feed
    } catch (err) {
      console.error("Post creation failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow mb-6">
      <textarea
        placeholder="What's on your mind?"
        className="w-full bg-gray-700 p-3 rounded text-white resize-none"
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;