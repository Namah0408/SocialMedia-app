import React, { useEffect, useState } from "react";
import axios from "axios";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API}/api/posts/feed`);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to load feed", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePostCreated = () => fetchPosts();
  const handlePostDeleted = (postId) =>
    setPosts((prev) => prev.filter((p) => p._id !== postId));

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 max-w-2xl mx-auto">
      <CreatePost onPostCreated={handlePostCreated} />
      {posts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={handlePostDeleted} />
      ))}
    </div>
  );
};

export default Home;